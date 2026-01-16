
import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { ParentRegistrationData } from '../types';

const IsolatedForm: React.FC = () => {
  const [formData, setFormData] = useState<ParentRegistrationData>({} as ParentRegistrationData);
  const fatherSigRef = useRef<SignatureCanvas>(null);
  const motherSigRef = useRef<SignatureCanvas>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignatureEnd = (name: string, ref: React.RefObject<SignatureCanvas>) => {
    if (ref.current) {
      const dataUrl = ref.current.toDataURL();
      setFormData({ ...formData, [name]: dataUrl });
    }
  };

  const clearSignature = (name: string, ref: React.RefObject<SignatureCanvas>) => {
    if (ref.current) {
      ref.current.clear();
      setFormData({ ...formData, [name]: '' });
    }
  };

  const inputStyle: React.CSSProperties = {
    padding: '0.5rem',
    borderRadius: '0.5rem',
    border: '2px solid #42210b',
    color: '#42210b',
    backgroundColor: 'transparent',
    width: '100%'
  };

  const primaryBtnStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#42210b',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '9999px',
    marginTop: '1.5rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    borderBottom: '4px solid rgba(0, 0, 0, 0.3)'
  };

  return (
    <div style={{ backgroundColor: '#F9F4E8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '2rem', maxWidth: '42rem', width: '100%' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', textAlign: 'left', color: '#4D4D4D' }}>LANGKAH 1: IDENTITAS ANAK</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
          <input name="childName" value={formData.childName || ''} onChange={handleChange} type="text" placeholder="NAMA LENGKAP ANAK" style={inputStyle} />
          <input name="childNickname" value={formData.childNickname || ''} onChange={handleChange} type="text" placeholder="NAMA PANGGILAN" style={inputStyle} />
          <select name="childGender" value={formData.childGender || ''} onChange={handleChange} style={inputStyle}>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          <input name="childNik" value={formData.childNik || ''} onChange={handleChange} type="text" placeholder="NIK ANAK (OPSIONAL)" style={inputStyle} />
          <input name="childBirthPlace" value={formData.childBirthPlace || ''} onChange={handleChange} type="text" placeholder="TEMPAT, TANGGAL LAHIR" style={inputStyle} />
          <input name="childReligion" value={formData.childReligion || ''} onChange={handleChange} type="text" placeholder="AGAMA" style={inputStyle} />
          <textarea name="childAddress" value={formData.childAddress || ''} onChange={handleChange} placeholder="ALAMAT LENGKAP DOMISILI ANAK" style={{...inputStyle, gridColumn: 'span 2'}} />
        </div>
        <button style={primaryBtnStyle}>LANJUTKAN</button>
      </div>
    </div>
  );
};

export default IsolatedForm;
