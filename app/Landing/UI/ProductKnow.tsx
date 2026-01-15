import { useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import React, { useEffect, useRef } from 'react'
import {motion} from "motion/react" 
import { inter, oswald } from '@/app/fonts'
import { Oswald } from 'next/font/google'
import Typewriteranimation from './Typewriteranimation'

const ProductKnow = () => {

  const ref = useRef(null)

  const motionValue = useMotionValue(0)  

  const {scrollYProgress}  = useScroll({
        target : ref,
        offset : ['end start' , 'start end']
  })

  // const spring = useSpring(scrollYProgress,{
  //   stiffness:120,
  //   damping:30
  // })
 
  const TopOpacity = useTransform(scrollYProgress,[0,0.235],[0,1])  
  const BottomOpacity = useTransform(scrollYProgress,[0.4,0.6],[0,1])  

  const y = useTransform(scrollYProgress,[0,1],[80,0])
  

  return (
    <div
     ref={ref}   
     className='relative h-[250vh] '>
        
        <div className='absolute z-50 inset-0 grid grid-rows-2 px-20 '>
            <div className='grid grid-cols-2  '>
                <motion.div
                    // style={{
                    //     opacity : TopOpacity,
                    // }}    
                    className='flex items-center  text-[#D8DBDE]  '>
                    <motion.div
                      className='max-w-sm'>
                        <motion.h1 
                          style={{
                              y,
                              opacity:TopOpacity
                          }}
                          className={`text-3xl ${oswald} font-bold  `}>
                          Active Noise Cancellation
                        </motion.h1>
                        <p className='text-neutral-400 mt-3 '>
                            <Typewriteranimation text='Silence the chaos. Focus on what matters.' />
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    // style={{
                    //     opacity : BottomOpacity,
                    // }}    
                    className='flex items-center text-[#D8DBDE]    overflow-hidden '>
                    <motion.div
                      style={{
                        y,
                        opacity:BottomOpacity
                      }} 
                      className='max-w-sm'>
                        <h1 className={`text-3xl ${oswald} font-bold  `}>
                            Studio Grade Sound
                        </h1>
                        <p className='text-neutral-400 mt-3 '>
                          <Typewriteranimation text='Studio Grade Sound ' />
                        </p>
                    </motion.div>
                </motion.div>
            </div>
            <div className='grid grid-cols-2  text-[#D8DBDE] '>
                <motion.div
                    // style={{
                    //     opacity : TopOpacity,       
                    // }}    
                    className='flex items-center   '>
                    <div className='max-w-sm'>
                        <h1 className={`text-3xl ${oswald} font-bold  `}>
                          Spatial Audio
                        </h1>
                        <p className='text-neutral-400 mt-3 '>
                          <Typewriteranimation text='Sound that surrounds you.' />
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    // style={{
                    //     opacity : BottomOpacity,
                    // }}    
                    className='flex items-center translate-x-1/2 overflow-hidden '>
                    <div className='max-w-sm'>
                        <h1 className={`text-3xl ${oswald} font-bold   `}>
                          40-Hour Battery
                        </h1>
                        <p className='text-neutral-400 mt-3 '>
                          <Typewriteranimation text='One charge. Days of listening.' />
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>                

      <div className=' z-0 h-screen w-full top-0 sticky  '>
        <video 
            autoPlay
            loop
            muted
            className='  h-full w-full object-cover top-0'
            >
            <source src='\short.mp4' type='video/mp4' />
        </video>
      </div>
        
    </div>
  )
}

export default ProductKnow
