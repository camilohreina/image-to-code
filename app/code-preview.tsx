'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { DisplayCode } from "./display-code";
import { CodeReview } from "./code-review";

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



        </div>
    )


}