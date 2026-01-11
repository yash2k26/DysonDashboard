"use client"
import React, { useRef, useState } from 'react'
import {motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform} from "motion/react"
import Image from 'next/image'
import { inter } from '@/app/fonts'

const ColorPage = () => {
    const ref = useRef(null)
    const MotionValue  = useMotionValue(0)
    const [frame , setFrame ] = useState(1)

    const {scrollYProgress} = useScroll({
        target:ref,
        offset:["start end" , "end start"]
    })

    const frames = Array.from(
        {length:4},
        (_,i)=>`/Kuddi/kuddi${i+1}.png`
    )

    const FramesIndex = useTransform(scrollYProgress,[0,1],[0,3],{clamp:true})

    const smoothFrame = useSpring(FramesIndex,{
        stiffness:120,
        damping:20,
        mass:2
    })

    useMotionValueEvent(smoothFrame,"change",(latest)=>{
        setFrame(Math.round(latest))
    })

  return (
    <motion.div
            style={{
                    scale: useTransform(scrollYProgress,[0,1],[0.95,1])
            }}
            ref={ref}
            className='flex h-[150vh]  justify-between items-center '
            // style={{
            //     x:ParallaxX,
            //     y:ParallaxY
            // }}
         >
            <div>
                <h1 className={`text-5xl ${inter} `}>
                    Choose your own style
                </h1>
            </div> 

            <Image
                
                className='overflow-hidden h-screen bg-transparent' 
                src={`${frames[frame]}`} 
                alt=''
                width={600}
                height={800}
                priority 
            />
        </motion.div>
  )
}

export default ColorPage
