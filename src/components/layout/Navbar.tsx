"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Games", path: "/inventory" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <nav className='w-full flex items-center justify-between py-6 container-fluid relative z-10'>
      <Link
        href='/'
        className='font-display font-black text-3xl tracking-tighter text-primary'
      >
        MBGC<span className='text-accent-orange'>.</span>
      </Link>
      <div className='hidden md:flex gap-8 font-bold text-lg font-display'>
        {navLinks.map((link) => {
          const isActive = pathname?.startsWith(link.path);
          return (
            <Link
              key={link.name}
              href={link.path}
              className={`transition-colors hover:text-accent-orange ${
                isActive ? "text-accent-orange" : "text-primary"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      <button className='bg-primary text-white font-bold font-display px-6 py-2 rounded-xl shadow-playful hover:shadow-playful-hover transition-all active:translate-y-1 active:shadow-none hidden md:block border-2 border-primary'>
        Join Us!
      </button>
    </nav>
  );
}
