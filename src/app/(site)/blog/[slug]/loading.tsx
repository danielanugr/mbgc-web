export default function BlogDetailLoading() {
  return (
    <main className='flex-1 flex flex-col items-center pb-24 pt-8 md:pt-12'>
      <div className='container-fluid w-full max-w-5xl'>
        <div className='w-44 h-6 rounded-lg bg-primary/10 animate-pulse mb-8' />

        <div className='bg-white border-4 border-primary/30 rounded-3xl overflow-hidden animate-pulse'>
          <div className='aspect-16/8 bg-primary/10' />
          <div className='p-7 md:p-12'>
            <div className='h-6 w-28 rounded-md bg-primary/10 mb-4' />
            <div className='h-16 w-4/5 rounded-xl bg-primary/10 mb-4' />
            <div className='h-6 w-full rounded-md bg-primary/5 mb-3' />
            <div className='h-6 w-3/4 rounded-md bg-primary/5 mb-8' />
            <div className='h-48 w-full rounded-2xl bg-primary/5' />
          </div>
        </div>
      </div>
    </main>
  );
}
