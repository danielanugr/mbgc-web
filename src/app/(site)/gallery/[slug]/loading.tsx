export default function GalleryDetailLoading() {
  return (
    <main className='flex-1 flex flex-col items-center pb-24 pt-8 md:pt-12'>
      <div className='container-fluid w-full max-w-7xl animate-pulse'>
        <div className='h-5 w-40 bg-primary/10 rounded-xl mb-8' />

        <div className='bg-primary/10 border-4 border-primary/20 rounded-3xl p-8 md:p-12 mb-12'>
          <div className='h-5 w-24 bg-primary/10 rounded-xl mb-4' />
          <div className='h-12 w-72 bg-primary/10 rounded-2xl mb-4' />
          <div className='flex gap-4'>
            <div className='h-4 w-48 bg-primary/5 rounded-lg' />
            <div className='h-4 w-32 bg-primary/5 rounded-lg' />
          </div>
        </div>

        <div className='columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4'>
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className='break-inside-avoid rounded-2xl border-4 border-primary/10 bg-primary/5 shadow-[4px_4px_0px_0px_#e5e0d8]'
              style={{
                height: `${160 + (i % 3) * 80}px`,
                animationDelay: `${i * 40}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
