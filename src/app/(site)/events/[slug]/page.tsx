import { client } from "@/sanity/client";
import { EXPERIMENTAL_getEventBySlug } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  ArrowLeft,
  Share2,
  Ticket,
} from "lucide-react";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const event = await client.fetch(EXPERIMENTAL_getEventBySlug, {
    slug: resolvedParams.slug,
  });

  if (!event) {
    notFound();
  }

  const eventDate = event.date ? new Date(event.date) : null;
  const isUpcoming = eventDate && eventDate >= new Date();

  return (
    <main className='flex-1 flex flex-col items-center pb-24 pt-8'>
      <div className='container-fluid w-full max-w-6xl'>
        <Link
          href='/events'
          className='inline-flex items-center text-primary font-bold hover:text-accent-orange mb-8 group transition-colors bg-white px-4 py-2 rounded-xl border-2 border-primary shadow-[2px_2px_0px_0px_#162836] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]'
        >
          <ArrowLeft className='w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform' />
          KEMBALI KE JADWAL
        </Link>

        {/* 2 Column Layout for Desktop */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
          {/* Left Column - Poster */}
          <div className='lg:col-span-5 w-full sticky top-24'>
            <div className='bg-white border-4 border-primary rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_#162836] relative w-full'>
              {event.image ? (
                <Image
                  src={urlForImage(event.image).url()}
                  alt={event.title || "Event Image"}
                  width={1080}
                  height={1080}
                  priority
                  className='w-full h-auto object-contain'
                  sizes='(max-width: 1024px) 100vw, 50vw'
                />
              ) : (
                <div className='w-full aspect-square flex items-center justify-center bg-accent-peach/20'>
                  <Ticket className='w-24 h-24 text-accent-orange/30 transform -rotate-12' />
                </div>
              )}

              {/* Status Badge */}
              {isUpcoming && (
                <div className='absolute top-6 left-6 z-10'>
                  <div className='bg-accent-peach text-primary font-black font-display text-xl px-6 py-2 rounded-xl border-4 border-primary shadow-[4px_4px_0px_0px_#162836] transform -rotate-3'>
                    UPCOMING!
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Event Details */}
          <div className='lg:col-span-7 bg-white border-4 border-primary rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_0px_#162836]'>
            <div className='mb-10'>
              <div className='flex justify-between items-start gap-4 mb-8'>
                <h1 className='font-display text-4xl md:text-5xl font-black text-primary leading-[1.1] tracking-tight uppercase flex-1'>
                  {event.title}
                </h1>

                {/* Floating Date Badge inside layout */}
                {eventDate && (
                  <div className='hidden sm:flex bg-primary text-white font-black font-display text-center rounded-2xl border-4 border-primary shadow-[4px_4px_0px_0px_#dba58a] transform rotate-3 flex-col w-28 flex-shrink-0'>
                    <div className='bg-accent-orange px-2 py-2 text-sm uppercase tracking-widest border-b-4 border-primary'>
                      {eventDate.toLocaleDateString("id-ID", {
                        month: "short",
                      })}
                    </div>
                    <div className='px-2 py-3 text-4xl leading-none'>
                      {eventDate.toLocaleDateString("id-ID", {
                        day: "numeric",
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Meta Info Grid */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 bg-primary/5 p-6 rounded-2xl border-2 border-primary border-dashed'>
                {eventDate && (
                  <div className='flex items-center text-primary font-bold'>
                    <div className='w-12 h-12 rounded-xl bg-accent-peach/50 border-2 border-primary flex items-center justify-center mr-4'>
                      <CalendarIcon className='w-6 h-6 text-primary' />
                    </div>
                    <div>
                      <div className='text-xs uppercase tracking-wider opacity-60'>
                        Tanggal
                      </div>
                      <div>
                        {eventDate.toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {eventDate && (
                  <div className='flex items-center text-primary font-bold'>
                    <div className='w-12 h-12 rounded-xl bg-accent-orange/50 border-2 border-primary flex items-center justify-center mr-4 flex-shrink-0'>
                      <ClockIcon className='w-6 h-6 text-primary' />
                    </div>
                    <div>
                      <div className='text-xs uppercase tracking-wider opacity-60'>
                        Waktu
                      </div>
                      <div>
                        {eventDate.toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        WITA
                      </div>
                    </div>
                  </div>
                )}

                {event.location && (
                  <div className='flex items-center text-primary font-bold sm:col-span-2 mt-2 pt-4 border-t-2 border-primary/10 border-dashed'>
                    <div className='w-12 h-12 rounded-xl bg-white border-2 border-primary flex items-center justify-center mr-4 flex-shrink-0'>
                      <MapPinIcon className='w-6 h-6 text-primary' />
                    </div>
                    <div>
                      <div className='text-xs uppercase tracking-wider opacity-60'>
                        Lokasi Playday
                      </div>
                      <div className='text-lg'>{event.location}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='prose prose-lg prose-headings:font-display prose-headings:font-black prose-headings:text-primary prose-a:text-accent-orange prose-a:font-bold prose-strong:font-black max-w-none text-primary/80'>
              {event.description ? (
                <PortableText value={event.description} />
              ) : (
                <p className='italic text-primary/50'>
                  Tidak ada deskripsi untuk event ini. Langsung datang ke lokasi
                  aja dan main bareng!
                </p>
              )}
            </div>

            {/* Action Footer */}
            <div className='mt-12 pt-8 border-t-4 border-primary border-dashed flex flex-col sm:flex-row items-center gap-4'>
              <a
                href='https://wa.me/6281234567890?text=Halo%20Admin%20MBGC!%20Saya%20mau%20join%20Playday%20dong.'
                target='_blank'
                rel='noopener noreferrer'
                className='w-full sm:flex-1 px-6 py-4 bg-accent-orange text-white font-display font-black text-xl text-center rounded-xl border-4 border-primary shadow-[6px_6px_0px_0px_#162836] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_#162836] transition-all'
              >
                JOIN GRUP WA!
              </a>

              <button className='w-full sm:w-auto px-6 py-4 bg-white text-primary font-display font-bold text-lg text-center rounded-xl border-4 border-primary shadow-[6px_6px_0px_0px_#dba58a] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_#dba58a] transition-all flex items-center justify-center'>
                <Share2 className='w-5 h-5 mr-2' />
                SHARE
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
