import type { Metadata } from "next";
import { Fredoka, Quicksand } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mataram Board Game Community",
  description: "Pusat informasi kegiatan playday, gallery, dan review Mataram Board Game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${fredoka.variable} ${quicksand.variable} antialiased min-h-screen flex flex-col font-body bg-background text-foreground selection:bg-accent-1 selection:text-white`}
      >
        <div className="relative flex min-h-screen flex-col overflow-hidden">
          {/* Subtle playful grain/noise overlay */}
          <div className="pointer-events-none fixed inset-0 z-50 h-[200vh] w-[200vw] -translate-x-1/2 -translate-y-1/2 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply"></div>
          {children}
        </div>
      </body>
    </html>
  );
}
