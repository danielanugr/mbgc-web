import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock3, ArrowLeft, Tag } from "lucide-react";
import { client } from "@/sanity/client";
import { urlForImage } from "@/sanity/lib/image";
import { EXPERIMENTAL_getPostBySlug } from "@/sanity/lib/queries";
import { PortableTextRenderer } from "@/components/content/PortableTextRenderer";
import {
  generateArticleJsonLd,
  generateBreadcrumbJsonLd,
  generateSEOMetadata,
} from "@/lib/seo";
import type { BlogPostDetail } from "@/types/sanity";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch(EXPERIMENTAL_getPostBySlug, { slug });

  if (!post) {
    return generateSEOMetadata();
  }

  return generateSEOMetadata({
    title: post.title || "Blog",
    description: post.excerpt || "Artikel Mataram Board Game Community",
    image: post.coverImage
      ? urlForImage(post.coverImage).width(1200).height(630).url()
      : undefined,
    url: `/blog/${slug}`,
    type: "article",
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: BlogPostDetail | null = await client.fetch(
    EXPERIMENTAL_getPostBySlug,
    { slug },
  );

  if (!post) {
    notFound();
  }

  const articleSchema = generateArticleJsonLd({
    title: post.title || "Artikel MBGC",
    description: post.excerpt || "Artikel komunitas MBGC",
    url: `/blog/${slug}`,
    image: post.coverImage
      ? urlForImage(post.coverImage).width(1200).height(630).url()
      : undefined,
    datePublished: post.publishedAt || undefined,
    authorName: post.authorName || undefined,
  });

  const breadcrumbSchema = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title || "Artikel", url: `/blog/${slug}` },
  ]);

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className='flex-1 flex flex-col items-center pb-24 pt-8 md:pt-12'>
        <div className='container-fluid w-full max-w-5xl'>
          <Link
            href='/blog'
            className='inline-flex items-center gap-2 font-bold text-primary/70 hover:text-accent-orange transition-colors mb-8 group'
          >
            <ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
            Kembali ke Blog
          </Link>

          <article className='bg-white border-4 border-primary rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_#162836]'>
            <div className='relative aspect-16/8 bg-primary/10'>
              {post.coverImage ? (
                <Image
                  src={urlForImage(post.coverImage)
                    .width(1400)
                    .height(700)
                    .url()}
                  alt={post.coverImage.alt || post.title || "Cover"}
                  width={1400}
                  height={700}
                  priority
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='w-full h-full' />
              )}
            </div>

            <div className='p-7 md:p-12'>
              <span className='inline-flex items-center rounded-lg border-2 border-primary bg-primary/5 px-3 py-1 text-xs font-display font-black uppercase tracking-wider text-primary'>
                {post.contentType || "artikel"}
              </span>

              <h1 className='mt-4 font-display text-4xl md:text-6xl leading-[0.98] font-black text-primary'>
                {post.title}
              </h1>

              <p className='mt-6 text-lg md:text-xl text-primary/75 font-bold leading-relaxed'>
                {post.excerpt}
              </p>

              <div className='mt-7 flex flex-wrap gap-3 text-sm font-bold text-primary/75'>
                <span className='inline-flex items-center gap-2 bg-primary/5 border-2 border-primary/20 px-3 py-2 rounded-lg'>
                  <CalendarDays className='w-4 h-4 text-accent-orange' />
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "Tanggal belum tersedia"}
                </span>
                <span className='inline-flex items-center gap-2 bg-primary/5 border-2 border-primary/20 px-3 py-2 rounded-lg'>
                  <Clock3 className='w-4 h-4 text-accent-orange' />
                  {Math.max(post.readingTime || 1, 1)} menit baca
                </span>
                {post.authorName && (
                  <span className='inline-flex items-center gap-2 bg-primary/5 border-2 border-primary/20 px-3 py-2 rounded-lg'>
                    Oleh {post.authorName}
                  </span>
                )}
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className='mt-5 flex flex-wrap gap-2'>
                  {post.tags.map((tagName) => (
                    <span
                      key={tagName}
                      className='inline-flex items-center gap-1 border-2 border-primary/20 bg-accent-peach/30 text-primary text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide'
                    >
                      <Tag className='w-3 h-3' />
                      {tagName}
                    </span>
                  ))}
                </div>
              )}

              <div className='mt-10 pt-8 border-t-4 border-primary/10 border-dashed prose prose-lg max-w-none prose-headings:font-display prose-headings:font-black prose-headings:text-primary prose-p:text-primary/80 prose-p:font-medium prose-a:text-accent-orange prose-a:font-black prose-strong:text-primary prose-strong:font-black prose-li:text-primary/80'>
                {post.body ? (
                  <PortableTextRenderer value={post.body} />
                ) : (
                  <p>Konten artikel belum tersedia.</p>
                )}
              </div>
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
