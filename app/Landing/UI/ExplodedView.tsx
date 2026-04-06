"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react"
import { oswald } from '@/app/fonts'

const ExplodedView = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [images, setImages] = useState<HTMLImageElement[]>([])
    const [isLoaded, setIsLoaded] = useState(false)
    const rafRef = useRef<number | null>(null)
    const lastFrameRef = useRef<number>(-1)

    // Scroll progress mapped to the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Smooth the scroll progress for better visuals
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 24,
        mass: 0.7,
        restDelta: 0.001
    })

    // Text animations
    // Block 1: Intro
    const opacity1 = useTransform(smoothProgress, [0.02, 0.12, 0.28], [0, 1, 0])
    const y1 = useTransform(smoothProgress, [0.02, 0.12, 0.28], [48, 0, -48])

    // Block 2: Middle phase
    const opacity2 = useTransform(smoothProgress, [0.4, 0.52, 0.68], [0, 1, 0])
    const y2 = useTransform(smoothProgress, [0.4, 0.52, 0.68], [56, 0, -56])

    // Block 3: Conclusion
    const opacity3 = useTransform(smoothProgress, [0.74, 0.86, 0.98], [0, 1, 0])
    const y3 = useTransform(smoothProgress, [0.74, 0.86, 0.98], [56, 0, -56])

    // Total frames available in public/framuu-jpg
    const frameCount = 41
    const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1])

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages = await Promise.all(
                Array.from({ length: frameCount }, (_, i) => {
                    return new Promise<HTMLImageElement>((resolve) => {
                        const img = new Image()
                        img.decoding = "async"
                        const src = `/framuu-jpg/ezgif-frame-0${i}.jpg`
                        img.src = src
                        img.onload = () => resolve(img)
                        img.onerror = () => {
                            console.error(`Failed to load image: ${src}`)
                            resolve(img)
                        }
                    })
                })
            )

            setImages(loadedImages)
            setIsLoaded(true)
        }

        loadImages()
    }, [])

    useEffect(() => {
        if (!isLoaded || images.length === 0) return

        const drawFrame = (index: number) => {
            const canvas = canvasRef.current
            if (!canvas) return
            const ctx = canvas.getContext("2d")
            if (!ctx) return
            const img = images[index]
            if (!img || !img.width || !img.height) return

            const dpr = window.devicePixelRatio || 1
            const width = window.innerWidth
            const height = window.innerHeight

            if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
                canvas.width = Math.floor(width * dpr)
                canvas.height = Math.floor(height * dpr)
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            }

            const scale = Math.max(width / img.width, height / img.height)
            const x = width / 2 - (img.width * scale) / 2
            const y = height / 2 - (img.height * scale) / 2

            ctx.clearRect(0, 0, width, height)
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
        }

        const renderAt = (index: number) => {
            if (index === lastFrameRef.current) return
            lastFrameRef.current = index

            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current)
            }
            rafRef.current = requestAnimationFrame(() => {
                drawFrame(index)
                rafRef.current = null
            })
        }

        const initialIndex = Math.round(frameIndex.get())
        renderAt(initialIndex)

        const onResize = () => renderAt(lastFrameRef.current < 0 ? initialIndex : lastFrameRef.current)
        window.addEventListener("resize", onResize)

        return () => {
            window.removeEventListener("resize", onResize)
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current)
                rafRef.current = null
            }
        }
    }, [frameIndex, isLoaded, images])

    useMotionValueEvent(frameIndex, "change", (latest) => {
        const index = Math.round(latest)
        if (!isLoaded) return
        if (index === lastFrameRef.current) return

        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current)
        }
        rafRef.current = requestAnimationFrame(() => {
            const canvas = canvasRef.current
            if (!canvas || !images[index]) return
            const ctx = canvas.getContext("2d")
            if (!ctx) return

            const img = images[index]
            if (!img.width || !img.height) return

            const dpr = window.devicePixelRatio || 1
            const width = window.innerWidth
            const height = window.innerHeight

            if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
                canvas.width = Math.floor(width * dpr)
                canvas.height = Math.floor(height * dpr)
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            }

            const scale = Math.max(width / img.width, height / img.height)
            const x = width / 2 - (img.width * scale) / 2
            const y = height / 2 - (img.height * scale) / 2

            ctx.clearRect(0, 0, width, height)
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
            lastFrameRef.current = index
            rafRef.current = null
        })
    })


    return (
        <section ref={containerRef} className="h-[380vh] w-full relative bg-black">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                {!isLoaded && (
                    <div className="text-white text-2xl animate-pulse">
                        Loading...
                    </div>
                )}
                <motion.canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover will-change-transform [transform:translateZ(0)]"
                    initial={{ opacity: 0, scale: 1.03, y: 10, filter: "blur(6px)" }}
                    animate={isLoaded ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, scale: 1.03, y: 10, filter: "blur(6px)" }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Scroll-triggered text blocks */}
                <motion.div
                    style={{ opacity: opacity1, y: y1 }}
                    className={`absolute text-white text-8xl font-bold tracking-tight z-10 text-center ${oswald.className}`}
                >
                    Experience Every Layer
                </motion.div>

                <motion.div
                    style={{ opacity: opacity2, y: y2 }}
                    className={`absolute text-white text-8xl font-bold tracking-tight z-10 text-center ${oswald.className}`}
                >
                    Engineering Excellence
                </motion.div>

                <motion.div
                    style={{ opacity: opacity3, y: y3 }}
                    className={`absolute text-white text-8xl font-bold tracking-tight z-10 text-center ${oswald.className}`}
                >
                    Precision Engineering
                </motion.div>
            </div>
        </section>
    )
}

export default ExplodedView
