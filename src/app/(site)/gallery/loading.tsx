export default function GalleryLoading() {
  return (
    <main className='flex-1 flex flex-col items-center pb-24 pt-8 md:pt-12'>
      <div className='container-fluid w-full max-w-7xl'>
        <div className='bg-primary/10 border-4 border-primary/20 rounded-3xl p-8 md:p-16 mb-20 animate-pulse'>
          <div className='h-6 w-40 bg-primary/10 rounded-xl mb-6' />
          <div className='h-16 w-80 bg-primary/10 rounded-2xl mb-4' />
          <div className='h-10 w-56 bg-primary/10 rounded-2xl mb-8' />
          <div className='h-6 w-96 bg-primary/10 rounded-xl' />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className='bg-white border-4 border-primary/20 rounded-3xl overflow-hidden shadow-[6px_6px_0px_0px_#e5e0d8] animate-pulse'
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className='h-56 bg-primary/5' />
              <div className='p-5 space-y-3'>
                <div className='h-7 w-3/4 bg-primary/10 rounded-xl' />
                <div className='h-4 w-1/2 bg-primary/5 rounded-lg' />
                <div className='h-4 w-28 bg-accent-orange/20 rounded-lg' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
