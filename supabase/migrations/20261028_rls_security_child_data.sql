-- ==============================================================================
-- MANNAZENTRUM ECOSYSTEM - SUPABASE ROW LEVEL SECURITY (RLS) POLICIES
-- Target: laporan.mannazentrum.com (Portal Laporan Siswa & Tumbuh Kembang)
-- Purpose: Keamanan Ketat Data Anak, Jadwal, Absensi, dan Laporan Harian
-- ==============================================================================

-- 1. AKTIFKAN EXTENSION UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. STRUKTUR TABEL UTAMA (Jika Belum Dibuat)
-- ------------------------------------------------------------------------------

-- Tabel Profil Orang Tua / Wali Murid
CREATE TABLE IF NOT EXISTS public.parent_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel Profil Staf / Pendidik / Admin
CREATE TABLE IF NOT EXISTS public.staff_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('teacher', 'caregiver', 'admin', 'principal')),
    phone_number TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel Data Murid (Sangat Privat & Sensitif)
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    nickname TEXT,
    date_of_birth DATE NOT NULL,
    program_type TEXT NOT NULL CHECK (program_type IN ('infant_daycare', 'toddler_daycare', 'playgroup', 'kindergarten_a', 'kindergarten_b')),
    emergency_contact TEXT NOT NULL,
    medical_notes TEXT, -- Alergi, riwayat penyakit
    branch_location TEXT NOT NULL DEFAULT 'Cisauk - Serpong Garden',
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'graduated', 'inactive')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel Relasi Hubungan Orang Tua - Anak (Penetap Hak Akses RLS)
CREATE TABLE IF NOT EXISTS public.parent_student_mappings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_user_id UUID NOT NULL REFERENCES public.parent_profiles(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    relationship TEXT NOT NULL CHECK (relationship IN ('father', 'mother', 'guardian')),
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(parent_user_id, student_id)
);

-- Tabel Laporan Aktivitas Harian Siswa (Makan, Tidur, Sensori, Toilet Training)
CREATE TABLE IF NOT EXISTS public.daily_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL REFERENCES public.staff_profiles(id),
    report_date DATE NOT NULL DEFAULT CURRENT_DATE,
    meal_intake JSONB,       -- Contoh: {"breakfast": "Habis", "lunch": "3/4 porsi", "snack": "Buah naga habis"}
    nap_time JSONB,          -- Contoh: {"start": "12:30", "end": "14:30", "quality": "Nyenyak"}
    potty_training JSONB,    -- Contoh: {"urination_count": 4, "defecation_count": 1, "condition": "Normal"}
    activities_summary TEXT, -- Ringkasan stimulasi motorik & STEM
    photos_urls TEXT[],      -- URL foto privat si kecil
    notes_for_parents TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel Absensi & Suhu Tubuh Harian
CREATE TABLE IF NOT EXISTS public.student_attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    check_in_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    check_out_time TIMESTAMPTZ,
    arrival_temperature NUMERIC(4, 1), -- Contoh: 36.5
    departure_temperature NUMERIC(4, 1),
    picked_up_by TEXT,
    verified_by UUID REFERENCES public.staff_profiles(id),
    attendance_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status TEXT NOT NULL DEFAULT 'present' CHECK (status IN ('present', 'sick', 'permission', 'absent')),
    UNIQUE(student_id, attendance_date)
);

-- Tabel Jadwal Kelas & Kurikulum
CREATE TABLE IF NOT EXISTS public.class_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    program_type TEXT NOT NULL,
    day_of_week TEXT NOT NULL,
    time_start TIME NOT NULL,
    time_end TIME NOT NULL,
    activity_name TEXT NOT NULL,
    teacher_id UUID REFERENCES public.staff_profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ==============================================================================
-- 3. AKTIFKAN ROW LEVEL SECURITY (RLS) DI SELURUH TABEL
-- ==============================================================================
ALTER TABLE public.parent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_student_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_schedules ENABLE ROW LEVEL SECURITY;


-- ==============================================================================
-- 4. FUNGSI PEMBANTU HAK AKSES (SECURITY DEFINER FUNCTION)
-- ==============================================================================

-- Cek apakah pengguna saat ini adalah staf/admin
CREATE OR REPLACE FUNCTION public.is_staff_or_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.staff_profiles
    WHERE id = auth.uid()
  );
$$;

-- Cek apakah pengguna saat ini adalah admin utama
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.staff_profiles
    WHERE id = auth.uid() AND role IN ('admin', 'principal')
  );
$$;

-- Cek apakah pengguna saat ini adalah orang tua resmi dari murid tertentu
CREATE OR REPLACE FUNCTION public.is_parent_of_student(target_student_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.parent_student_mappings
    WHERE parent_user_id = auth.uid()
      AND student_id = target_student_id
      AND is_verified = TRUE
  );
$$;


-- ==============================================================================
-- 5. ATURAN KEBIJAKAN (RLS POLICIES) KETAT
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- A. TABEL STUDENTS (DATA MURID)
-- ------------------------------------------------------------------------------
-- Kebijakan 1: Orang tua HANYA bisa membaca data anak kandungnya sendiri
CREATE POLICY "Parents view own children only"
ON public.students
FOR SELECT
TO authenticated
USING (
  public.is_parent_of_student(id)
);

