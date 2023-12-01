import { Button } from '@/components/ui/button'
import { Form } from './form'

export default function Home() {
  return (
    <div className="grid grid-cols-[400px_1fr]">
      <aside className='flex flex-col justify-between min-h-screen p-4 bg-gray-900 '>
        <header className='text-center'>
          <h1 className='text-3xl font-semibold'>Image 2 Code</h1>
          <h2 className='text-sm opacity-75'>Pass one image to code in seconds...</h2>
        </header>

        <section>
          {/* Filters will be here */}
        </section>

        <footer>
          Desarrollado por xDiffrent
        </footer>
      </aside>
      <main className='bg-gray-950'>
        <section className='max-w-2xl mx-auto p-10'>
          <Form />
        </section>
      </main>
    </div>
  )
}
