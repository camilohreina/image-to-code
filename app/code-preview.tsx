'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useRef, useState } from "react";

export const CodePreview = ({ background, html }: { background: string, html: string }) => {

    const codeRef = useRef<HTMLDivElement>(null);
    const [isCopied, setIsCopied] = useState(false)

    const handleCopyClick = () => {
        if (codeRef.current) {
            navigator.clipboard.writeText(codeRef.current.innerText);
            setIsCopied(true)
            setTimeout(() => {
                setIsCopied(false)
            }, 3000)
        }
    };

    return (
        <div className='rounded flex flex-col gap-4'>

            <Tabs defaultValue="preview" >
                <TabsList className="h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-2">
                    <TabsTrigger value="preview" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Preview</TabsTrigger>
                    <TabsTrigger value="code" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="mt-2">
                    <div
                        className='w-full h-full border-4 rounded border-gray-700 aspect-video'
                        style={{ backgroundColor: `#${background ? background.trim() : 'fff'}` }}
                    >
                        <iframe srcDoc={html} className='w-full h-full' />
                    </div>
                </TabsContent>
                <TabsContent value="code" className="mt-2">
                    <pre className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950  dark:bg-zinc-900">
                        <div className=' bg-black rounded-md '>
                            <div className="flex min-h-[48px] items-center relative text-gray-200 bg-gray-800 dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md">
                                <p><span className='text-orange-400'>Html</span> & <span className="text-sky-400">Tailwind</span></p>
                                {!isCopied ? (
                                    <button className="flex gap-1 items-center hover:bg-gray-900 p-2 rounded-md" onClick={handleCopyClick}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-sm">
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
                                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm" data-theme="default" data-language="html" ref={codeRef}>{html}</code>
                            </div>

                        </div>
                    </pre>

                </TabsContent>
            </Tabs>



        </div>
    )


}