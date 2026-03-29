import { client } from "@/sanity/client";
import {
  EXPERIMENTAL_getEventsPaginated,
  EXPERIMENTAL_getTotalEvents,
} from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, MapPinIcon, Ticket, PartyPopper } from "lucide-react";

import { generateSEOMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata = generateSEOMetadata({
  title: "Events",
  description:
    "Daftar jadwal kumpul main dan playday Mataram Board Game Community.",
  url: "/events",
});

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page =
    typeof resolvedSearchParams.page === "string"
      ? parseInt(resolvedSearchParams.page)
      : 1;
  const limit = 9;
  const start = (page - 1) * limit;
  const end = start + limit;

  const [events, totalEvents] = await Promise.all([
    client.fetch(EXPERIMENTAL_getEventsPaginated, { start, end }),
    client.fetch(EXPERIMENTAL_getTotalEvents),
  ]);

  const totalPages = Math.ceil(totalEvents / limit);

  return (
    <main className='flex-1 flex flex-col items-center pb-24 pt-8 md:pt-12 relative overflow-hidden'>
      <div className='absolute top-20 left-0 w-72 h-72 bg-accent-peach/20 rounded-full blur-3xl -z-10 animate-blob-bounce'></div>
      <div className='absolute top-60 right-[-10%] w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl -z-10 animate-blob-bounce-delayed'></div>

      <div className='container-fluid w-full max-w-7xl'>
        <section className='bg-accent-peach border-4 border-primary rounded-3xl p-8 md:p-16 shadow-[8px_8px_0px_0px_#162836] relative overflow-hidden mb-20 text-primary'>
          <div className='absolute -right-10 -top-10 w-48 h-48 bg-white rounded-full blur-xl opacity-30'></div>
          <div className='absolute -left-10 -bottom-10 w-48 h-48 bg-accent-orange rounded-full blur-xl opacity-30'></div>

          <div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left flex-1'>
            <div className='flex-1'>
              <div className='inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border-2 border-primary text-primary font-bold font-display mb-6 shadow-[4px_4px_0px_0px_#162836] -rotate-2'>
                <PartyPopper className='w-5 h-5' />
                <span className='uppercase tracking-wide'>
                  Kumpul & Main Bareng
                </span>
              </div>

              <h1 className='font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-6 uppercase drop-shadow-sm'>
                PLAYDAY
                <br />
                <span className='inline-block transform rotate-1 bg-primary text-white border-4 border-primary shadow-[4px_4px_0px_0px_#162836] px-6 py-2 mt-4'>
                  & EVENT
                </span>
              </h1>
              <p className='text-xl md:text-2xl font-bold text-primary/80 max-w-xl mx-auto md:mx-0 mt-8 leading-relaxed'>
                Jadwal playday rutin, turnamen, dan kumpul seru penggemar board
                game se-Kota Mataram. Kosongin jadwalmu!
              </p>
            </div>

            <div className='hidden md:flex relative pointer-events-none'>
              <div className='absolute inset-0 bg-primary border-4 border-primary rounded-3xl transform rotate-6 translate-x-4 translate-y-4'></div>
              <div className='relative flex flex-col items-center justify-center p-8 bg-white text-primary rounded-3xl border-4 border-primary shadow-[6px_6px_0px_0px_#162836] transform -rotate-3 hover:rotate-0 transition-transform w-56 h-56'>
                <Ticket className='w-16 h-16 text-accent-orange mb-2' />
                <span className='font-display font-black text-6xl'>
                  {totalEvents}
                </span>
                <span className='font-bold text-lg uppercase tracking-wider border-t-4 border-primary/10 pt-2 mt-2 w-full text-center'>
                  Events
                </span>
              </div>
            </div>
          </div>
        </section>

        {events.length === 0 ? (
          <div className='w-full bg-white border-4 border-primary rounded-3xl p-20 flex flex-col items-center justify-center text-center shadow-[8px_8px_0px_0px_#162836]'>
            <div className='w-32 h-32 bg-primary/5 rounded-full flex items-center justify-center mb-6'>
              <CalendarIcon className='w-16 h-16 text-primary/30' />
            </div>
            <h2 className='font-display font-black text-3xl text-primary mb-4'>
              Jadwal Masih Kosong!
            </h2>
            <p className='text-xl text-primary/60 font-medium max-w-md'>
              Belum ada event dalam waktu dekat nih. Pantau terus Instagram kita
              ya buat info playday selanjutnya! 😢
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12'>
            {events.map(
              (
                event: any /* eslint-disable-line @typescript-eslint/no-explicit-any */,
              ) => {
                const eventDate = new Date(event.date);
                const isUpcoming = event.date && eventDate >= new Date();

                return (
                  <Link
                    key={event._id}
                    href={`/events/${event.slug}`}
                    className='bg-white border-4 border-primary rounded-2xl flex flex-col group hover:-translate-y-3 transition-all duration-300 relative h-full'
                    style={{ boxShadow: "6px 6px 0px 0px #162836" }}
                  >
                    <div className='relative w-full aspect-4/3 border-b-4 border-primary overflow-hidden rounded-t-xl bg-primary/5 box-border'>
                      {event.image ? (
                        <Image
                          src={urlForImage(event.image).url()}
                          alt={event.title || "Event Image"}
                          fill
                          className='object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out'
                          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        />
                      ) : (
                        <div className='absolute inset-0 flex items-center justify-center bg-accent-peach/20'>
                          <CalendarIcon className='w-20 h-20 text-accent-orange/40' />
                        </div>
                      )}
                      <div className='absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300'></div>

                      {isUpcoming && (
                        <div className='absolute top-4 left-4 bg-accent-peach text-primary font-black font-display px-4 py-2 rounded-xl border-2 border-primary shadow-[2px_2px_0px_0px_#162836] transform -rotate-3 z-10'>
                          Upcoming!
                        </div>
                      )}

                      {event.date && (
                        <div className='absolute bottom-4 right-4 bg-primary text-white font-black font-display text-center rounded-xl border-2 border-primary shadow-[4px_4px_0px_0px_#dba58a] transform rotate-3 group-hover:scale-110 transition-transform z-10 overflow-hidden flex flex-col'>
                          <div className='bg-accent-orange px-4 py-1 text-sm uppercase tracking-widest border-b-2 border-primary'>
                            {eventDate.toLocaleDateString("id-ID", {
                              month: "short",
                            })}
                          </div>
                          <div className='px-4 py-2 text-2xl leading-none'>
                            {eventDate.toLocaleDateString("id-ID", {
                              day: "numeric",
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className='p-6 flex-1 flex flex-col justify-between bg-white rounded-b-xl'>
                      <div>
                        <h3 className='font-display font-black text-2xl text-primary leading-tight mb-4 group-hover:text-accent-orange transition-colors line-clamp-2'>
                          {event.title}
                        </h3>

                        <div className='space-y-4 font-bold text-primary/80 mt-6 pt-4 border-t-2 border-primary/10'>
                          {event.date && (
                            <div className='flex items-center text-sm'>
                              <div className='w-8 h-8 rounded-full bg-accent-peach/20 border-2 border-primary flex items-center justify-center mr-3 shrink-0'>
                                <CalendarIcon className='w-4 h-4 text-accent-orange' />
                              </div>
                              <span>
                                {eventDate.toLocaleDateString("id-ID", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                          )}
                          {event.location && (
                            <div className='flex items-center text-sm'>
                              <div className='w-8 h-8 rounded-full bg-accent-peach/20 border-2 border-primary flex items-center justify-center mr-3 shrink-0'>
                                <MapPinIcon className='w-4 h-4 text-accent-orange' />
                              </div>
                              <span className='truncate'>{event.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              },
            )}
          </div>
        )}

        {totalPages > 1 && (
          <div className='flex justify-center items-center gap-4 mt-20 font-display font-bold'>
            {page > 1 ? (
              <Link
                href={`/events?page=${page - 1}`}
                className='px-6 py-4 rounded-xl border-4 border-primary bg-white text-primary hover:bg-accent-orange hover:text-white shadow-[6px_6px_0px_0px_#162836] hover:shadow-[2px_2px_0px_0px_#162836] hover:translate-y-1 hover:translate-x-1 active:shadow-none active:translate-y-1.5 active:translate-x-1.5 transition-all text-xl uppercase'
              >
                Sebelumnya
              </Link>
            ) : (
              <div className='px-6 py-4 rounded-xl border-4 border-primary/30 bg-primary/5 text-primary/40 text-xl uppercase pointer-events-none'>
                Sebelumnya
              </div>
            )}

            <div className='bg-white px-6 py-4 rounded-xl border-4 border-primary shadow-[4px_4px_0px_0px_#dba58a] transform -rotate-2'>
              <span className='text-xl text-primary font-black'>
                {page} / {totalPages}
              </span>
            </div>

            {page < totalPages ? (
              <Link
                href={`/events?page=${page + 1}`}
                className='px-6 py-4 rounded-xl border-4 border-primary bg-accent-peach text-primary hover:bg-accent-orange hover:text-white shadow-[6px_6px_0px_0px_#162836] hover:shadow-[2px_2px_0px_0px_#162836] hover:translate-y-1 hover:translate-x-1 active:shadow-none active:translate-y-1.5 active:translate-x-1.5 transition-all text-xl uppercase'
              >
                Selanjutnya
              </Link>
            ) : (
              <div className='px-6 py-4 rounded-xl border-4 border-primary/30 bg-primary/5 text-primary/40 text-xl uppercase pointer-events-none'>
                Selanjutnya
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
