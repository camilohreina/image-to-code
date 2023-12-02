'use client'

import { Dropzone, ExtFile } from "@files-ui/react"


export const DragAndDrop = ({ transformImageToCode }: { transformImageToCode: (file: File) => Promise<void> }) => {
    const updateFiles = (files: ExtFile[]) => {
        const file = files[0].file
        if (file != null) transformImageToCode(file)
    }

    return (
        <Dropzone
            header={false}
            footer={false}
            accept="image/*"
            maxFiles={1}
            label="Drag your screenshot here... "
            onChange={updateFiles}
        />
    )

}