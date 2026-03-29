"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className='flex-1 flex flex-col items-center justify-center pb-24 pt-8 px-4'>
      <div className='w-full max-w-2xl'>
        <div
          className='bg-accent-peach border-4 border-primary rounded-3xl p-12 -mb-6 transform rotate-2'
          style={{ boxShadow: "8px 8px 0px 0px #162836" }}
        />

        <div
          className='relative bg-white border-4 border-primary rounded-3xl p-10 md:p-16 text-center'
          style={{ boxShadow: "8px 8px 0px 0px #162836" }}
        >
          <div className='absolute -top-8 left-1/2 -translate-x-1/2 z-10'>
            <div
              className='bg-accent-orange border-4 border-primary rounded-2xl p-4'
              style={{ boxShadow: "4px 4px 0px 0px #162836" }}
            >
              <AlertTriangle className='w-10 h-10 text-white' strokeWidth={3} />
            </div>
          </div>

          <div className='mt-6'>
            <h1 className='font-display font-black text-5xl md:text-6xl text-primary uppercase leading-tight mb-4'>
              Aduh,{" "}
              <span className='relative inline-block'>
                Error!
                <span className='absolute -bottom-2 left-0 w-full h-3 bg-accent-orange/40 -z-10 transform -rotate-1' />
              </span>
            </h1>

            <p className='font-bold text-xl text-primary/70 mb-8 max-w-md mx-auto'>
              Ada sesuatu yang salah di balik layar. Coba refresh halaman atau
              kembali ke beranda.
            </p>

            {error.message && (
              <div className='bg-primary/5 border-2 border-primary/20 border-dashed rounded-2xl px-6 py-4 mb-8 text-left'>
                <p className='font-mono text-sm text-primary/50 break-words'>
                  {error.message}
                </p>
              </div>
            )}

            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <button
                type='button'
                onClick={reset}
                className='flex items-center gap-3 px-8 py-4 bg-primary text-white font-display font-black text-xl rounded-2xl border-4 border-primary hover:translate-y-1 hover:translate-x-1 transition-transform'
                style={{ boxShadow: "6px 6px 0px 0px #dba58a" }}
              >
                <RefreshCw className='w-5 h-5' />
                COBA LAGI
              </button>

              <Link
                href='/'
                className='flex items-center gap-3 px-8 py-4 bg-white text-primary font-display font-bold text-xl rounded-2xl border-4 border-primary hover:translate-y-1 hover:translate-x-1 transition-transform'
                style={{ boxShadow: "6px 6px 0px 0px #162836" }}
              >
                <ArrowLeft className='w-5 h-5' />
                KE BERANDA
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
