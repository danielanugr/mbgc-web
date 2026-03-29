export default function EventDetailLoading() {
  return (
    <main className='flex-1 flex flex-col items-center pb-24 pt-8'>
      <div className='container-fluid w-full max-w-6xl px-4 md:px-8'>
        <div className='bg-white border-2 border-primary/20 rounded-xl h-11 w-48 animate-pulse mb-8' />

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
          <div className='lg:col-span-5 w-full'>
            <div
              className='bg-primary/5 border-4 border-primary/20 rounded-3xl w-full aspect-square animate-pulse'
              style={{ boxShadow: "8px 8px 0px 0px rgba(22,40,54,0.1)" }}
            />
          </div>

          <div
            className='lg:col-span-7 bg-white border-4 border-primary/20 rounded-3xl p-8 md:p-12 animate-pulse'
            style={{ boxShadow: "8px 8px 0px 0px rgba(22,40,54,0.1)" }}
          >
            <div className='flex justify-between items-start gap-4 mb-8'>
              <div className='flex flex-col gap-3 flex-1'>
                <div className='bg-primary/10 rounded-xl h-10 w-full' />
                <div className='bg-primary/10 rounded-xl h-10 w-3/4' />
              </div>
              <div className='bg-primary/10 rounded-2xl h-24 w-28 flex-shrink-0' />
            </div>

            <div className='bg-primary/5 rounded-2xl border-2 border-primary/10 border-dashed p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex gap-4 items-center ${i === 2 ? "sm:col-span-2" : ""}`}
                >
                  <div className='bg-primary/10 rounded-xl h-12 w-12 flex-shrink-0' />
                  <div className='flex flex-col gap-2 flex-1'>
                    <div className='bg-primary/10 rounded h-3 w-16' />
                    <div className='bg-primary/10 rounded h-5 w-3/4' />
                  </div>
                </div>
              ))}
            </div>

            <div className='flex flex-col gap-3'>
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className='bg-primary/5 rounded-lg h-5'
                  style={{ width: i === 4 ? "60%" : "100%" }}
                />
              ))}
            </div>

            <div className='mt-12 pt-8 border-t-4 border-primary/10 border-dashed flex gap-4'>
              <div className='flex-1 bg-primary/10 rounded-xl h-14' />
              <div className='w-32 bg-primary/5 rounded-xl h-14' />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
