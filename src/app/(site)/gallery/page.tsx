import { client } from "@/sanity/client";
import { EXPERIMENTAL_getAllGalleries } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import Link from "next/link";
import { Images, CalendarDays, ArrowRight, CameraOff } from "lucide-react";

export const revalidate = 60;

export const metadata = {
  title: "Gallery | Mataram Board Game",
  description:
    "Dokumentasi foto dari setiap playday dan event Mataram Board Game Community.",
};

export default async function GalleryPage() {
  const galleries = await client.fetch(EXPERIMENTAL_getAllGalleries);

  return (
    <main className='flex-1 flex flex-col items-center pb-24 pt-8 md:pt-12 relative overflow-hidden'>
      <div className='absolute top-20 left-0 w-80 h-80 bg-accent-peach/20 rounded-full blur-3xl -z-10 animate-blob-bounce pointer-events-none' />
      <div className='absolute top-72 right-[-5%] w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl -z-10 animate-blob-bounce-delayed pointer-events-none' />

      <div className='container-fluid w-full max-w-7xl'>
        <section className='bg-accent-orange border-4 border-primary rounded-3xl p-8 md:p-16 shadow-[8px_8px_0px_0px_#162836] relative overflow-hidden mb-20 text-white'>
          <div className='absolute -right-12 -top-12 w-48 h-48 bg-primary rounded-full blur-xl opacity-20 pointer-events-none' />
          <div className='absolute -left-12 -bottom-12 w-48 h-48 bg-accent-peach rounded-full blur-xl opacity-30 pointer-events-none' />

          <div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left flex-1'>
            <div className='flex-1'>
              <div className='inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary border-2 border-primary text-white font-bold font-display mb-6 shadow-[4px_4px_0px_0px_#162836] rotate-[-2deg]'>
                <Images className='w-5 h-5' />
                <span className='uppercase tracking-wide'>Arsip Visual</span>
              </div>

              <h1 className='font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-6 uppercase drop-shadow-sm'>
                FOTO
                <br />
                <span className='inline-block transform rotate-1 bg-white text-primary border-4 border-primary shadow-[4px_4px_0px_0px_#162836] px-6 py-2 mt-4'>
                  KESERUAN
                </span>
              </h1>
              <p className='text-xl md:text-2xl font-bold text-white/90 max-w-xl mx-auto md:mx-0 mt-8 leading-relaxed'>
                Kenangan dari setiap playday & event. Klik album untuk lihat
                foto-fotonya!
              </p>
            </div>

            <div className='hidden md:flex relative shrink-0 pointer-events-none'>
              <div className='absolute inset-0 bg-primary border-4 border-primary rounded-3xl transform rotate-6 translate-x-4 translate-y-4' />
              <div className='relative flex flex-col items-center justify-center p-8 bg-white text-primary rounded-3xl border-4 border-primary shadow-[6px_6px_0px_0px_#162836] transform -rotate-3 hover:rotate-0 transition-transform w-56 h-56'>
                <Images className='w-16 h-16 text-accent-orange mb-2' />
                <span className='font-display font-black text-6xl'>
                  {galleries.length}
                </span>
                <span className='font-bold text-lg uppercase tracking-wider border-t-4 border-primary/10 pt-2 mt-2 w-full text-center'>
                  Album
                </span>
              </div>
            </div>
          </div>
        </section>

        {galleries.length === 0 ? (
          <EmptyState />
        ) : (
          <section>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
              {galleries.map((album: GalleryAlbum, i: number) => (
                <AlbumCard key={album._id} album={album} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

type GalleryAlbum = {
  _id: string;
  title: string | null;
  slug: string | null;
  imageCount: number | null;
  coverImage: unknown | null;
  event: {
    _id: string;
    title: string | null;
    slug: string | null;
    date: string | null;
  } | null;
};

function AlbumCard({ album, index }: { album: GalleryAlbum; index: number }) {
  const href = `/gallery/${album.slug}`;
  const rotations = [
    "hover:-rotate-1",
    "hover:rotate-1",
    "hover:-rotate-2",
    "hover:rotate-2",
    "hover:rotate-0",
  ];
  const rotClass = rotations[index % rotations.length];

  const accentColors = [
    "bg-accent-orange",
    "bg-accent-peach",
    "bg-primary",
    "bg-accent-orange",
    "bg-accent-peach",
    "bg-primary",
  ];
  const accentBg = accentColors[index % accentColors.length];
  const accentText = accentBg === "bg-primary" ? "text-white" : "text-primary";

  return (
    <Link
      href={href}
      className={`group block bg-white border-4 border-primary rounded-3xl overflow-hidden shadow-[6px_6px_0px_0px_#162836] hover:shadow-[10px_10px_0px_0px_#cf7650] transition-all duration-300 ${rotClass}`}
    >
      <div className='relative h-56 overflow-hidden bg-accent-peach/20'>
        {album.coverImage ? (
          <img
            src={urlForImage(album.coverImage).width(800).height(600).url()}
            alt={album.title ?? "Gallery"}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
          />
        ) : (
          <div className='w-full h-full flex flex-col items-center justify-center gap-3 bg-primary/5'>
            <Images className='w-12 h-12 text-primary/30' />
            <span className='font-bold text-primary/40 text-sm'>No Cover</span>
          </div>
        )}

        <div
          className={`absolute top-4 right-4 ${accentBg} ${accentText} font-display font-black text-sm px-3 py-1 rounded-xl border-2 border-primary shadow-[3px_3px_0px_0px_#162836]`}
        >
          {album.imageCount ?? 0} Foto
        </div>
      </div>

      <div className='p-5'>
        <h2 className='font-display font-black text-2xl text-primary leading-tight mb-2 group-hover:text-accent-orange transition-colors'>
          {album.title}
        </h2>

        {album.event?.date && (
          <p className='flex items-center gap-2 text-primary/60 font-bold text-sm mb-3'>
            <CalendarDays className='w-4 h-4' />
            {new Date(album.event.date).toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}

        <div className='flex items-center gap-2 font-bold text-accent-orange'>
          <span>Lihat Foto</span>
          <ArrowRight className='w-4 h-4 group-hover:translate-x-2 transition-transform' />
        </div>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className='flex flex-col items-center justify-center py-32 text-center'>
      <div className='bg-white border-4 border-primary rounded-3xl p-12 shadow-[8px_8px_0px_0px_#162836] max-w-md'>
        <div className='w-20 h-20 bg-accent-peach/30 rounded-2xl border-4 border-primary flex items-center justify-center mx-auto mb-6 rotate-6'>
          <CameraOff className='w-10 h-10 text-primary' />
        </div>
        <h2 className='font-display font-black text-3xl text-primary mb-3'>
          BELUM ADA FOTO
        </h2>
        <p className='text-primary/70 font-bold'>
          Gallery masih kosong. Foto-foto dari playday akan segera muncul di
          sini!
        </p>
      </div>
    </div>
  );
}
