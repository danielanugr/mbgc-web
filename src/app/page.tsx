import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Instagram,
  Youtube,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className='flex-1 flex flex-col items-center'>
      <nav className='w-full flex items-center justify-between py-6 container-fluid'>
        <div className='font-display font-bold text-2xl tracking-tighter text-primary'>
          MBGC<span className='text-accent-orange'>.</span>
        </div>
        <div className='hidden md:flex gap-8 font-bold text-lg'>
          <Link
            href='/event'
            className='hover:text-accent-orange transition-colors'
          >
            Events
          </Link>
          <Link
            href='/gallery'
            className='hover:text-accent-orange transition-colors'
          >
            Gallery
          </Link>
          <Link
            href='/inventory'
            className='hover:text-accent-orange transition-colors'
          >
            Games
          </Link>
          <Link
            href='/about'
            className='hover:text-accent-orange transition-colors'
          >
            About Us
          </Link>
        </div>
        <button className='bg-primary text-white font-bold px-6 py-2 rounded-full shadow-playful hover:shadow-playful-hover transition-all active:translate-y-1 active:shadow-none'>
          Join Us!
        </button>
      </nav>

      <header className='container-fluid pt-20 pb-32 flex flex-col items-center text-center relative overflow-hidden md:overflow-visible'>
        <div className='absolute -z-10 pointer-events-none top-10 left-[-5%] md:left-[10%] w-20 h-20 md:w-24 md:h-24 opacity-30 md:opacity-80 animate-blob-bounce-delayed'>
          <img
            src='/meeple_peach.svg'
            alt='Meeple'
            className='w-full h-full object-contain -rotate-12'
          />
        </div>
        <div
          className='absolute -z-10 pointer-events-none top-32 md:top-40 right-[-5%] md:right-[20%] w-16 h-16 md:w-20 md:h-20 opacity-30 md:opacity-90 animate-blob-bounce-delayed'
          style={{ animationDelay: "2s" }}
        >
          <img
            src='/dice_white.svg'
            alt='Dice'
            className='w-full h-full object-contain rotate-12'
          />
        </div>
        <div className='absolute -z-10 pointer-events-none bottom-[10%] md:bottom-20 right-[-5%] md:right-[15%] w-24 h-24 md:w-28 md:h-28 opacity-30 md:opacity-90 animate-blob-bounce'>
          <img
            src='/meeple_orange.svg'
            alt='Meeple'
            className='w-full h-full object-contain rotate-45'
          />
        </div>
        <div className='absolute -z-10 pointer-events-none bottom-[30%] md:bottom-40 left-[-5%] md:left-[15%] w-16 h-16 md:w-20 md:h-20 opacity-20 md:opacity-60 animate-blob-bounce'>
          <img
            src='/meeple_dark_blue.svg'
            alt='Meeple'
            className='w-full h-full object-contain -rotate-45'
          />
        </div>
        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full border-playful bg-white mb-8 border-primary text-primary font-bold shadow-[2px_2px_0px_0px_#162836]'>
          <span className='w-3 h-3 rounded-full bg-accent-orange animate-pulse'></span>
          Komunitas Board Game Terbesar di Mataram
        </div>
        <h1 className='font-display text-6xl md:text-8xl font-black leading-[0.9] tracking-tight max-w-5xl text-primary'>
          ROLL THE DICE,
          <br /> <span className='text-accent-orange'>PLAY</span> THE GAME!
        </h1>
        <p className='mt-8 text-xl md:text-2xl font-medium max-w-2xl text-primary/80'>
          Gabung keseruannya sekarang! Main bareng, ketawa bareng, dari board
          game ringan sampai yang mikir keras.
        </p>
        <div className='mt-16 w-full max-w-3xl bg-white border-playful rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[8px_8px_0px_0px_#162836] relative overflow-hidden group'>
          <div className='absolute -right-10 -top-10 w-40 h-40 bg-accent-peach rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700'></div>

          <div className='relative text-left flex-1'>
            <h3 className='text-accent-orange font-bold text-lg mb-1 flex items-center gap-2'>
              <CalendarDays size={20} /> EVENT TERDEKAT
            </h3>
            <h2 className='font-display text-4xl font-bold text-primary mb-3'>
              Playday #24: Weekend Warriors
            </h2>
            <div className='flex flex-wrap gap-4 text-primary/80 font-bold'>
              <span className='flex items-center gap-1'>
                <CalendarDays size={18} /> Minggu, 25 Nov 2023
              </span>
              <span className='flex items-center gap-1'>
                <MapPin size={18} /> Kopi Koccoc, Mataram
              </span>
            </div>
          </div>

          <div className='shrink-0 relative'>
            <button className='bg-accent-orange text-white font-display text-xl font-bold px-8 py-4 rounded-xl border-playful shadow-[4px_4px_0px_0px_#162836] hover:shadow-[6px_6px_0px_0px_#162836] hover:-translate-y-1 transition-all active:translate-y-1 active:shadow-[0px_0px_0px_0px_#162836] flex items-center gap-2'>
              RSVP NOW <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </header>

      <section className='w-full bg-primary text-background py-24 border-y-[4px] border-primary relative overflow-visible'>
        {" "}
        <div className='container-fluid'>
          <div className='flex flex-col md:flex-row items-end justify-between mb-16 gap-6'>
            <div className='max-w-2xl'>
              <h2 className='font-display text-5xl md:text-7xl font-bold text-accent-peach mb-4'>
                MOMENT KESERUAN
              </h2>
              <p className='text-xl font-medium opacity-90'>
                Dokumentasi keseruan dari playday sebelumnya. Jangan sampai
                kelewatan event berikutnya!
              </p>
            </div>
            <Link
              href='/gallery'
              className='group flex items-center gap-2 font-bold text-xl hover:text-accent-orange transition-colors'
            >
              Lihat Semua{" "}
              <ArrowRight className='group-hover:translate-x-2 transition-transform' />
            </Link>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='col-span-1 md:col-span-2 group relative h-[400px] rounded-2xl overflow-hidden border-[3px] border-background'>
              <div className='absolute inset-0 bg-accent-orange/20 group-hover:bg-transparent transition-colors z-10'></div>
              <img
                src='https://images.unsplash.com/photo-1632501641765-e5e8d5a71019?q=80&w=1500&auto=format&fit=crop'
                alt='Board Game Playing'
                className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-700'
              />
            </div>
            <div className='group relative h-[400px] rounded-2xl overflow-hidden border-[3px] border-background bg-accent-peach'>
              <div className='absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10'></div>
              <img
                src='https://images.unsplash.com/photo-1611891487122-2075b9e7fd18?q=80&w=800&auto=format&fit=crop'
                alt='Dice overlay'
                className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 mix-blend-multiply'
              />
            </div>
          </div>
        </div>
      </section>

      <section className='container-fluid py-24 relative'>
        <h2 className='font-display text-5xl md:text-6xl font-bold text-primary mb-16 text-center'>
          KITA DI <span className='text-accent-orange'>SOCIAL MEDIA</span>
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          <div className='bg-white border-playful rounded-3xl p-8 shadow-playful relative'>
            <div className='absolute -top-6 -left-6 bg-primary text-white p-4 rounded-xl rotate-[-12deg] border-playful flex items-center gap-2'>
              <Youtube size={32} />
              <span className='font-display font-bold text-xl'>
                TikTok Reels
              </span>
            </div>
            <div className='mt-8 grid grid-cols-2 gap-4'>
              <div className='aspect-[9/16] bg-gray-100 rounded-xl border-dashed border-2 border-primary/30 flex justify-center items-center font-bold text-primary/50 text-center p-4'>
                Mockup TikTok
                <br />
                Embed #1
              </div>
              <div className='aspect-[9/16] bg-gray-100 rounded-xl border-dashed border-2 border-primary/30 flex justify-center items-center font-bold text-primary/50 text-center p-4'>
                Mockup TikTok
                <br />
                Embed #2
              </div>
            </div>
          </div>

          <div className='bg-accent-peach/20 border-playful rounded-3xl p-8 shadow-playful relative'>
            <div className='absolute -top-6 -right-6 bg-accent-orange text-white p-4 rounded-xl rotate-[12deg] border-playful flex items-center gap-2'>
              <Instagram size={32} />
              <span className='font-display font-bold text-xl'>Instagram</span>
            </div>
            <div className='mt-8 grid grid-cols-2 gap-4'>
              <div className='aspect-square bg-white rounded-xl border-playful flex justify-center items-center font-bold text-primary/50 text-center p-4'>
                Mockup IG Post/Reel #1
              </div>
              <div className='aspect-square bg-white rounded-xl border-playful flex justify-center items-center font-bold text-primary/50 text-center p-4'>
                Mockup IG Post/Reel #2
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className='w-full bg-accent-orange text-background py-16 border-t-[4px] border-primary flex flex-col items-center justify-center text-center relative overflow-visible'>
        {" "}
        <div className='absolute top-1/2 left-10 w-24 h-24 border-[6px] border-primary rounded-full opacity-30'></div>
        <div className='absolute bottom-5 right-10 w-24 h-24 bg-accent-peach rotate-45 rounded-2xl opacity-30'></div>
        <h2 className='font-display text-4xl md:text-6xl font-black mb-6 z-10'>
          READY TO PLAY?
        </h2>
        <p className='text-xl md:text-2xl font-bold mb-8 max-w-xl z-10 px-4'>
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
          <button className='bg-white text-primary font-display text-xl px-6 py-3 rounded-xl shadow-[4px_4px_0px_0px_#162836] border-2 border-primary hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#162836] transition-all flex items-center justify-center gap-2'>
            Join WhatsApp
          </button>
        </div>
      </footer>
    </main>
  );
}
