export const DisplayCode = ({ background, html }: { background: string, html: string }) => {

    return (
        <div
            className='w-full h-full border-4 rounded border-gray-700 aspect-video'
            style={{ backgroundColor: `#${background ? background.trim() : 'fff'}` }}
        >
            <iframe srcDoc={html} className='w-full h-full' />
        </div>
    )
}