import { ArrowRight, CalendarDays, MapPin, ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import {
  EXPERIMENTAL_getUpcomingEvents,
  EXPERIMENTAL_getAllGalleries,
} from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 60;

export default async function Home() {
  const [upcomingEvents, galleries] = await Promise.all([
    client.fetch(EXPERIMENTAL_getUpcomingEvents),
    client.fetch(EXPERIMENTAL_getAllGalleries),
  ]);

  const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;
  const recentGalleries = galleries.slice(0, 2);

  return (
    <main className='flex-1 flex flex-col items-center'>
      <header className='container-fluid pt-10 pb-32 flex flex-col items-center text-center relative overflow-hidden md:overflow-visible'>
        <div className='absolute -z-10 pointer-events-none top-10 left-[-5%] md:left-[10%] w-20 h-20 md:w-24 md:h-24 opacity-30 md:opacity-80 animate-blob-bounce-delayed'>
          <Image
            src='/meeple_peach.svg'
            alt='Meeple'
            width={96}
            height={96}
            className='w-full h-full object-contain -rotate-12'
          />
        </div>
        <div
          className='absolute -z-10 pointer-events-none top-32 md:top-40 right-[-5%] md:right-[20%] w-16 h-16 md:w-20 md:h-20 opacity-30 md:opacity-90 animate-blob-bounce-delayed'
          style={{ animationDelay: "2s" }}
        >
          <Image
            src='/dice_white.svg'
            alt='Dice'
            width={80}
            height={80}
            className='w-full h-full object-contain rotate-12'
          />
        </div>
        <div className='absolute -z-10 pointer-events-none bottom-[10%] md:bottom-20 right-[-5%] md:right-[15%] w-24 h-24 md:w-28 md:h-28 opacity-30 md:opacity-90 animate-blob-bounce'>
          <Image
            src='/meeple_orange.svg'
            alt='Meeple'
            width={112}
            height={112}
            className='w-full h-full object-contain rotate-45'
          />
        </div>
        <div className='absolute -z-10 pointer-events-none bottom-[30%] md:bottom-40 left-[-5%] md:left-[15%] w-16 h-16 md:w-20 md:h-20 opacity-20 md:opacity-60 animate-blob-bounce'>
          <Image
            src='/meeple_dark_blue.svg'
            alt='Meeple'
            width={80}
            height={80}
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
        {nextEvent ? (
          <div className='mt-16 w-full max-w-3xl bg-white border-playful rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[8px_8px_0px_0px_#162836] relative overflow-hidden group'>
            <div className='absolute -right-10 -top-10 w-40 h-40 bg-accent-peach rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700'></div>

            <div className='relative text-left flex-1'>
              <h3 className='text-accent-orange font-bold text-lg mb-1 flex items-center gap-2'>
                <CalendarDays size={20} /> EVENT TERDEKAT
              </h3>
              <h2 className='font-display text-4xl font-bold text-primary mb-3'>
                {nextEvent.title}
              </h2>
              <div className='flex flex-wrap gap-4 text-primary/80 font-bold'>
                <span className='flex items-center gap-1'>
                  <CalendarDays size={18} />{" "}
                  {nextEvent.date
                    ? new Date(nextEvent.date).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "TBA"}
                </span>
                {nextEvent.location && (
                  <span className='flex items-center gap-1'>
                    <MapPin size={18} /> {nextEvent.location}
                  </span>
                )}
              </div>
            </div>

            <div className='shrink-0 relative'>
              <Link
                href={`/events/${nextEvent.slug}`}
                className='bg-accent-orange text-white font-display text-xl font-bold px-8 py-4 rounded-xl border-playful shadow-[4px_4px_0px_0px_#162836] hover:shadow-[6px_6px_0px_0px_#162836] hover:-translate-y-1 transition-all active:translate-y-1 active:shadow-[0px_0px_0px_0px_#162836] flex items-center gap-2'
              >
                DETAIL EVENT <ArrowRight size={24} />
              </Link>
            </div>
          </div>
        ) : (
          <div className='mt-16 w-full max-w-3xl bg-white border-playful rounded-2xl p-8 text-center shadow-[8px_8px_0px_0px_#162836]'>
            <h3 className='font-display text-3xl font-bold text-primary mb-2'>
              Tunggu Event Selanjutnya!
            </h3>
            <p className='text-primary/70 font-bold'>
              Saat ini belum ada jadwal playday terdekat. Pantau terus IG kami
              atau gabung grup untuk info terbaru.
            </p>
          </div>
        )}
      </header>

      <section className='w-full bg-primary text-background py-24 border-y-4 border-primary relative overflow-visible'>
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
            {recentGalleries.length > 0 ? (
              <>
                {recentGalleries[0] && (
                  <Link
                    href={`/gallery/${recentGalleries[0].slug}`}
                    className='col-span-1 md:col-span-2 group relative h-100 rounded-2xl overflow-hidden border-[3px] border-background bg-primary'
                  >
                    <div className='absolute inset-0 bg-accent-orange/20 group-hover:bg-transparent transition-colors z-10'></div>
                    <div className='absolute bottom-6 left-6 z-20'>
                      <span className='bg-background text-primary font-display font-black text-xl px-4 py-2 border-2 border-primary shadow-[4px_4px_0px_0px_#162836]'>
                        {recentGalleries[0].title}
                      </span>
                    </div>
                    {recentGalleries[0].coverImage ? (
                      <Image
                        src={urlForImage(recentGalleries[0].coverImage)
                          .width(1200)
                          .height(800)
                          .url()}
                        alt={recentGalleries[0].title || "Gallery"}
                        width={1200}
                        height={800}
                        className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-700'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center'>
                        <ImageIcon size={48} className='text-background/20' />
                      </div>
                    )}
                  </Link>
                )}
                {recentGalleries[1] && (
                  <Link
                    href={`/gallery/${recentGalleries[1].slug}`}
                    className='group relative h-100 rounded-2xl overflow-hidden border-[3px] border-background bg-accent-peach'
                  >
                    <div className='absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10'></div>
                    <div className='absolute bottom-6 left-6 z-20'>
                      <span className='bg-background text-primary font-display font-black text-xl px-4 py-2 border-2 border-primary shadow-[4px_4px_0px_0px_#162836]'>
                        {recentGalleries[1].title}
                      </span>
                    </div>
                    {recentGalleries[1].coverImage ? (
                      <Image
                        src={urlForImage(recentGalleries[1].coverImage)
                          .width(800)
                          .height(800)
                          .url()}
                        alt={recentGalleries[1].title || "Gallery"}
                        width={800}
                        height={800}
                        className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 mix-blend-multiply'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center'>
                        <ImageIcon size={48} className='text-primary/20' />
                      </div>
                    )}
                  </Link>
                )}
              </>
            ) : (
              <div className='col-span-1 md:col-span-3 text-center py-20 bg-primary-dark/20 rounded-2xl border-[3px] border-background shadow-inner opacity-70'>
                <p className='font-bold text-lg'>Belum ada foto keseruan.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
