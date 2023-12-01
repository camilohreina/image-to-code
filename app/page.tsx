'use client'
import { useState } from 'react'
import { Form } from './form'

const STEPS = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  PREVIEW: 'PREVIEW',
  ERROR: 'ERROR',
}

export default function Home() {
  const [result, setResult] = useState('')
  const [step, setStep] = useState(STEPS.INITIAL)

  const transformUrlToCode = async (url: string) => {
    setStep(STEPS.LOADING)
    const res = await fetch('/api/generate-code-from-image', {
      method: 'POST',
      body: JSON.stringify({ url }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok || res.body == null) {
      setStep(STEPS.ERROR)
      throw new Error("Error creating code")
    }


    setStep(STEPS.PREVIEW)
    //read data streaming request
    const reader = res.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      if (value) {
        const chunk = decoder.decode(value)
        console.log(chunk)
      }
    }
  }
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
          <Form transformUrlToCode={transformUrlToCode} />
        </section>
      </main>
    </div>
  )
}
