"use client"
import React from 'react'
import { motion } from "motion/react"


const Typewriteranimation = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    const letters = text.split("")

    const box = {
        start: {},
        end: {
            transition: {
                delayChildren: delay,
                staggerChildren: 0.018
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
                ease: [0.22, 1, 0.36, 1],
                duration: 0.22
            }
        }
    } as const


    return (
        <motion.div
            className="inline-flex flex-wrap gap-x-[0.01em]"
            variants={box}
            initial="start"
            whileInView="end"
            viewport={{ once: true, amount: 0.75 }}
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
