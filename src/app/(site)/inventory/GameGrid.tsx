"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Dices, Users, Clock, Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { fetchGames } from "./actions";
import { urlForImage } from "@/sanity/lib/image";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1632501641765-e5e8d5a71019?q=80&w=400&auto=format&fit=crop";

interface GameGridProps {
  initialGames: any[]; // eslint-disable-line
  totalGames: number;
  searchQuery?: string;
}

const ITEMS_PER_PAGE = 12;

export function GameGrid({
  initialGames,
  totalGames,
  searchQuery = "",
}: GameGridProps) {
  const [games, setGames] = useState(initialGames);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialGames.length < totalGames);

  // Sync state when search query changes (from server props)
  useEffect(() => {
    setGames(initialGames);
    setPage(1);
    setHasMore(initialGames.length < totalGames);
  }, [initialGames, totalGames, searchQuery]);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "400px",
  });

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMoreGames();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasMore, loading]);

  const loadMoreGames = async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const nextGames = await fetchGames(nextPage, ITEMS_PER_PAGE, searchQuery);

      if (nextGames?.length > 0) {
        setGames((prev) => [...prev, ...nextGames]);
        setPage(nextPage);
        if (games.length + nextGames.length >= totalGames) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch more games:", error);
    } finally {
      setLoading(false);
    }
  };

  if (games.length === 0) {
    return (
      <div className='w-full bg-white border-playful rounded-3xl p-20 flex flex-col items-center justify-center text-center shadow-playful'>
        <div className='w-32 h-32 bg-primary/5 rounded-full flex items-center justify-center mb-6'>
          <Dices className='w-16 h-16 text-primary/30' />
        </div>
        <h2 className='font-display font-black text-3xl text-primary mb-4'>
          {searchQuery ? "Gamenya Nggak Ketemu!" : "Lemari Masih Kosong!"}
        </h2>
        <p className='text-xl text-primary/60 font-medium max-w-md'>
          {searchQuery
            ? `Waduh, game "${searchQuery}" belum ada di lemari kita nih. Coba cari game lain ya! 😢`
            : "Belum ada game yang masuk ke database kami. Coba cek lagi nanti ya 😢"}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12'>
        {games.map((game: any /* eslint-disable-line */, index: number) => (
          <div
            key={`${game._id}-${index}`}
            className='bg-white border-playful rounded-2xl flex flex-col group hover:-translate-y-3 transition-all duration-300 relative h-full'
            style={{ boxShadow: "6px 6px 0px 0px #162836" }}
          >
            {typeof game.bggRating === "number" && game.bggRating > 0 && (
              <div className='absolute -top-4 -right-4 z-10 bg-accent-orange text-white font-black font-display text-lg px-4 py-2 rounded-xl border-playful shadow-[2px_2px_0px_0px_#162836] transform rotate-6 group-hover:rotate-12 transition-transform flex items-center gap-1'>
                ★ {game.bggRating.toFixed(1)}
              </div>
            )}

            <div className='relative w-full aspect-square border-b-[3px] border-primary overflow-hidden rounded-t-[14px] bg-primary/5 box-border'>
              <Image
                src={
                  game.coverImage
                    ? urlForImage(game.coverImage)?.url()
                    : game.imageUrl || FALLBACK_IMAGE
                }
                alt={game.name || "Board Game"}
                fill
                loading={index < 8 ? "eager" : "lazy"}
                priority={index < 8}
                className='object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out'
                sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
              />
              <div className='absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300'></div>
            </div>

            <div className='p-6 flex-1 flex flex-col justify-between bg-white rounded-b-[14px]'>
              <div>
                <h3 className='font-display font-black text-2xl text-primary leading-tight mb-2 group-hover:text-accent-orange transition-colors'>
                  {game.name}
                </h3>
                <p className='text-primary/70 font-bold text-sm tracking-wide uppercase'>
                  {game.publisher || "Unknown Publisher"}
                </p>
              </div>

              <div className='mt-6 pt-4 border-t-2 border-primary/10 flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity'>
                <span className='bg-primary/5 px-2 py-1 rounded-md text-xs font-bold text-primary flex items-center gap-1'>
                  <Users size={14} /> 2-4
                </span>
                <span className='bg-primary/5 px-2 py-1 rounded-md text-xs font-bold text-primary flex items-center gap-1'>
                  <Clock size={14} /> 45m
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div
          ref={ref}
          className='w-full py-12 flex flex-col justify-center items-center gap-4 mt-8'
        >
          {loading && (
            <>
              <Loader2 className='w-10 h-10 text-accent-orange animate-spin' />
              <p className='font-display font-bold text-primary animate-pulse'>
                Mencari tumpukan game lagi...
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
}
