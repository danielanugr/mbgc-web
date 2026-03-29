"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useInView } from "react-intersection-observer";

type GalleryImage = {
  url: string;
  alt?: string | null;
  _key?: string;
};

const ITEMS_PER_PAGE = 12;

export default function GalleryLightbox({
  images,
}: {
  images: GalleryImage[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [itemsToShow, setItemsToShow] = useState(ITEMS_PER_PAGE);
  const { ref } = useInView({
    threshold: 0,
    rootMargin: "200px",
    onChange: (inView) => {
      if (inView) {
        setItemsToShow((prev) =>
          Math.min(prev + ITEMS_PER_PAGE, images.length),
        );
      }
    },
  });

  const open = (i: number) => setActiveIndex(i);
  const close = () => setActiveIndex(null);
  const prev = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  }, [activeIndex, images.length]);
  const next = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % images.length);
  }, [activeIndex, images.length]);

  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (activeIndex !== null) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Focus modal slightly after it mounts
      setTimeout(() => modalRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      previousFocusRef.current?.focus();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, prev, next]);

  return (
    <>
      <div className='columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4 relative'>
        {images.slice(0, itemsToShow).map((img, i) => (
          <div
            key={img._key ?? i}
            className='break-inside-avoid group relative overflow-hidden rounded-2xl border-4 border-primary cursor-pointer shadow-[4px_4px_0px_0px_#162836] hover:shadow-[8px_8px_0px_0px_#cf7650] transition-all duration-300 hover:-translate-y-1'
            style={{ animationDelay: `${i * 50}ms` }}
            onClick={() => open(i)}
          >
            <Image
              src={img.url}
              alt={img.alt ?? `Foto ${i + 1}`}
              width={800}
              height={800}
              className='w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
            <div className='absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-300 flex items-center justify-center'>
              <ZoomIn className='w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg' />
            </div>
          </div>
        ))}
      </div>

      {itemsToShow < images.length && (
        <div ref={ref} className='w-full py-12 flex justify-center'>
          <div className='flex gap-2 isolate'>
            <div className='w-4 h-4 bg-accent-orange rounded-full animate-bounce [animation-delay:-0.3s] shadow-[2px_2px_0px_0px_#162836]'></div>
            <div className='w-4 h-4 bg-accent-peach rounded-full animate-bounce [animation-delay:-0.15s] shadow-[2px_2px_0px_0px_#162836]'></div>
            <div className='w-4 h-4 bg-primary rounded-full animate-bounce shadow-[2px_2px_0px_0px_#dba58a]'></div>
          </div>
        </div>
      )}

      {activeIndex !== null && (
        <div
          ref={modalRef}
          tabIndex={-1}
          role='dialog'
          aria-modal='true'
          aria-label='Image gallery lightbox'
          className='fixed inset-0 z-[100] bg-primary/95 backdrop-blur-sm flex items-center justify-center focus:outline-none'
          onClick={close}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              // simple focus trap
              e.preventDefault();
            }
          }}
        >
          <button
            type='button'
            onClick={close}
            className='absolute top-4 right-4 bg-white border-4 border-primary rounded-2xl p-2 shadow-[4px_4px_0px_0px_#cf7650] hover:bg-accent-peach transition-colors z-10'
            aria-label='Close lightbox'
          >
            <X className='w-6 h-6 text-primary' />
          </button>

          <div
            className='absolute top-4 left-4 bg-accent-orange text-white font-display font-black px-4 py-2 rounded-xl border-4 border-primary shadow-[4px_4px_0px_0px_#162836] z-10'
            aria-hidden='true'
          >
            {activeIndex + 1} / {images.length}
          </div>

          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className='absolute left-4 md:left-8 bg-white border-4 border-primary rounded-2xl p-3 shadow-[4px_4px_0px_0px_#162836] hover:bg-accent-peach transition-colors z-10'
            aria-label='Previous photo'
          >
            <ChevronLeft className='w-6 h-6 text-primary' />
          </button>

          <div
            className='max-w-5xl max-h-[85vh] mx-16'
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex].url}
              alt={images[activeIndex].alt ?? `Foto ${activeIndex + 1}`}
              width={1200}
              height={1200}
              className='max-w-full max-h-[85vh] w-auto object-contain rounded-2xl border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]'
              sizes='100vw'
              priority
            />
          </div>

          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className='absolute right-4 md:right-8 bg-white border-4 border-primary rounded-2xl p-3 shadow-[4px_4px_0px_0px_#162836] hover:bg-accent-peach transition-colors z-10'
            aria-label='Next photo'
          >
            <ChevronRight className='w-6 h-6 text-primary' />
          </button>
        </div>
      )}
    </>
  );
}
