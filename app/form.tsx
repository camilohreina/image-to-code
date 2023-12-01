'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const Form = ({ transformUrlToCode }: { transformUrlToCode: (url: string) => void }) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const form = event.currentTarget
        const url = form.elements.namedItem('url') as HTMLInputElement

        transformUrlToCode(url.value)
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Label htmlFor="url">URL of image</Label>
            <Input id="url" type="url" placeholder="https://something.com/avatar.png" />
            <Button>Generate code from image</Button>
        </form>
    )
}