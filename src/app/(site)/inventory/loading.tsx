export default function InventoryLoading() {
  return (
    <main className='flex-1 flex flex-col items-center pb-24 pt-8'>
      <div className='container-fluid w-full max-w-7xl px-4 md:px-8'>
        {/* Header Skeleton */}
        <div className='relative mb-16 text-center'>
          <div className='inline-block bg-primary/10 rounded-3xl h-16 w-80 animate-pulse mb-4' />
          <div className='bg-primary/5 rounded-2xl h-6 w-64 mx-auto animate-pulse' />
        </div>

        {/* Search Skeleton */}
        <div className='w-full max-w-3xl mx-auto mb-16'>
          <div
            className='bg-white border-4 border-primary/20 rounded-2xl h-20 animate-pulse'
            style={{ boxShadow: "6px 6px 0px 0px rgba(22,40,54,0.1)" }}
          />
        </div>

        {/* Stats bar skeleton */}
        <div className='flex items-center justify-between mb-8'>
          <div className='bg-primary/10 rounded-xl h-8 w-40 animate-pulse' />
        </div>

        {/* Game Grid Skeleton — 12 cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12'>
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className='bg-white border-4 border-primary/20 rounded-2xl flex flex-col overflow-hidden animate-pulse'
              style={{
                boxShadow: "6px 6px 0px 0px rgba(22,40,54,0.1)",
                animationDelay: `${i * 50}ms`,
              }}
            >
              {/* Cover image placeholder */}
              <div className='w-full aspect-square bg-primary/5' />

              {/* Card body */}
              <div className='p-6 flex-1 flex flex-col gap-3'>
                <div className='bg-primary/10 rounded-lg h-7 w-4/5' />
                <div className='bg-primary/5 rounded-lg h-4 w-2/3' />
                <div className='mt-auto pt-4 border-t-2 border-primary/10 flex gap-2'>
                  <div className='bg-primary/5 rounded-md h-6 w-16' />
                  <div className='bg-primary/5 rounded-md h-6 w-16' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
