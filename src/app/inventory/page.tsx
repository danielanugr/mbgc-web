import { Search } from "lucide-react";
import Link from "next/link";

const MOCK_GAMES = [
  {
    id: 1,
    name: "Catan",
    publisher: "Kosmos",
    rating: 7.1,
    img: "https://images.unsplash.com/photo-1632501641765-e5e8d5a71019?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Ticket to Ride",
    publisher: "Days of Wonder",
    rating: 7.4,
    img: "https://images.unsplash.com/photo-1611891487122-2075b9e7fd18?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Splendor",
    publisher: "Space Cowboys",
    rating: 7.4,
    img: "https://images.unsplash.com/photo-1632501641765-e5e8d5a71019?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Wingspan",
    publisher: "Space Cowboys",
    rating: 8.1,
    img: "https://images.unsplash.com/photo-1611891487122-2075b9e7fd18?q=80&w=400&auto=format&fit=crop",
  },
];

export default function InventoryPage() {
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
          {MOCK_GAMES.map((game) => (
            <div
              key={game.id}
              className='bg-white border-playful rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_#162836] hover:shadow-[8px_8px_0px_0px_#cf7650] hover:-translate-y-2 transition-all flex flex-col group'
            >
              <div className='relative aspect-square border-b-3 border-primary overflow-hidden bg-primary/5'>
                <img
                  src={game.img}
                  alt={game.name}
                  className='object-cover w-full h-full group-hover:scale-110 transition-transform duration-500'
                />
                <div className='absolute top-3 right-3 bg-accent-orange text-white font-bold font-display px-3 py-1 rounded-xl border-2 border-primary shadow-[2px_2px_0px_0px_#162836]'>
                  {game.rating} ★
                </div>
              </div>
              <div className='p-4 flex-1 flex flex-col justify-between'>
                <div>
                  <h3 className='font-display font-bold text-2xl text-primary leading-tight mb-1'>
                    {game.name}
                  </h3>
                  <p className='text-primary/60 font-bold text-sm'>
                    {game.publisher}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
