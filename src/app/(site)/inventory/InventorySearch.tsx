"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { useDebounce } from "use-debounce";

export function InventorySearch({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery] = useDebounce(query, 500);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // skip initial render if it hasn't changed
    if (debouncedQuery === initialQuery) return;
    
    startTransition(() => {
      if (debouncedQuery) {
        router.push(`/inventory?q=${encodeURIComponent(debouncedQuery)}`, { scroll: false });
      } else {
        router.push(`/inventory`, { scroll: false });
      }
    });
  }, [debouncedQuery, router, initialQuery]);

  const handleManualSearch = () => {
    startTransition(() => {
      if (query) {
        router.push(`/inventory?q=${encodeURIComponent(query)}`, { scroll: false });
      } else {
        router.push(`/inventory`, { scroll: false });
      }
    });
  };

  return (
    <div className='relative w-full max-w-3xl mx-auto mb-16 group'>
      <div className='absolute -inset-2 bg-gradient-to-r from-accent-orange to-accent-peach rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity'></div>
      <div className={`relative flex overflow-hidden bg-white border-4 border-primary rounded-2xl shadow-[6px_6px_0px_0px_#162836] focus-within:shadow-[6px_6px_0px_0px_#cf7650] focus-within:-translate-y-1 transition-all h-20 ${(isPending || query !== debouncedQuery) ? "opacity-70" : ""}`}>
        <div className='pl-6 text-primary flex items-center justify-center'>
          <Search size={28} className={(isPending || query !== debouncedQuery) ? "animate-pulse" : ""} />
        </div>
        <input
          type='text'
          placeholder='Cari game (coba "catan" atau "monopoly")...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleManualSearch();
          }}
          className='w-full py-5 pl-4 pr-6 font-display font-bold text-xl text-primary outline-none placeholder:text-primary/30 bg-transparent'
        />
        <button 
          onClick={handleManualSearch}
          className='hidden md:flex items-center justify-center px-10 h-full bg-primary text-white font-display font-bold text-xl hover:bg-accent-orange transition-colors'
        >
          CARI
        </button>
      </div>
    </div>
  );
}
