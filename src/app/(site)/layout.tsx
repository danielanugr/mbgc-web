import type { Metadata } from "next";
import { Fredoka, Quicksand } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { generateSEOMetadata } from "@/lib/seo";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = generateSEOMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='id' suppressHydrationWarning>
      <body
        className={`${fredoka.variable} ${quicksand.variable} antialiased min-h-screen flex flex-col font-body bg-background text-foreground selection:bg-accent-1 selection:text-white`}
        suppressHydrationWarning
      >
        <div className='relative flex min-h-screen flex-col overflow-clip'>
          <div
            className="pointer-events-none fixed inset-0 z-50 h-[200vh] w-[200vw] -translate-x-1/2 -translate-y-1/2 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply"
            suppressHydrationWarning
          ></div>
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
