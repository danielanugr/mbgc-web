export default function BlogLoading() {
  return (
    <main className='flex-1 flex flex-col items-center pb-24 pt-8 md:pt-12'>
      <div className='container-fluid w-full max-w-7xl'>
        <div className='bg-white border-4 border-primary rounded-3xl p-8 md:p-14 shadow-[8px_8px_0px_0px_#162836] mb-12'>
          <div className='w-40 h-8 rounded-lg bg-primary/10 animate-pulse mb-6' />
          <div className='w-full max-w-3xl h-24 rounded-2xl bg-primary/10 animate-pulse' />
          <div className='w-full max-w-2xl h-8 rounded-xl bg-primary/5 animate-pulse mt-6' />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className='bg-white border-4 border-primary/30 rounded-3xl overflow-hidden animate-pulse'
            >
              <div className='aspect-16/10 bg-primary/10' />
              <div className='p-6'>
                <div className='h-6 w-24 rounded-md bg-primary/10 mb-4' />
                <div className='h-8 w-4/5 rounded-md bg-primary/10 mb-3' />
                <div className='h-5 w-full rounded-md bg-primary/5 mb-2' />
                <div className='h-5 w-2/3 rounded-md bg-primary/5' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
