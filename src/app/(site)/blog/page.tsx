import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { urlForImage } from "@/sanity/lib/image";
import {
  EXPERIMENTAL_getPostsPaginated,
  EXPERIMENTAL_getPostFilterOptions,
  EXPERIMENTAL_getTotalPosts,
} from "@/sanity/lib/queries";
import {
  generateSEOMetadata,
  generateBreadcrumbJsonLd,
  generateOrganizationJsonLd,
} from "@/lib/seo";
import type { BlogPostListItem } from "@/types/sanity";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Clock3,
} from "lucide-react";

export const revalidate = 60;

export const metadata = generateSEOMetadata({
  title: "Blog",
  description:
    "Kumpulan artikel MBGC: review board game, cerita komunitas, tips bermain, dan update terbaru.",
  url: "/blog",
});

const POSTS_PER_PAGE = 9;

type BlogSearchParams = {
  [key: string]: string | string[] | undefined;
};

type BlogFilterOptions = {
  contentTypes?: string[] | null;
  tags?: string[] | null;
};

function getSingleParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0]?.trim() || "";
  }
  return typeof value === "string" ? value.trim() : "";
}

function buildBlogUrl(params: {
  page?: number;
  contentType?: string;
  tag?: string;
}): string {
  const search = new URLSearchParams();

  if (params.contentType) {
    search.set("type", params.contentType);
  }

  if (params.tag) {
    search.set("tag", params.tag);
  }

  if (params.page && params.page > 1) {
    search.set("page", String(params.page));
  }

  const query = search.toString();
  return query ? `/blog?${query}` : "/blog";
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<BlogSearchParams>;
}) {
  const resolvedSearchParams = await searchParams;

  const activeContentType = getSingleParam(resolvedSearchParams.type);
  const activeTag = getSingleParam(resolvedSearchParams.tag);

  const page =
    typeof resolvedSearchParams.page === "string"
      ? Number.parseInt(resolvedSearchParams.page, 10)
      : 1;

  const currentPage = Number.isFinite(page) && page > 0 ? page : 1;
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const postQueryParams: Record<string, unknown> = {
    start,
    end,
    contentType: activeContentType || "",
    tag: activeTag || "",
  };

  const totalQueryParams: Record<string, unknown> = {
    contentType: activeContentType || "",
    tag: activeTag || "",
  };

  const [posts, totalPosts, filterOptions] = await Promise.all([
    client.fetch(EXPERIMENTAL_getPostsPaginated, postQueryParams),
    client.fetch(EXPERIMENTAL_getTotalPosts, totalQueryParams),
    client.fetch(EXPERIMENTAL_getPostFilterOptions),
  ]);

  const totalPages = Math.max(Math.ceil((totalPosts || 0) / POSTS_PER_PAGE), 1);
  const typedFilterOptions = (filterOptions || {}) as BlogFilterOptions;

  const contentTypes = [...(typedFilterOptions.contentTypes || [])]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "id-ID"));

  const tags = [...(typedFilterOptions.tags || [])]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "id-ID"));

  const hasActiveFilters = Boolean(activeContentType || activeTag);

  const breadcrumbSchema = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);
  const organizationSchema = generateOrganizationJsonLd();

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className='flex-1 flex flex-col items-center pb-24 pt-8 md:pt-12 relative'>
        <div className='absolute top-16 right-0 w-80 h-80 bg-accent-peach/20 rounded-full blur-3xl -z-10 animate-blob-bounce' />
        <div className='absolute bottom-10 left-[-5%] w-72 h-72 bg-accent-orange/15 rounded-full blur-3xl -z-10 animate-blob-bounce-delayed' />

        <div className='container-fluid w-full max-w-7xl'>
          <section className='bg-white border-4 border-primary rounded-3xl p-8 md:p-14 shadow-[8px_8px_0px_0px_#162836] mb-12 relative overflow-hidden'>
            <div className='absolute -right-16 -top-16 w-52 h-52 bg-accent-peach rounded-full blur-2xl opacity-30' />
            <div className='relative z-10'>
              <div className='inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-orange text-white border-2 border-primary shadow-[4px_4px_0px_0px_#162836] font-display font-black mb-6 uppercase tracking-wider text-sm'>
                <BookOpenText className='w-4 h-4' />
                MBGC Blog
              </div>
              <h1 className='font-display text-5xl md:text-7xl font-black text-primary leading-[0.92] tracking-tight'>
                CERITA, REVIEW,
                <br />
                DAN INSIGHT BOARD GAME
              </h1>
              <p className='mt-6 max-w-3xl text-xl text-primary/75 font-bold'>
                Dari review board game sampai catatan event dan tips komunitas,
                semuanya terkumpul dalam satu ruang baca.
              </p>
            </div>
          </section>

          <section className='bg-white border-4 border-primary rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_0px_#162836] mb-10'>
            <div className='flex flex-wrap items-center justify-between gap-4'>
              <h2 className='font-display text-2xl md:text-3xl font-black text-primary'>
                Filter Artikel
              </h2>
              {hasActiveFilters && (
                <Link
                  href='/blog'
                  className='inline-flex items-center px-4 py-2 rounded-xl border-2 border-primary bg-accent-peach/40 text-primary font-display font-black uppercase tracking-wider text-xs hover:bg-accent-peach/70 transition-colors'
                >
                  Reset Filter
                </Link>
              )}
            </div>

            <div className='mt-5'>
              <p className='text-sm font-bold uppercase tracking-wide text-primary/70 mb-3'>
                Kategori Konten
              </p>
              <div className='flex flex-wrap gap-2'>
                <Link
                  href={buildBlogUrl({ tag: activeTag })}
                  className={`inline-flex items-center rounded-xl border-2 px-3 py-2 text-xs font-display font-black uppercase tracking-wider transition-all ${
                    !activeContentType
                      ? "border-primary bg-primary text-white"
                      : "border-primary/30 bg-white text-primary hover:border-primary"
                  }`}
                >
                  Semua
                </Link>
                {contentTypes.map((contentType) => (
                  <Link
                    key={contentType}
                    href={buildBlogUrl({ contentType, tag: activeTag })}
                    className={`inline-flex items-center rounded-xl border-2 px-3 py-2 text-xs font-display font-black uppercase tracking-wider transition-all ${
                      activeContentType === contentType
                        ? "border-primary bg-primary text-white"
                        : "border-primary/30 bg-white text-primary hover:border-primary"
                    }`}
                  >
                    {contentType}
                  </Link>
                ))}
              </div>
            </div>

            <div className='mt-5'>
              <p className='text-sm font-bold uppercase tracking-wide text-primary/70 mb-3'>
                Tag
              </p>
              <div className='flex flex-wrap gap-2'>
                <Link
                  href={buildBlogUrl({ contentType: activeContentType })}
                  className={`inline-flex items-center rounded-full border-2 px-3 py-2 text-xs font-black uppercase tracking-wide transition-all ${
                    !activeTag
                      ? "border-primary bg-accent-orange text-white"
                      : "border-primary/20 bg-accent-peach/30 text-primary hover:border-primary"
                  }`}
                >
                  Semua Tag
                </Link>
                {tags.map((tagName) => (
                  <Link
                    key={tagName}
                    href={buildBlogUrl({
                      contentType: activeContentType,
                      tag: tagName,
                    })}
                    className={`inline-flex items-center rounded-full border-2 px-3 py-2 text-xs font-black uppercase tracking-wide transition-all ${
                      activeTag === tagName
                        ? "border-primary bg-accent-orange text-white"
                        : "border-primary/20 bg-accent-peach/30 text-primary hover:border-primary"
                    }`}
                  >
                    {tagName}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {posts.length > 0 ? (
            <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
              {posts.map((post: BlogPostListItem) => (
                <article
                  key={post._id}
                  className='bg-white border-4 border-primary rounded-3xl overflow-hidden shadow-[6px_6px_0px_0px_#162836] hover:-translate-y-1 hover:shadow-[9px_9px_0px_0px_#cf7650] transition-all'
                >
                  <Link href={`/blog/${post.slug || ""}`} className='block'>
                    <div className='relative aspect-16/10 bg-primary/10'>
                      {post.coverImage ? (
                        <Image
                          src={urlForImage(post.coverImage)
                            .width(900)
                            .height(600)
                            .url()}
                          alt={
                            post.coverImage.alt || post.title || "Blog cover"
                          }
                          width={900}
                          height={600}
                          className='w-full h-full object-cover'
                        />
                      ) : (
                        <div className='w-full h-full flex items-center justify-center text-primary/40'>
                          <BookOpenText className='w-16 h-16' />
                        </div>
                      )}
                    </div>

                    <div className='p-6'>
                      <span className='inline-flex items-center rounded-lg border-2 border-primary bg-primary/5 px-3 py-1 text-xs font-display font-black uppercase tracking-wider text-primary'>
                        {post.contentType || "artikel"}
                      </span>

                      <h2 className='mt-4 font-display text-3xl leading-[1.05] font-black text-primary'>
                        {post.title || "Artikel MBGC"}
                      </h2>

                      <p className='mt-3 text-primary/75 font-bold line-clamp-3 min-h-18'>
                        {post.excerpt || "Artikel komunitas MBGC."}
                      </p>

                      <div className='mt-6 pt-4 border-t-2 border-primary/15 border-dashed flex items-center justify-between text-sm font-bold text-primary/70'>
                        <span className='inline-flex items-center gap-1'>
                          <CalendarDays className='w-4 h-4 text-accent-orange' />
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                },
                              )
                            : "Segera"}
                        </span>
                        <span className='inline-flex items-center gap-1'>
                          <Clock3 className='w-4 h-4 text-accent-orange' />
                          {Math.max(post.readingTime || 1, 1)} min
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </section>
          ) : (
            <section className='bg-white border-4 border-primary rounded-3xl p-12 text-center shadow-[6px_6px_0px_0px_#162836]'>
              <p className='font-display text-3xl font-black text-primary'>
                Belum ada artikel
              </p>
              <p className='mt-2 text-primary/70 font-bold'>
                Konten blog pertama MBGC akan segera tayang.
              </p>
            </section>
          )}

          {totalPages > 1 && (
            <nav className='mt-12 flex items-center justify-center gap-4'>
              <Link
                href={buildBlogUrl({
                  page: currentPage - 1,
                  contentType: activeContentType,
                  tag: activeTag,
                })}
                aria-disabled={currentPage <= 1}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border-4 border-primary font-display font-black transition-all ${
                  currentPage <= 1
                    ? "pointer-events-none opacity-40 bg-white text-primary"
                    : "bg-white text-primary shadow-[4px_4px_0px_0px_#162836] hover:shadow-[2px_2px_0px_0px_#162836] hover:translate-x-0.5 hover:translate-y-0.5"
                }`}
              >
                <ArrowLeft className='w-4 h-4' />
                Prev
              </Link>

              <span className='px-5 py-3 rounded-xl bg-primary text-white border-4 border-primary font-display font-black shadow-[4px_4px_0px_0px_#cf7650]'>
                {currentPage} / {totalPages}
              </span>

              <Link
                href={buildBlogUrl({
                  page: currentPage + 1,
                  contentType: activeContentType,
                  tag: activeTag,
                })}
                aria-disabled={currentPage >= totalPages}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border-4 border-primary font-display font-black transition-all ${
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-40 bg-white text-primary"
                    : "bg-white text-primary shadow-[4px_4px_0px_0px_#162836] hover:shadow-[2px_2px_0px_0px_#162836] hover:translate-x-0.5 hover:translate-y-0.5"
                }`}
              >
                Next
                <ArrowRight className='w-4 h-4' />
              </Link>
            </nav>
          )}
        </div>
      </main>
    </>
  );
}
