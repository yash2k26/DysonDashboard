'use client'
import { useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import React, { useEffect, useRef } from 'react'
import { motion } from "motion/react"
import { oswald } from '@/app/fonts'
import Typewriteranimation from './Typewriteranimation'

const ProductKnow = () => {

  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  })

  const spring = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30
  })

  const TopOpacity = useTransform(scrollYProgress, [0, 0.235], [0, 1])
  const BottomOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1])


  return (
    <div
      ref={ref}
      className='relative h-[250vh] '>

      <div className='sticky top-0 h-screen w-full overflow-hidden'>
        <div className='absolute inset-0 z-0'>
          <video
            autoPlay
            loop
            muted
            className='h-full w-full object-cover'
          >
            <source src='/short.mp4' type='video/mp4' />
          </video>
        </div>

        <div className='absolute z-50 inset-0 grid grid-cols-3 px-20 h-full w-full pointer-events-none'>
          <div className='flex flex-col justify-between py-24 col-start-1'>
            <motion.div
              className='flex flex-col justify-start text-[#D8DBDE]'>
              <motion.div className='max-w-sm'>
                <motion.h1
                  style={{
                    opacity: TopOpacity
                  }}
                  className={`text-3xl ${oswald.className} font-bold`}>
                  Active Noise Cancellation
                </motion.h1>
                <p className='text-neutral-400 mt-3'>
                  <Typewriteranimation text='Silence the chaos. Focus on what matters.' />
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className='flex flex-col justify-end text-[#D8DBDE]'>
              <div className='max-w-sm'>
                <h1 className={`text-3xl ${oswald.className} font-bold`}>
                  Spatial Audio
                </h1>
                <p className='text-neutral-400 mt-3'>
                  <Typewriteranimation text='Sound that surrounds you.' />
                </p>
              </div>
            </motion.div>
          </div>

          {/* Center Column - Empty for Product */}
          <div className='col-start-2'></div>

          {/* Right Column */}
          <div className='flex flex-col justify-between py-24 col-start-3 items-end text-right'>
            <motion.div
              className='flex flex-col justify-start text-[#D8DBDE]'>
              <motion.div
                style={{
                  opacity: BottomOpacity
                }}
                className='max-w-sm'>
                <h1 className={`text-3xl ${oswald.className} font-bold`}>
                  Studio Grade Sound
                </h1>
                <p className='text-neutral-400 mt-3'>
                  <Typewriteranimation text='Studio Grade Sound ' />
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className='flex flex-col justify-end text-[#D8DBDE]'>
              <div className='max-w-sm'>
                <h1 className={`text-3xl ${oswald.className} font-bold`}>
                  40-Hour Battery
                </h1>
                <p className='text-neutral-400 mt-3'>
                  <Typewriteranimation text='One charge. Days of listening.' />
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductKnow
