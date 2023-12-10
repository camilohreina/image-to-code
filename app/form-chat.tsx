'use client'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export const FormChat = ({ updateComponentByPrompt }: { updateComponentByPrompt: (prompt: string) => void }) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const propmt = form.elements.namedItem('prompt') as HTMLTextAreaElement
        updateComponentByPrompt(propmt.value)
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="overflow-hidden [&amp;:has(textarea:focus)]:border-token-border-xheavy [&amp;:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)] flex flex-col w-full dark:border-token-border-heavy flex-grow relative border border-token-border-heavy dark:text-white rounded-2xl bg-white dark:bg-gray-800 shadow-[0_0_0_2px_rgba(255,255,255,0.95)] dark:shadow-[0_0_0_2px_rgba(52,53,65,0.95)]"
        >
            <Textarea id="prompt" rows={1} placeholder="Tell the AI what to change..." className="m-0 w-full min-h-[50px] resize-none border-0 bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-3.5 md:pr-12 placeholder-black/50 dark:placeholder-white/50 pl-3 md:pl-4" style={{ maxHeight: '200px', height: '52px', overflowY: 'hidden' }} />
            <Button type="submit" className="max-w-[32px] max-h-[32px] absolute md:bottom-3 md:right-3 dark:hover:bg-gray-300  text-white p-0.5 border border-black rounded-lg dark:border-white dark:bg-white bottom-1.5 transition-colors">
                <span className="" data-state="closed">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white dark:text-black">
                        <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span>
            </Button>
        </form>
    )
}