"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Games", path: "/inventory" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <>
      <div className='w-full sticky top-4 md:top-6 z-50 px-4 md:px-8 flex justify-center pointer-events-none transition-all'>
        <nav className='pointer-events-auto w-full max-w-7xl flex items-center justify-between py-3 px-6 bg-background border-4 border-primary rounded-3xl shadow-[6px_6px_0px_0px_#162836]'>
          <Link href='/' className='flex items-center gap-2 group'>
            <div className='relative w-12 h-12 md:w-16 md:h-16 transition-transform group-hover:scale-110 group-hover:rotate-[-5deg] duration-300'>
              <Image
                src='/logo_orange_peach.png'
                alt='MBGC Logo'
                fill
                sizes='(max-width: 768px) 48px, 64px'
                className='object-contain'
                priority
              />
            </div>
            <span className='font-display font-black text-2xl tracking-tighter text-primary hidden sm:block group-hover:text-accent-orange transition-colors'>
              MBGC<span className='text-accent-orange'>.</span>
            </span>
          </Link>

          {/* Desktop nav links */}
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

          {/* Desktop Join Us CTA */}
          <a
            href='https://bit.ly/MBGCgroup'
            target='_blank'
            rel='noreferrer'
            className='bg-primary text-white font-bold font-display px-6 py-2 rounded-xl shadow-playful hover:shadow-playful-hover transition-all active:translate-y-1 active:shadow-none hidden md:inline-block border-2 border-primary'
          >
            Join Us!
          </a>

          {/* Mobile hamburger button */}
          <button
            type='button'
            className='md:hidden p-2 text-primary border-[3px] border-primary rounded-xl bg-background shadow-[3px_3px_0px_0px_#162836] hover:bg-accent-peach active:translate-y-0.5 active:shadow-none transition-all'
            onClick={() => setMobileOpen(true)}
            aria-label='Open navigation menu'
            aria-expanded={mobileOpen}
          >
            <Menu className='w-6 h-6' />
          </button>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className='fixed inset-0 z-50 md:hidden'
          role='dialog'
          aria-modal='true'
          aria-label='Navigation menu'
        >
          {/* Backdrop */}
          <div
            className='absolute inset-0 bg-primary/60 backdrop-blur-sm'
            onClick={() => setMobileOpen(false)}
            aria-hidden='true'
          />

          {/* Slide-in drawer */}
          <div className='absolute top-0 right-0 h-full w-72 bg-background border-l-4 border-primary flex flex-col p-8 gap-6 shadow-[-8px_0px_0px_0px_#162836]'>
            <div className='flex items-center justify-between'>
              <span className='font-display font-black text-2xl tracking-tight text-primary'>
                MENU
              </span>
              <button
                type='button'
                onClick={() => setMobileOpen(false)}
                className='p-2 text-primary border-[3px] border-primary rounded-xl bg-accent-peach shadow-[3px_3px_0px_0px_#162836] hover:bg-accent-orange active:shadow-none active:translate-y-0.5 transition-all'
                aria-label='Close navigation menu'
              >
                <X className='w-5 h-5' />
              </button>
            </div>

            <nav className='flex flex-col gap-1'>
              {navLinks.map((link) => {
                const isActive = pathname?.startsWith(link.path);
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`font-display font-bold text-2xl py-3 border-b-4 border-primary/20 transition-colors ${
                      isActive
                        ? "text-accent-orange border-accent-orange"
                        : "text-primary hover:text-accent-orange hover:border-accent-orange/40"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <a
              href='https://bit.ly/MBGCgroup'
              target='_blank'
              rel='noreferrer'
              onClick={() => setMobileOpen(false)}
              className='mt-auto bg-primary text-white font-display font-black text-xl px-6 py-4 rounded-2xl border-4 border-primary shadow-[6px_6px_0px_0px_#cf7650] hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_0px_#cf7650] active:translate-y-1 active:shadow-none transition-all text-center'
            >
              Join Us! 🎲
            </a>
          </div>
        </div>
      )}
    </>
  );
}
