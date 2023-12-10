'use client'
import { useState, useRef } from 'react'
import { Form } from './form'
import { DragAndDrop } from './draganddrop'
import { CodePreview } from './code-preview'
import { LoadingSpinner } from './loading-spinner'

const STEPS = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  PREVIEW: 'PREVIEW',
  ERROR: 'ERROR',
}

const toBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

//generator function
async function* streamReader(res: Response) {
  const reader = res.body?.getReader()
  const decoder = new TextDecoder()
  if (reader == null) return

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    if (value) {
      const chunk = decoder.decode(value)
      yield chunk
    }
  }
}

export default function Home() {
  const [result, setResult] = useState('')
  const [step, setStep] = useState(STEPS.INITIAL)

  const transformToCode = async (body: string) => {
    setStep(STEPS.LOADING)
    setResult('')
    const res = await fetch('/api/generate-code-from-image', {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok || res.body == null) {
      setStep(STEPS.ERROR)
      throw new Error("Error creating code")
    }
    setStep(STEPS.PREVIEW)
    //read data streaming request
    for await (const chunk of streamReader(res)) {
      setResult(prev => prev + chunk)
    }
  }

  const transformImageToCode = async (file: File) => {
    const img = await toBase64(file)
    await transformToCode(JSON.stringify({ img }))
  }

  const updateComponentToCode = async (base64: string, prompt: string) => {
    await transformToCode(JSON.stringify({ img: base64, prompt }))
  }

  const transformUrlToCode = async (url: string) => {
    await transformToCode(JSON.stringify({ url }))
  }


  const [background, html = ''] = result.split('|||')

  return (
    <div className=' flex flex-col gap-4 my-10'>
      <header className='text-center'>
        <h1 className='text-3xl font-semibold' > Image 2 Code</h1 >
        <h2 className='text-sm opacity-75'>Build code from one image...</h2>
      </header >

      <main >
        <section className='max-w-5xl w-full  mx-auto p-10'>
          {step === STEPS.INITIAL && (
            <div className='flex flex-col gap-4 m-auto'>
              <DragAndDrop transformImageToCode={transformImageToCode} />
              <Form transformUrlToCode={transformUrlToCode} />
            </div>
          )}
          {step === STEPS.LOADING && (
            <LoadingSpinner />
          )}
          {
            step === STEPS.PREVIEW && (
              <CodePreview updateComponentToCode={updateComponentToCode} background={background} html={html} />
            )
          }
        </section>
      </main>
      <footer className='text-center'>
        Coded with
        <svg className="inline-block h-5 mb-1 mx-1 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg> by <a className='hover:text-sky-400' target="_blank" href="https://xdiffernt.com/">Camilo Hernández</a>
      </footer>
    </div >
  )
}
