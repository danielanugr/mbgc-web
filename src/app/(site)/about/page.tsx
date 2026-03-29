import { client } from "@/sanity/client";
import { EXPERIMENTAL_getAbout } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import {
  Instagram,
  MessageCircle,
  Users,
  Target,
  Lightbulb,
  Heart,
  Dices,
  CalendarDays,
  MapPin,
} from "lucide-react";

import { generateSEOMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata = generateSEOMetadata({
  title: "Tentang",
  description:
    "Kenali komunitas board game pertama di Kota Mataram. Berdiri sejak Mei 2024, kami hadir untuk mengumpulkan para pecinta board game di Mataram.",
  url: "/about",
});

const COMMUNITY_STATS = [
  { label: "Berdiri", value: "Mei 2024", icon: CalendarDays },
  { label: "Kota", value: "Mataram, NTB", icon: MapPin },
  { label: "Koleksi Game", value: "35+", icon: Dices },
  { label: "Playday", value: "Rutin", icon: CalendarDays },
];

const VALUES = [
  {
    icon: Heart,
    title: "Inklusif",
    desc: "Terbuka untuk semua – dari pemain kasual sampai hardcore gamer. Yang penting senang bareng!",
    rotate: "rotate-[-2deg]",
    bg: "bg-accent-peach/20",
  },
  {
    icon: Users,
    title: "Komunitas",
    desc: "Lebih dari sekedar main game. Kami membangun pertemanan dan koneksi yang tulus.",
    rotate: "rotate-[1deg]",
    bg: "bg-accent-orange/10",
  },
  {
    icon: Lightbulb,
    title: "Edukatif",
    desc: "Board game melatih strategi, komunikasi, dan kreativitas. Belajar sambil bermain!",
    rotate: "rotate-[-1deg]",
    bg: "bg-primary/5",
  },
  {
    icon: Target,
    title: "Local First",
    desc: "Bangga jadi komunitas board game pertama di Mataram. Representasi NTB di peta board gaming Indonesia.",
    rotate: "rotate-[2deg]",
    bg: "bg-accent-peach/30",
  },
];

export default async function AboutPage() {
  const about = await client.fetch(EXPERIMENTAL_getAbout);

  return (
    <main className='flex-1 flex flex-col items-center pb-24 pt-8 md:pt-12 relative overflow-hidden'>
      <div className='absolute top-10 right-0 w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl -z-10 animate-blob-bounce pointer-events-none' />
      <div className='absolute top-96 left-[-5%] w-80 h-80 bg-accent-peach/20 rounded-full blur-3xl -z-10 animate-blob-bounce-delayed pointer-events-none' />

      <div className='container-fluid w-full max-w-7xl'>
        <section className='bg-white border-4 border-primary rounded-3xl p-8 md:p-16 shadow-[8px_8px_0px_0px_#162836] relative overflow-hidden mb-20 text-primary'>
          <div className='absolute -right-12 -top-12 w-48 h-48 bg-accent-orange rounded-full blur-xl opacity-20 pointer-events-none' />
          <div className='absolute -left-12 -bottom-12 w-48 h-48 bg-accent-peach rounded-full blur-xl opacity-20 pointer-events-none' />

          <div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left flex-1'>
            <div className='flex-1'>
              <div className='inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-orange border-2 border-primary text-white font-bold font-display mb-6 shadow-[4px_4px_0px_0px_#162836] -rotate-2'>
                <Target className='w-5 h-5' />
                <span className='uppercase tracking-wide'>
                  Mataram Board Game Community
                </span>
              </div>

              <h1 className='font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-6 uppercase drop-shadow-sm'>
                ROLL BERSAMA,
                <br />
                <span className='inline-block transform rotate-1 bg-accent-peach text-primary px-6 py-2 mt-4 border-4 border-primary shadow-[4px_4px_0px_0px_#162836]'>
                  TUMBUH BERSAMA
                </span>
              </h1>

              <p className='text-xl md:text-2xl font-bold text-primary/80 max-w-2xl mx-auto md:mx-0 leading-relaxed'>
                Komunitas pecinta board game pertama di Kota Mataram yang
                berdiri sejak{" "}
                <span className='text-accent-orange font-black'>Mei 2024</span>.
                Terbuka untuk semua, dari pemain kasual sampai hardcore gamer.
              </p>
            </div>
          </div>
        </section>

        <section className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-20'>
          {COMMUNITY_STATS.map(({ label, value, icon: Icon }, i) => {
            const isAlt = i % 2 === 1;
            return (
              <div
                key={label}
                className={`border-4 border-primary rounded-2xl p-5 text-center shadow-[5px_5px_0px_0px_#162836] ${
                  isAlt ? "bg-primary text-white" : "bg-white text-primary"
                }`}
              >
                <Icon
                  className={`w-7 h-7 mx-auto mb-2 ${isAlt ? "text-accent-peach" : "text-accent-orange"}`}
                />
                <div
                  className={`font-display font-black text-2xl ${isAlt ? "text-white" : "text-primary"}`}
                >
                  {value}
                </div>
                <div
                  className={`font-bold text-xs uppercase tracking-wider mt-1 ${isAlt ? "text-white/70" : "text-primary/60"}`}
                >
                  {label}
                </div>
              </div>
            );
          })}
        </section>

        <section className='mb-20'>
          <div className='flex items-center gap-4 mb-8'>
            <div className='h-1 bg-primary flex-1 rounded-full' />
            <h2 className='font-display text-3xl md:text-4xl font-black text-primary uppercase whitespace-nowrap'>
              Kisah Kami
            </h2>
            <div className='h-1 bg-accent-orange flex-1 rounded-full' />
          </div>

          {about?.content ? (
            <div className='bg-white border-4 border-primary rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_0px_#162836] prose prose-lg max-w-none prose-headings:font-display prose-headings:font-black prose-headings:text-primary prose-p:text-primary/80 prose-p:font-medium prose-strong:text-primary prose-strong:font-black'>
              <PortableText value={about.content} />
            </div>
          ) : (
            <div className='bg-white border-4 border-primary rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_0px_#162836] space-y-6'>
              <p className='text-xl font-bold text-primary/80 leading-relaxed'>
                Berawal dari sekelompok teman yang sering kumpul main board game
                di Kota Mataram, komunitas ini lahir dari keinginan sederhana:
                punya tempat dan waktu rutin untuk main bareng.
              </p>
              <p className='text-xl font-bold text-primary/80 leading-relaxed'>
                Sejak Mei 2024, kami rutin mengadakan <strong>Playday</strong> —
                sesi kumpul santai yang terbuka untuk siapa saja, dari pemula
                sampai veteran board gaming. Tidak perlu punya game, tidak perlu
                jago strategi. Cukup datang, duduk, dan siap seru-seruan!
              </p>
              <p className='text-xl font-bold text-primary/80 leading-relaxed'>
                Koleksi kami terus bertambah, komunitas terus berkembang, dan
                kami bangga menjadi bagian dari peta board gaming di Indonesia.
              </p>
            </div>
          )}
        </section>

        <section className='mb-20'>
          <div className='flex items-center gap-4 mb-8'>
            <div className='h-1 bg-accent-orange flex-1 rounded-full' />
            <h2 className='font-display text-3xl md:text-4xl font-black text-primary uppercase whitespace-nowrap'>
              Nilai Kami
            </h2>
            <div className='h-1 bg-primary flex-1 rounded-full' />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            {VALUES.map(({ icon: Icon, title, desc, rotate, bg }) => (
              <div
                key={title}
                className={`${bg} border-4 border-primary rounded-3xl p-8 shadow-[6px_6px_0px_0px_#162836] hover:shadow-[10px_10px_0px_0px_#cf7650] transition-all duration-300 ${rotate} hover:rotate-0`}
              >
                <div className='w-14 h-14 bg-primary rounded-2xl border-4 border-primary flex items-center justify-center mb-4 rotate-6'>
                  <Icon className='w-7 h-7 text-white' />
                </div>
                <h3 className='font-display font-black text-2xl text-primary mb-2 uppercase'>
                  {title}
                </h3>
                <p className='text-primary/70 font-bold leading-relaxed'>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className='bg-primary text-white border-4 border-primary rounded-3xl p-8 md:p-16 shadow-[8px_8px_0px_0px_#cf7650] relative overflow-hidden text-center'>
            <div className='absolute -right-12 -top-12 w-40 h-40 bg-accent-orange rounded-full blur-xl opacity-40 pointer-events-none' />
            <div className='absolute -left-12 -bottom-12 w-48 h-48 bg-accent-peach rounded-full blur-xl opacity-20 pointer-events-none' />

            <div className='relative z-10'>
              <div className='inline-block bg-accent-orange text-white font-display font-black px-6 py-2 rounded-xl border-2 border-white/30 mb-6 rotate-1 text-sm uppercase tracking-widest'>
                Yuk Bergabung!
              </div>
              <h2 className='font-display text-4xl md:text-6xl font-black mb-6 uppercase leading-tight'>
                SIAP MAIN
                <br />
                BARENG?
              </h2>
              <p className='text-xl font-bold text-white/80 max-w-lg mx-auto mb-10'>
                Follow Instagram kami untuk update playday terbaru, atau drop WA
                untuk langsung gabung ke grup komunitas!
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Link
                  href='https://www.instagram.com/mataram_bg'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center justify-center gap-3 bg-white text-primary font-display font-black text-xl px-8 py-4 rounded-xl border-4 border-white shadow-[5px_5px_0px_0px_#cf7650] hover:shadow-[8px_8px_0px_0px_#cf7650] hover:-translate-x-1 hover:-translate-y-1 transition-all active:translate-x-0 active:translate-y-0 active:shadow-none'
                >
                  <Instagram className='w-6 h-6' />
                  @mataram_bg
                </Link>
                <Link
                  href='https://wa.me/6281234567890'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center justify-center gap-3 bg-accent-orange text-white font-display font-black text-xl px-8 py-4 rounded-xl border-4 border-white/30 shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:-translate-x-1 hover:-translate-y-1 transition-all active:translate-x-0 active:translate-y-0 active:shadow-none'
                >
                  <MessageCircle className='w-6 h-6' />
                  WhatsApp Kami
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
