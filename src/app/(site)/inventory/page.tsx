import { Search } from "lucide-react";
import Link from "next/link";
import { client } from "@/sanity/client";
import { EXPERIMENTAL_getAllBoardGames } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

// Placeholder untuk fallback saat image kosong
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1632501641765-e5e8d5a71019?q=80&w=400&auto=format&fit=crop";

export default async function InventoryPage() {
  // Ambil data langsung dari Sanity (Next.js 15 Server Component)
  const games = await client.fetch(EXPERIMENTAL_getAllBoardGames);

  return (
    <main className='flex-1 flex flex-col items-center pb-24'>
      {/* Navbar Mock */}
      <nav className='w-full flex items-center justify-between py-6 container-fluid mb-12'>
        <Link
          href='/'
          className='font-display font-bold text-2xl tracking-tighter text-primary'
        >
          MBGC<span className='text-accent-orange'>.</span>
        </Link>
        <div className='hidden md:flex gap-8 font-bold text-lg'>
          <Link
            href='/event'
            className='hover:text-accent-orange transition-colors'
          >
            Events
          </Link>
          <Link
            href='/gallery'
            className='hover:text-accent-orange transition-colors'
          >
            Gallery
          </Link>
          <Link
            href='/inventory'
            className='text-accent-orange transition-colors'
          >
            Games
          </Link>
          <Link
            href='/about'
            className='hover:text-accent-orange transition-colors'
          >
            About Us
          </Link>
        </div>
      </nav>

      <div className='container-fluid w-full'>
        <h1 className='font-display text-6xl md:text-8xl font-black text-primary mb-6'>
          BOARD <span className='text-accent-peach stroke-text'>GAMES</span>
        </h1>
        <p className='text-xl md:text-2xl font-bold text-primary/70 mb-12 max-w-2xl'>
          Koleksi board game yang bisa kamu mainkan pas playday. Dari party game
          sampai euro game berat!
        </p>

        {/* Search Bar - Playful Input */}
        <div className='relative max-w-xl mb-16'>
          <div className='absolute inset-y-0 left-4 flex items-center pointer-events-none'>
            <Search className='text-primary/50' size={24} />
          </div>
          <input
            type='text'
            placeholder='Cari game favoritmu...'
            className='w-full bg-white border-playful rounded-2xl py-4 pl-12 pr-4 font-bold text-lg text-primary outline-none shadow-playful focus:shadow-[6px_6px_0px_0px_#cf7650] focus:-translate-y-1 transition-all placeholder:text-primary/30'
          />
        </div>

        {/* Inventory Grid */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {games.length === 0 ? (
            <div className='col-span-full py-20 text-center font-bold text-xl text-primary/50'>
              Oops, belum ada game di lemarinya nih 😢
            </div>
          ) : (
            games.map((game) => (
              <div
                key={game._id}
                className='bg-white border-playful rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_#162836] hover:shadow-[8px_8px_0px_0px_#cf7650] hover:-translate-y-2 transition-all flex flex-col group'
              >
                <div className='relative aspect-square border-b-3 border-primary overflow-hidden bg-primary/5'>
                  <img
                    src={
                      game.coverImage
                        ? urlForImage(game.coverImage)?.url()
                        : game.imageUrl || FALLBACK_IMAGE
                    }
                    alt={game.name || "Board Game"}
                    className='object-cover w-full h-full group-hover:scale-110 transition-transform duration-500'
                  />
                  {game.bggRating && (
                    <div className='absolute top-3 right-3 bg-accent-orange text-white font-bold font-display px-3 py-1 rounded-xl border-2 border-primary shadow-[2px_2px_0px_0px_#162836]'>
                      {game.bggRating.toFixed(1)} ★
                    </div>
                  )}
                </div>
                <div className='p-4 flex-1 flex flex-col justify-between'>
                  <div>
                    <h3 className='font-display font-bold text-xl md:text-2xl text-primary leading-tight mb-1'>
                      {game.name}
                    </h3>
                    {game.publisher && (
                      <p className='text-primary/60 font-bold text-sm'>
                        {game.publisher}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
