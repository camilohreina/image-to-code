'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { DisplayCode } from "./display-code";
import { CodeReview } from "./code-review";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const CodePreview = ({ background, html }: { background: string, html: string }) => {
    return (
        <div className='rounded flex flex-col gap-4'>
            <Tabs defaultValue="preview" >
                <TabsList className="h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-2">
                    <TabsTrigger value="preview" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Preview</TabsTrigger>
                    <TabsTrigger value="code" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="mt-2">
                    <DisplayCode background={background} html={html} />
                </TabsContent>
                <TabsContent value="code" className="mt-2">
                    <CodeReview html={html} />
                </TabsContent>
            </Tabs>
            <form className="overflow-hidden [&amp;:has(textarea:focus)]:border-token-border-xheavy [&amp;:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)] flex flex-col w-full dark:border-token-border-heavy flex-grow relative border border-token-border-heavy dark:text-white rounded-2xl bg-white dark:bg-gray-800 shadow-[0_0_0_2px_rgba(255,255,255,0.95)] dark:shadow-[0_0_0_2px_rgba(52,53,65,0.95)]">
                <Textarea id="prompt-textarea" data-id="root" rows={1} placeholder="Typing here..." className="m-0 w-full min-h-[50px] resize-none border-0 bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-3.5 md:pr-12 placeholder-black/50 dark:placeholder-white/50 pl-3 md:pl-4" style={{ maxHeight: '200px', height: '52px', overflowY: 'hidden' }} />
                <Button className="max-w-[32px] max-h-[32px] absolute md:bottom-3 md:right-3 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent right-2 dark:disabled:bg-white disabled:bg-black disabled:opacity-10 disabled:text-gray-400 enabled:bg-black text-white p-0.5 border border-black rounded-lg dark:border-white dark:bg-white bottom-1.5 transition-colors" data-testid="send-button">
                    <span className="" data-state="closed">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white dark:text-black">
                            <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                </Button>
            </form>
        </div>
    )


}