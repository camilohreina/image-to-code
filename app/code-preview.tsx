import { useRef, useState } from "react";

export const CodePreview = ({ background, html }: { background: string, html: string }) => {

    const codeRef = useRef<HTMLDivElement>(null);
    const [isCopied, setIsCopied] = useState(false)

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

    return (
        <div className='rounded flex flex-col gap-4'>
            <div
                className='w-full h-full border-4 rounded border-gray-700 aspect-video'
                style={{ backgroundColor: `#${background ? background.trim() : 'fff'}` }}
            >
                <iframe srcDoc={html} className='w-full h-full' />
            </div>
            <pre>
                <div className=' bg-black rounded-md '>
                    <div className="flex min-h-[56px] items-center relative text-gray-200 bg-gray-800 dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md">
                        <p><span className='text-orange-400'>Html</span> & <span className="text-sky-400">Tailwind</span></p>
                        {!isCopied ? (
                            <button className="flex gap-1 items-center hover:bg-gray-900 p-2 rounded-md" onClick={handleCopyClick}>
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