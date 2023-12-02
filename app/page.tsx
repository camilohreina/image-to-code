'use client'
import { useState, useRef } from 'react'
import { Form } from './form'
import { DragAndDrop } from './draganddrop'

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
  const [isCopied, setIsCopied] = useState(false)
  const codeRef = useRef<HTMLDivElement>(null);

  const transformToCode = async (body: string) => {
    setStep(STEPS.LOADING)
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

  const transformUrlToCode = async (url: string) => {
    setStep(STEPS.LOADING)
    await transformToCode(JSON.stringify({ url }))
  }


  const handleCopyClick = () => {
    if (codeRef.current) {
      const range = document.createRange();
      range.selectNode(codeRef.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand('copy');
      window.getSelection()?.removeAllRanges();
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 3000)
    }
  };

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
            <div className='flex items-center justify-center h-full'>
              <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
          {
            step === STEPS.PREVIEW && (
              <div className='rounded flex flex-col gap-4'>
                <div className='w-full h-full border-4 rounded border-gray-700 aspect-video' style={{ backgroundColor: `#${background ? background.trim() : 'fff'}` }}>
                  <iframe srcDoc={html} className='w-full h-full' />
                </div>
                <pre>
                  <div className=' bg-black rounded-md '>
                    <div className="flex min-h-[56px] items-center relative text-gray-200 bg-gray-800 dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md">
                      <p><span className='text-orange-400'>Html</span> & <span className="text-sky-400">Tailwind</span></p>
                      {!isCopied ? (<button className="flex gap-1 items-center hover:bg-gray-900 p-2 rounded-md" onClick={handleCopyClick}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-sm">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z" fill="currentColor">
                          </path>
                        </svg>Copy code
                      </button>) : (
                        <span>
                          Copied!
                        </span>
                      )}
                    </div>
                    <div className='p-4 overflow-y-auto'>
                      <code ref={codeRef}>{html}</code>
                    </div>
                  </div>
                </pre>
              </div>
            )
          }
        </section>
      </main>
      <footer className='text-center'>
        Coded with <svg className="inline-block h-5 mb-1 mx-1 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path> </svg> by Camilo Hernández
      </footer>
    </div >
  )
}
