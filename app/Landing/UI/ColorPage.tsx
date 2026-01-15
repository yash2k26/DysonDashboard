"use client"
import React, { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from "motion/react"
import Image from 'next/image'
import { inter } from '@/app/fonts'

const ColorPage = () => {
    
    return (
        <div className="h-[300vh] w-full relative">
            <div className="sticky top-0 h-screen w-full flex items-center justify-between overflow-hidden">
                <div className="w-1/2 flex justify-center z-10">
                    <h1 className={`text-6xl font-bold ${inter.className}`}>
                        Choose your style
                    </h1>
                </div>

                <div className="w-1/2 h-full relative flex items-center justify-center">
                    
                </div>
            </div>
        </div>
    )
}

export default ColorPage
