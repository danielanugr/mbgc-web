import { Dices } from "lucide-react";
import { InventorySearch } from "./InventorySearch";
import { client } from "@/sanity/client";
import {
  EXPERIMENTAL_getBoardGamesPaginated,
  EXPERIMENTAL_getTotalBoardGames,
} from "@/sanity/lib/queries";
import { GameGrid } from "./GameGrid";

export const revalidate = 60;

const ITEMS_PER_PAGE = 12;

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const q = params.q || "";

  // Fetch first page and total concurrently
  const [initialGames, totalGames] = await Promise.all([
    client.fetch(EXPERIMENTAL_getBoardGamesPaginated, {
      start: 0,
      end: ITEMS_PER_PAGE,
      searchQuery: q,
    }),
    client.fetch(EXPERIMENTAL_getTotalBoardGames, {
      searchQuery: q,
    }),
  ]);

  return (
    <main className='flex-1 flex flex-col items-center pb-24 pt-8 md:pt-12 relative'>
      <div className='absolute top-20 right-0 w-72 h-72 bg-accent-peach/20 rounded-full blur-3xl -z-10 animate-blob-bounce'></div>

      <div className='container-fluid w-full max-w-7xl'>
        <section className='bg-white border-4 border-primary rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_0px_#162836] relative overflow-hidden mb-16'>
          <div className='absolute -right-20 -bottom-20 w-64 h-64 bg-accent-orange/10 rounded-full blur-2xl'></div>
          <div className='absolute top-10 left-10 w-4 h-4 bg-accent-peach rounded-full animate-pulse'></div>
          <div
            className='absolute bottom-10 right-1/4 w-6 h-6 bg-primary rounded-full animate-pulse'
            style={{ animationDelay: "1s" }}
          ></div>

          <div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-8'>
            <div className='text-center md:text-left flex-1'>
              <div className='inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-peach/30 border-2 border-primary text-primary font-bold font-display mb-6 shadow-[2px_2px_0px_0px_#162836]'>
                <Dices className='w-5 h-5 text-accent-orange' />
                <span>Gudang Mainan Kami</span>
              </div>
              <h1 className='font-display text-5xl md:text-7xl lg:text-8xl font-black text-primary leading-[0.9] tracking-tight mb-6 uppercase'>
                BOARD <br className='hidden md:block' />
                <span className='inline-block transform -rotate-3 bg-accent-peach text-primary border-4 border-primary shadow-[6px_6px_0px_0px_#162836] px-6 py-2 mt-4 relative z-10'>
                  GAMES
                </span>
              </h1>
              <p className='text-xl md:text-2xl font-bold text-primary/80 max-w-xl'>
                Eksplorasi koleksi board game yang tersedia di lemari MBGC. Dari
                game party buat ketawa sampai euro game buat mikir keras!
              </p>
            </div>

            <div className='hidden md:flex flex-col items-center justify-center p-8 bg-accent-orange text-white rounded-3xl border-playful shadow-[6px_6px_0px_0px_#162836] transform rotate-3 hover:rotate-0 transition-transform'>
              <span className='font-display font-black text-7xl'>
                {totalGames}
              </span>
              <span className='font-bold text-xl uppercase tracking-wider mt-2 border-t-2 border-white/30 pt-2'>
                Games
              </span>
            </div>
          </div>
        </section>

        <InventorySearch initialQuery={q} />

        {/* GAMES GRID INFINITE SCROLL */}
        <GameGrid
          initialGames={initialGames || []}
          totalGames={totalGames || 0}
          searchQuery={q}
        />
      </div>
    </main>
  );
}
