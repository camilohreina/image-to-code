import { useEffect, useRef } from "react";
import useThrottle from "./hooks/useThrottle";

export const DisplayCode = ({ background, html }: { background: string, html: string }) => {
    const throttledCode = useThrottle(html, 200);
    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe && iframe.contentDocument) {
            iframe.contentDocument.open();
            iframe.contentDocument.write(throttledCode);
            iframe.contentDocument.close();
        }
    }, [throttledCode]);

    return (
        <div
            className='w-full h-full border-4 rounded border-gray-700 aspect-video'
            style={{ backgroundColor: `#${background ? background.trim() : 'fff'}` }}
        >
            <iframe ref={iframeRef} id="preview-code" className='w-full h-full' />
        </div>
    )
}