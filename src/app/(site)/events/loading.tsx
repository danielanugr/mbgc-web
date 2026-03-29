export default function EventsLoading() {
  return (
    <main className='flex-1 flex flex-col items-center pb-24 pt-8'>
      <div className='container-fluid w-full max-w-6xl px-4 md:px-8'>
        <div className='text-center mb-16'>
          <div className='inline-block bg-primary/10 rounded-3xl h-16 w-56 animate-pulse mb-4' />
          <div className='bg-primary/5 rounded-2xl h-6 w-96 mx-auto animate-pulse' />
        </div>

        <div className='flex flex-col gap-8'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className='bg-white border-4 border-primary/20 rounded-3xl overflow-hidden animate-pulse'
              style={{
                boxShadow: "8px 8px 0px 0px rgba(22,40,54,0.1)",
                animationDelay: `${i * 100}ms`,
              }}
            >
              <div className='flex flex-col md:flex-row'>
                <div className='md:w-40 flex-shrink-0 bg-primary/5 p-6 flex flex-col items-center justify-center gap-2'>
                  <div className='bg-primary/10 rounded-lg h-6 w-16' />
                  <div className='bg-primary/20 rounded-lg h-12 w-12' />
                </div>

                <div className='flex-1 p-8 flex flex-col gap-4'>
                  <div className='flex items-start justify-between gap-4'>
                    <div className='bg-primary/10 rounded-xl h-8 w-3/4' />
                    <div className='bg-accent-peach/30 rounded-xl h-8 w-24 flex-shrink-0' />
                  </div>
                  <div className='bg-primary/5 rounded-lg h-5 w-1/2' />
                  <div className='flex gap-2 mt-2'>
                    <div className='bg-primary/5 rounded-lg h-10 w-32' />
                    <div className='bg-primary/5 rounded-lg h-10 w-28' />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='flex justify-center mt-12 gap-3'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className='bg-primary/10 border-4 border-primary/20 rounded-xl h-14 w-14 animate-pulse'
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
