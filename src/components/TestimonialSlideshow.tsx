import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Star, CheckCircle2, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Testimonial, testimonialsData } from '../data/testimonials';

interface TestimonialSlideshowProps {
  onSelectScreenshot: (screenshot: { src: string; name: string; code: string }) => void;
}

export const TestimonialSlideshow: React.FC<TestimonialSlideshowProps> = ({ onSelectScreenshot }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Dynamically calculate visible cards based on viewport width
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCardsPerView(1);
      } else if (width < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const totalCards = testimonialsData.length;
  const maxIndex = Math.max(0, totalCards - cardsPerView);

  // Keep index within bounds if cardsPerView changes
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
  };

  // Auto-play timer with pause on hover/interaction
  useEffect(() => {
    if (isPaused || totalCards <= cardsPerView) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide, cardsPerView, totalCards]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      nextSlide();
    } else if (distance < -45) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Total pages for dots
  const totalDots = maxIndex + 1;

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Testimoni Orang Tua Murid MannaZentrum"
    >
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[11px] block">
            Testimoni Nyata
          </span>
          <h3 className="text-2xl md:text-3xl font-light text-slate-900 tracking-tight mt-1">
            Apa Kata Orang Tua Murid?
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-light">
            Pengalaman nyata dan ulasan terverifikasi orang tua murid di MannaZentrum Daycare
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
          {/* Rating Pill */}
          <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-stone-200 shadow-sm text-xs text-slate-700">
            <div className="flex text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="font-bold ml-1 text-slate-900">5.0 / 5.0</span>
            <span className="text-slate-400 hidden sm:inline">(8 Ulasan Google)</span>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-full border border-stone-200 shadow-sm">
            <button
              onClick={prevSlide}
              aria-label="Testimoni Sebelumnya"
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:text-amber-600 hover:bg-amber-50 active:scale-95 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-[11px] font-medium text-slate-500 px-2 min-w-[54px] text-center">
              {currentIndex + 1} - {Math.min(currentIndex + cardsPerView, totalCards)} / {totalCards}
            </span>

            <button
              onClick={nextSlide}
              aria-label="Testimoni Berikutnya"
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:text-amber-600 hover:bg-amber-50 active:scale-95 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Slider Viewport */}
      <div className="overflow-hidden -mx-2 px-2 py-2">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`
          }}
        >
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="px-2.5 shrink-0 flex flex-col"
              style={{ width: `${100 / cardsPerView}%` }}
            >
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200/70 shadow-sm flex flex-col justify-between h-full hover:shadow-md hover:border-amber-200/80 transition-all duration-300 relative group">
                {/* Decorative quote icon */}
                <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-100 group-hover:text-amber-100/60 transition-colors pointer-events-none" />

                <div>
                  {/* Reviewer Header */}
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${item.avatarBg} ${item.avatarTextColor || 'text-white'} font-bold flex items-center justify-center text-sm shadow-sm relative shrink-0`}
                      >
                        {item.initials}
                        {item.isLocalGuide && (
                          <span
                            className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center text-[8px] font-black shadow-xs"
                            title="Local Guide"
                          >
                            ★
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-slate-900 text-sm leading-snug truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate">
                          {item.roleInfo}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-full shrink-0">
                      {item.source}
                    </span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex text-amber-400 mb-3.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  {/* Review Body */}
                  <div className="text-slate-700 font-light text-xs sm:text-[13px] leading-relaxed mb-6 whitespace-pre-line line-clamp-6 sm:line-clamp-7">
                    "{item.text}"
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-auto">
                  <span className="text-emerald-700 font-medium flex items-center gap-1 text-[11px] sm:text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    Ulasan Terverifikasi
                  </span>
                  <button
                    onClick={() => onSelectScreenshot(item.screenshot)}
                    className="text-amber-600 hover:text-amber-700 font-semibold text-[11px] sm:text-xs hover:underline flex items-center gap-1 active:scale-95 transition"
                  >
                    <span>Lihat Bukti Foto</span>
                    <span className="text-xs">↗</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Pagination */}
      <div className="flex items-center justify-center gap-1.5 mt-6">
        {Array.from({ length: totalDots }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            aria-label={`Pindah ke slide ulasan ${idx + 1}`}
            className={`transition-all duration-300 rounded-full h-2 ${
              currentIndex === idx
                ? 'w-7 bg-amber-500 shadow-xs'
                : 'w-2 bg-stone-300 hover:bg-stone-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlideshow;
