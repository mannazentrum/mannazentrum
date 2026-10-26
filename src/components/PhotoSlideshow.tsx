import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PhotoBadge from './PhotoBadge';

export interface PhotoSlideItem {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
}

interface PhotoSlideshowProps {
  slides: PhotoSlideItem[];
  badgeCode?: string;
  autoPlayInterval?: number;
  className?: string;
}

export const PhotoSlideshow: React.FC<PhotoSlideshowProps> = ({
  slides,
  badgeCode,
  autoPlayInterval = 5000,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play timer with pause on hover
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide, autoPlayInterval, totalSlides]);

  // Touch gesture handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!slides || slides.length === 0) return null;

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl bg-slate-900 shadow-xl select-none ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Galeri Foto Fasilitas"
    >
      {/* Photo Code Badge */}
      {badgeCode && <PhotoBadge code={badgeCode} position="top-left" />}

      {/* Slide Counter Chip */}
      <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/10 text-white/90 text-[11px] font-medium tracking-wide">
        <span className="font-semibold text-amber-400">{currentIndex + 1}</span>
        <span className="text-white/40 mx-1">/</span>
        <span>{totalSlides}</span>
      </div>

      {/* Images Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                data-photo-code={badgeCode}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          );
        })}

        {/* Bottom Gradient Overlay for Captions */}
        <div className="absolute inset-x-0 bottom-0 z-20 pt-16 pb-12 px-6 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent pointer-events-none">
          {slides[currentIndex].title && (
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              {slides[currentIndex].title}
            </p>
          )}
          {slides[currentIndex].caption && (
            <p className="text-white text-sm font-light leading-snug line-clamp-2 text-shadow-sm">
              {slides[currentIndex].caption}
            </p>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      {totalSlides > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Foto sebelumnya"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/50 hover:bg-slate-950/80 text-white/90 hover:text-white backdrop-blur-md border border-white/10 flex items-center justify-center transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 shadow-md"
          >
            <ChevronLeft className="w-5 h-5 -ml-0.5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Foto berikutnya"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/50 hover:bg-slate-950/80 text-white/90 hover:text-white backdrop-blur-md border border-white/10 flex items-center justify-center transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 shadow-md"
          >
            <ChevronRight className="w-5 h-5 -mr-0.5" />
          </button>
        </>
      )}

      {/* Pagination Indicator Dots */}
      {totalSlides > 1 && (
        <div className="absolute bottom-3 inset-x-0 z-20 flex justify-center items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Lihat foto ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-6 bg-amber-400 shadow-sm'
                  : 'w-2 bg-white/40 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoSlideshow;
