import { Instagram, MessageCircle } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className='w-full bg-accent-orange text-background py-10 md:py-12 border-t-[4px] border-primary flex flex-col items-center justify-center text-center relative overflow-visible mt-auto'>
      <div className='absolute top-4 right-8 w-20 h-20 md:w-32 md:h-32 opacity-80 z-0 pointer-events-none rotate-12'>
        <Image
          src='/logo_white.png'
          alt='MBGC Logo'
          fill
          sizes='(max-width: 768px) 80px, 128px'
          className='object-contain drop-shadow-lg'
        />
      </div>
      <div className='absolute top-1/2 left-10 w-16 h-16 border-[4px] border-primary rounded-full opacity-30'></div>
      <div className='absolute bottom-5 right-10 w-16 h-16 bg-accent-peach rotate-45 rounded-2xl opacity-30'></div>

      <h2 className='font-display text-4xl md:text-6xl font-black mb-4 z-10'>
        READY TO PLAY?
      </h2>
      <p className='text-xl md:text-2xl font-bold mb-6 max-w-xl z-10 px-4'>
        Follow kami di Instagram atau gabung grup WhatsApp untuk info playday
        terbaru!
      </p>

      <div className='flex flex-col sm:flex-row gap-4 z-10'>
        <a
          href='https://instagram.com/mataram_bg'
          target='_blank'
          rel='noreferrer'
          className='bg-primary text-white font-display text-xl px-6 py-3 rounded-xl shadow-[4px_4px_0px_0px_#fdfaf4] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#fdfaf4] transition-all flex border-2 border-primary items-center justify-center gap-2'
        >
          <Instagram size={24} /> @mataram_bg
        </a>
        <a
          href='https://bit.ly/MBGCgroup'
          target='_blank'
          rel='noreferrer'
          className='bg-white text-primary font-display text-xl px-6 py-3 rounded-xl shadow-[4px_4px_0px_0px_#162836] border-2 border-primary hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#162836] transition-all flex items-center justify-center gap-2'
        >
          <MessageCircle size={24} /> Join WhatsApp
        </a>
        <a
          href='https://wa.me/6285156110807'
          target='_blank'
          rel='noreferrer'
          className='bg-white text-primary font-display text-xl px-6 py-3 rounded-xl shadow-[4px_4px_0px_0px_#162836] border-2 border-primary hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#162836] transition-all flex items-center justify-center gap-2'
        >
          <MessageCircle size={24} /> WhatsApp Kami
        </a>
      </div>
    </footer>
  );
}
