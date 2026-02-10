"use client"
import React from 'react'
import { motion, stagger } from "motion/react"


const Typewriteranimation = ({ text }: { text: string }) => {
    const letters = text.split("")

    const box = {
        start: {},
        end: {
            transition: {
                staggerChildren: 0.05
            }
        }
    } as const

    const letteranimate = {
        start: {
            opacity: 0,
            y: "0.25em"
        },
        end: {
            opacity: 1,
            y: "0em",
            transition: {
                ease: "easeOut",
                duration: 0.25
            }
        }
    } as const


    return (
        <motion.div
            variants={box}
            initial="start"
            animate="end"
        >
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    variants={letteranimate}
                >
                    {letter}
                </motion.span>
            ))}
        </motion.div>
    )
}

export default Typewriteranimation
