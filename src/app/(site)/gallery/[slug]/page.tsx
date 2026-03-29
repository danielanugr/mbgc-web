import { client } from "@/sanity/client";
import { EXPERIMENTAL_getGalleryBySlug } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin, CameraOff } from "lucide-react";
import GalleryLightbox from "./GalleryLightbox";
import { generateSEOMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const gallery = await client.fetch(EXPERIMENTAL_getGalleryBySlug, { slug });

  if (!gallery) return generateSEOMetadata();

  return generateSEOMetadata({
    title: `Gallery: ${gallery.title}`,
    description: `Dokumentasi acara ${gallery.title} yang diadakan pada ${new Date(gallery.date).toLocaleDateString("id-ID")}.`,
    image: gallery.coverImage
      ? urlForImage(gallery.coverImage).width(1200).height(630).url()
      : undefined,
    url: `/gallery/${slug}`,
    type: "article",
  });
}

export default async function GalleryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const gallery = await client.fetch(EXPERIMENTAL_getGalleryBySlug, { slug });

  if (!gallery) notFound();

  const sanityImages = gallery.images ?? [];
  const images = sanityImages.map(
    (
      img: any /* eslint-disable-line @typescript-eslint/no-explicit-any */,
    ) => ({
      url: urlForImage(img).width(1200).url(),
      alt: img.alt || gallery.title || "Gallery image",
      _key: img._key,
    }),
  );

  return (
    <main className='flex-1 flex flex-col items-center pb-24 pt-8 md:pt-12'>
      <div className='container-fluid w-full max-w-7xl'>
        <Link
          href='/gallery'
          className='inline-flex items-center gap-2 font-bold text-primary/70 hover:text-accent-orange transition-colors mb-8 group'
        >
          <ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
          Kembali ke Gallery
        </Link>

        <div className='bg-primary text-white border-4 border-primary rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_0px_#cf7650] mb-12 relative overflow-hidden'>
          <div className='absolute -right-10 -top-10 w-40 h-40 bg-accent-orange rounded-full blur-xl opacity-40 pointer-events-none' />
          <div className='relative z-10'>
            <div className='inline-block bg-accent-orange text-white font-display font-black px-4 py-1 rounded-xl border-2 border-white/30 mb-4 -rotate-1 text-sm uppercase tracking-wider'>
              Album Foto
            </div>
            <h1 className='font-display text-4xl md:text-6xl font-black mb-4'>
              {gallery.title}
            </h1>
            <div className='flex flex-wrap gap-4 text-white/80 font-bold text-sm'>
              {gallery.event?.date && (
                <span className='flex items-center gap-2'>
                  <CalendarDays className='w-4 h-4' />
                  {new Date(gallery.event.date).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
              {gallery.event?.title && (
                <span className='flex items-center gap-2'>
                  <MapPin className='w-4 h-4' />
                  {gallery.event.title}
                </span>
              )}
              <span className='bg-white/20 px-3 py-1 rounded-full'>
                {images.length} Foto
              </span>
            </div>
          </div>
        </div>

        {images.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-24 text-center'>
            <div className='bg-white border-4 border-primary rounded-3xl p-12 shadow-[8px_8px_0px_0px_#162836] max-w-sm'>
              <div className='w-20 h-20 bg-accent-peach/30 rounded-2xl border-4 border-primary flex items-center justify-center mx-auto mb-6 rotate-6'>
                <CameraOff className='w-10 h-10 text-primary' />
              </div>
              <h2 className='font-display font-black text-2xl text-primary mb-2'>
                FOTO BELUM ADA
              </h2>
              <p className='text-primary/70 font-bold'>
                Album ini masih kosong.
              </p>
            </div>
          </div>
        ) : (
          <GalleryLightbox images={images} />
        )}
      </div>
    </main>
  );
}