-- Kebijakan 2: Staf/Guru bisa melihat data seluruh murid yang aktif
CREATE POLICY "Staff view students"
ON public.students
FOR SELECT
TO authenticated
USING (
  public.is_staff_or_admin()
);

-- Kebijakan 3: Hanya Admin yang boleh menambah, memperbarui, atau menghapus data murid
CREATE POLICY "Admin manage students"
ON public.students
FOR ALL
TO authenticated
USING (
  public.is_admin()
)
WITH CHECK (
  public.is_admin()
);


-- ------------------------------------------------------------------------------
-- B. TABEL DAILY_REPORTS (LAPORAN HARIAN & AKTIVITAS)
-- ------------------------------------------------------------------------------
-- Kebijakan 1: Orang tua HANYA bisa membaca laporan harian milik anak mereka
CREATE POLICY "Parents view own child daily reports"
ON public.daily_reports
FOR SELECT
TO authenticated
USING (
  public.is_parent_of_student(student_id)
);

-- Kebijakan 2: Staf & Guru bisa melihat laporan harian
CREATE POLICY "Staff view daily reports"
ON public.daily_reports
FOR SELECT
TO authenticated
USING (
  public.is_staff_or_admin()
);

-- Kebijakan 3: Guru dan Staf bisa membuat/mengedit laporan harian
CREATE POLICY "Staff insert and update daily reports"
ON public.daily_reports
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_staff_or_admin()
);

CREATE POLICY "Staff modify daily reports"
ON public.daily_reports
FOR UPDATE
TO authenticated
USING (
  public.is_staff_or_admin()
)
WITH CHECK (
  public.is_staff_or_admin()
);


-- ------------------------------------------------------------------------------
-- C. TABEL STUDENT_ATTENDANCE (ABSENSI & SUHU TUBUH)
-- ------------------------------------------------------------------------------
-- Kebijakan 1: Orang tua HANYA bisa melihat absensi anak mereka
CREATE POLICY "Parents view own child attendance"
ON public.student_attendance
FOR SELECT
TO authenticated
USING (
  public.is_parent_of_student(student_id)
);

-- Kebijakan 2: Staf/Guru mengelola absensi
CREATE POLICY "Staff manage attendance"
ON public.student_attendance
FOR ALL
TO authenticated
USING (
  public.is_staff_or_admin()
)
WITH CHECK (
  public.is_staff_or_admin()
);


-- ------------------------------------------------------------------------------
-- D. TABEL PARENT_PROFILES & MAPPINGS
-- ------------------------------------------------------------------------------
-- Orang tua hanya bisa melihat dan mengedit profil diri sendiri
CREATE POLICY "Parents view own profile"
ON public.parent_profiles
FOR SELECT
TO authenticated
USING (
  id = auth.uid()
);

CREATE POLICY "Parents update own profile"
ON public.parent_profiles
FOR UPDATE
TO authenticated
USING (
  id = auth.uid()
)
WITH CHECK (
  id = auth.uid()
);

-- Orang tua hanya bisa melihat relasi pemetaan anaknya sendiri
CREATE POLICY "Parents view own mappings"
ON public.parent_student_mappings
FOR SELECT
TO authenticated
USING (
  parent_user_id = auth.uid()
);

-- Admin mengelola mapping orang tua - anak
CREATE POLICY "Admin manage parent mappings"
ON public.parent_student_mappings
FOR ALL
TO authenticated
USING (
  public.is_admin()
)
WITH CHECK (
  public.is_admin()
);


-- ------------------------------------------------------------------------------
-- E. TABEL CLASS_SCHEDULES (JADWAL KELAS)
-- ------------------------------------------------------------------------------
-- Jadwal kelas hanya bisa dibaca oleh pengguna terautentikasi (orang tua & guru)
CREATE POLICY "Authenticated users view schedules"
ON public.class_schedules
FOR SELECT
TO authenticated
USING (TRUE);

-- Hanya Admin / Guru yang dapat mengubah jadwal kelas
CREATE POLICY "Staff manage class schedules"
ON public.class_schedules
FOR ALL
TO authenticated
USING (
  public.is_staff_or_admin()
)
WITH CHECK (
  public.is_staff_or_admin()
);


-- ==============================================================================
-- 6. PERLINDUNGAN AKSES PUBLIK (ANON ROLE DENIED)
-- ==============================================================================
-- Memastikan pengguna publik/tanpa login (anon key) TIDAK BISA mengakses tabel apapun:
REVOKE ALL ON public.students FROM anon;
REVOKE ALL ON public.daily_reports FROM anon;
REVOKE ALL ON public.student_attendance FROM anon;
REVOKE ALL ON public.parent_profiles FROM anon;
REVOKE ALL ON public.parent_student_mappings FROM anon;
REVOKE ALL ON public.staff_profiles FROM anon;
REVOKE ALL ON public.class_schedules FROM anon;

-- Izinkan pengguna terotentikasi (authenticated) sesuai batasan RLS di atas
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO authenticated;
