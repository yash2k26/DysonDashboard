"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from "motion/react"

const ExplodedView = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [images, setImages] = useState<HTMLImageElement[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Scroll progress mapped to the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Smooth the scroll progress for better visuals
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 30,
        restDelta: 0.001
    })

    // Total frames available in public/framuu-jpg
    // Filenames: ezgif-frame-00.jpg to ezgif-frame-040.jpg
    const frameCount = 41

    // Map scroll (0 to 1) to frame index (0 to 40)
    const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1])

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = []

            for (let i = 0; i < frameCount; i++) {
                const img = new Image()
                // Construct filename: ezgif-frame-00.jpg, 01.jpg ... 010.jpg
                // The numbering seems to be: 'ezgif-frame-0' + number + '.jpg'
                // verifying: 0 -> 00, 5 -> 05, 10 -> 010
                const src = `/framuu-jpg/ezgif-frame-0${i}.jpg`

                img.src = src
                await new Promise((resolve) => {
                    img.onload = resolve
                    img.onerror = () => {
                        console.error(`Failed to load image: ${src}`)
                        resolve(null)
                    }
                })
                loadedImages.push(img)
            }

            setImages(loadedImages)
            setIsLoaded(true)
        }

        loadImages()
    }, [])

    useEffect(() => {
        if (!isLoaded || images.length === 0) return

        // Render loop or change listener
        const unsubscribe = frameIndex.on("change", (latest) => {
            const canvas = canvasRef.current
            if (!canvas) return

            const ctx = canvas.getContext("2d")
            if (!ctx) return

            const imageIndex = Math.round(latest)
            const img = images[imageIndex]

            if (img) {
                // Ensure canvas size matches image or window aspect ratio
                // Ideally this reasoning happens once or on resize, but for simplicity here:
                canvas.width = window.innerWidth
                canvas.height = window.innerHeight

                // "Cover" logic for drawing image
                const scale = Math.max(canvas.width / img.width, canvas.height / img.height)
                const x = (canvas.width / 2) - (img.width / 2) * scale
                const y = (canvas.height / 2) - (img.height / 2) * scale

                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
            }
        })

        // Initial draw
        const initialIndex = Math.round(frameIndex.get())
        if (images[initialIndex] && canvasRef.current) {
            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d")
            const img = images[initialIndex]
            if (ctx) {
                canvas.width = window.innerWidth
                canvas.height = window.innerHeight
                const scale = Math.max(canvas.width / img.width, canvas.height / img.height)
                const x = (canvas.width / 2) - (img.width / 2) * scale
                const y = (canvas.height / 2) - (img.height / 2) * scale
                ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
            }
        }

        return () => unsubscribe()
    }, [isLoaded, frameIndex, images])


    return (
        <section ref={containerRef} className="h-[500vh] w-full relative bg-black">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                {!isLoaded && (
                    <div className="text-white text-2xl animate-pulse">
                        Loading...
                    </div>
                )}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Optional overlay text */}
                <motion.div
                    style={{ opacity: useTransform(smoothProgress, [0.8, 1], [0, 1]) }}
                    className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white text-4xl font-light z-10"
                >
                    Precision Engineering
                </motion.div>
            </div>
        </section>
    )
}

export default ExplodedView
