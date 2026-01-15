"use client"
import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react'
import Image from 'next/image'
import { animate } from 'motion'
import { Inter } from 'next/font/google'
import { inter } from '../fonts'
import ColorPage from './UI/ColorPage'
import ProductKnow from './UI/ProductKnow'

const page = () => {

    const sectionref = useRef(null)
    const [currentframe , setCurrentframe ] = useState(1)
    const motionValue = useMotionValue(0)

    const frames = Array.from(
        {length : 40},
        (_,i) => `/framuu-jpg/ezgif-frame-0${i}.jpg`
    )

    const {scrollYProgress} = useScroll({
        target: sectionref,
        offset : ["start start" , "end end"]
    })


    const frameIndex = useTransform(
        scrollYProgress,
        [0,1],
        [0,39]
    )

    const ParallaxX = useTransform(scrollYProgress,[0,1],[0,30])
    // const RotateX = useTransform(scrollYProgress,[0.1,0.3],[0,-8])

    const ParallaxY = useTransform(scrollYProgress,[0,1],[0,-30])
    // const RotateY = useTransform(scrollYProgress,[0.1,0.3],[-6,6])

    const FirstText = useTransform(scrollYProgress,[0.1,0.3],[20,0])
    const FirstTextOpacity = useTransform(scrollYProgress,[0.25,0.35,0.4],[0,1,0],{clamp:true})
    
    const SubText = useTransform(scrollYProgress,[0.25,0.45],[30,0])
    const SubTextOpacity = useTransform(scrollYProgress,[0.4,0.6,0.7],[0,1,0],{clamp:true})


    const Button = useTransform(scrollYProgress,[0.5,0.85],[20,0])
    const ButtonOpacity = useTransform(scrollYProgress,[0.7,0.85],[0,1])

    const blur = useTransform(scrollYProgress,[0,300],[0,10])
    const filter = useMotionTemplate`blur${blur}px`

    const smoothFrame = useSpring(frameIndex,{
        stiffness : 120,
        damping:20,
        mass : 0.5
    }) 

    useMotionValueEvent(smoothFrame, "change" , (latest)=>{
        setCurrentframe(Math.round(latest))
    })

  return (
    <motion.div
    >
        <motion.section
            className='relative h-[270vh] '
            ref={sectionref}
            style={{
                filter,
            }}
        >
            <div
                className=' top-0 sticky relative h-screen   '>
                <motion.img 
                    src={frames[currentframe]}
                    className='w-full max-h-screen    ' 
                    draggable={false} 
                    // animate = {{
                    //     transition:{
                    //         duration:100,
                    //         ease:"easeInOut"
                    //     }
                    // }}
                    // style={{
                    //    x:ParallaxX,
                    //    y:ParallaxY
                    // }} 
                    />
            <div className='max-h-screen bg-white z-50  '>                    
            <motion.h1 
                style={{
                    opacity:FirstTextOpacity,
                }}
                className={`text-4xl text-white absolute bottom-55 left-8 z-50 ${inter.className}  ` }
                >
                 Acoustics, Perfected
            </motion.h1>
            </div>

            <motion.h1
            style={{
                opacity:SubTextOpacity
            }}
                className={`text-5xl text-white absolute bottom-40 right-8 z-50 ${inter}  ` }
            >
                Crafted for Clarity
            </motion.h1>

            <motion.div
                animate = {{
                    transition:{
                        duration:0.8,
                        ease:"easeInOut"
                    }
                }}
                draggable={false}
                style={{
                    opacity:ButtonOpacity
                }}
                className={`-translate-x-1/2 -translate-y-1/2 flex flex-col gap-1.5 mx-auto text-white absolute top-1/2 left-1/2  ` }
            >   
                <h2 draggable={false} className=  {`text-5xl ${inter} `}>
                    Experience the Difference
                </h2>    
                <motion.button
                draggable={false}
                    
                    className={`text-lg border transition border-white/50 rounded-lg px-5 py-3 hover:bg-white/20 backdrop-blur  ${inter} `}
                >
                    Shop Now
                </motion.button>
            </motion.div>
            </div>

        </motion.section>

                
         <ProductKnow/>       

    </motion.div>
  )
}

export default page
