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
        <section className='bg-primary border-4 border-primary rounded-3xl p-8 md:p-16 shadow-[8px_8px_0px_0px_#162836] relative overflow-hidden mb-16 text-white'>
          <div className='absolute -right-20 -bottom-20 w-64 h-64 bg-accent-orange rounded-full blur-2xl opacity-30'></div>
          <div className='absolute top-10 left-10 w-48 h-48 bg-accent-peach rounded-full blur-xl opacity-20'></div>

          <div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left flex-1'>
            <div className='flex-1'>
              <div className='inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-peach border-2 border-primary text-primary font-bold font-display mb-6 shadow-[4px_4px_0px_0px_#162836] rotate-[-2deg]'>
                <Dices className='w-5 h-5 text-primary' />
                <span className='uppercase tracking-wide'>
                  Gudang Mainan Kami
                </span>
              </div>
              <h1 className='font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-6 uppercase drop-shadow-sm'>
                BOARD
                <br />
                <span className='inline-block transform rotate-1 bg-accent-orange text-white border-4 border-primary shadow-[4px_4px_0px_0px_#162836] px-6 py-2 mt-4 relative z-10'>
                  GAMES
                </span>
              </h1>
              <p className='text-xl md:text-2xl font-bold text-white/90 max-w-xl mx-auto md:mx-0 leading-relaxed mt-8'>
                Eksplorasi koleksi board game yang tersedia di lemari MBGC. Dari
                game party buat ketawa sampai euro game buat mikir keras!
              </p>
            </div>

            <div className='hidden md:flex relative shrink-0 pointer-events-none'>
              <div className='absolute inset-0 bg-accent-peach border-4 border-primary rounded-3xl transform rotate-6 translate-x-4 translate-y-4' />
              <div className='relative flex flex-col items-center justify-center p-8 bg-white text-primary rounded-3xl border-4 border-primary shadow-[6px_6px_0px_0px_#162836] transform -rotate-3 hover:rotate-0 transition-transform min-w-56 h-56'>
                <span className='font-display font-black text-7xl text-accent-orange'>
                  {totalGames}
                </span>
                <span className='font-bold text-xl uppercase tracking-wider mt-2 border-t-4 border-primary/10 pt-2 text-center w-full'>
                  Games
                </span>
              </div>
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
