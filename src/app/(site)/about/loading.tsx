export default function AboutLoading() {
  return (
    <main className='flex-1 flex flex-col items-center pb-24 pt-8 md:pt-12'>
      <div className='container-fluid w-full max-w-5xl animate-pulse'>
        <div className='text-center mb-20'>
          <div className='h-8 w-64 bg-accent-orange/20 rounded-xl mx-auto mb-8' />
          <div className='h-20 w-full max-w-2xl bg-primary/10 rounded-3xl mx-auto mb-6' />
          <div className='h-6 w-96 bg-primary/5 rounded-xl mx-auto' />
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-20'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`border-4 border-primary/10 rounded-2xl p-5 text-center ${i % 2 === 1 ? "bg-primary/10" : "bg-white"}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className='w-7 h-7 rounded-full bg-primary/10 mx-auto mb-2' />
              <div className='h-7 w-16 bg-primary/10 rounded-xl mx-auto mb-2' />
              <div className='h-3 w-12 bg-primary/5 rounded-lg mx-auto' />
            </div>
          ))}
        </div>

        <div className='bg-white border-4 border-primary/10 rounded-3xl p-8 md:p-12 mb-20 shadow-[8px_8px_0px_0px_#e5e0d8] space-y-4'>
          <div className='h-5 w-full bg-primary/5 rounded-lg' />
          <div className='h-5 w-5/6 bg-primary/5 rounded-lg' />
          <div className='h-5 w-4/5 bg-primary/5 rounded-lg' />
          <div className='h-5 w-full bg-primary/5 rounded-lg' />
          <div className='h-5 w-3/4 bg-primary/5 rounded-lg' />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className='bg-primary/5 border-4 border-primary/10 rounded-3xl p-8 shadow-[6px_6px_0px_0px_#e5e0d8]'
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className='w-14 h-14 bg-primary/10 rounded-2xl mb-4' />
              <div className='h-7 w-32 bg-primary/10 rounded-xl mb-3' />
              <div className='space-y-2'>
                <div className='h-4 w-full bg-primary/5 rounded-lg' />
                <div className='h-4 w-4/5 bg-primary/5 rounded-lg' />
              </div>
            </div>
          ))}
        </div>

        <div className='bg-primary/10 border-4 border-primary/10 rounded-3xl p-8 md:p-16 text-center'>
          <div className='h-8 w-36 bg-accent-orange/20 rounded-xl mx-auto mb-6' />
          <div className='h-16 w-72 bg-primary/10 rounded-2xl mx-auto mb-6' />
          <div className='h-5 w-96 bg-primary/5 rounded-xl mx-auto mb-10' />
          <div className='flex gap-4 justify-center flex-col sm:flex-row'>
            <div className='h-14 w-44 bg-white rounded-xl' />
            <div className='h-14 w-44 bg-accent-orange/20 rounded-xl' />
          </div>
        </div>
      </div>
    </main>
  );
}
