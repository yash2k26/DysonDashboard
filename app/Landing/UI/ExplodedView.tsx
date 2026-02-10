"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from "motion/react"
import { oswald } from '@/app/fonts'

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

    // Text animations
    // Block 1: Intro
    const opacity1 = useTransform(smoothProgress, [0.1, 0.2, 0.3], [0, 1, 0])
    const y1 = useTransform(smoothProgress, [0.1, 0.2, 0.3], [100, 0, -100])

    // Block 2: Middle phase
    const opacity2 = useTransform(smoothProgress, [0.45, 0.55, 0.65], [0, 1, 0])
    const y2 = useTransform(smoothProgress, [0.45, 0.55, 0.65], [100, 0, -100])

    // Block 3: Conclusion
    const opacity3 = useTransform(smoothProgress, [0.8, 0.9, 0.98], [0, 1, 0])
    const y3 = useTransform(smoothProgress, [0.8, 0.9, 0.98], [100, 0, -100])

    // Total frames available in public/framuu-jpg
    const frameCount = 41
    const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1])

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = []

            for (let i = 0; i < frameCount; i++) {
                const img = new Image()
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

        const unsubscribe = frameIndex.on("change", (latest) => {
            const canvas = canvasRef.current
            if (!canvas) return

            const ctx = canvas.getContext("2d")
            if (!ctx) return

            const imageIndex = Math.round(latest)
            const img = images[imageIndex]

            if (img) {
                canvas.width = window.innerWidth
                canvas.height = window.innerHeight

                const scale = Math.max(canvas.width / img.width, canvas.height / img.height)
                const x = (canvas.width / 2) - (img.width / 2) * scale
                const y = (canvas.height / 2) - (img.height / 2) * scale

                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
            }
        })

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

                {/* Scroll-triggered text blocks */}
                <motion.div
                    style={{ opacity: opacity1, y: y1 }}
                    className={`absolute text-white text-8xl font-bold z-10 text-center ${oswald.className}`}
                >
                    Experience Every Layer
                </motion.div>

                <motion.div
                    style={{ opacity: opacity2, y: y2 }}
                    className={`absolute text-white text-8xl font-bold z-10 text-center ${oswald.className}`}
                >
                    Engineering Excellence
                </motion.div>

                <motion.div
                    style={{ opacity: opacity3, y: y3 }}
                    className={`absolute text-white text-8xl font-bold z-10 text-center ${oswald.className}`}
                >
                    Precision Engineering
                </motion.div>
            </div>
        </section>
    )
}

export default ExplodedView
