'use client'
import { useScroll, useSpring, useTransform } from 'motion/react'
import React, { useRef } from 'react'
import { motion } from "motion/react"
import { oswald } from '@/app/fonts'
import Typewriteranimation from './Typewriteranimation'

const ProductKnow = () => {

  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    mass: 0.8,
    restDelta: 0.001
  })

  const TopOpacity = useTransform(smoothProgress, [0.04, 0.12, 0.24], [0, 1, 0.85])
  const TopY = useTransform(smoothProgress, [0.04, 0.14], [32, 0])

  const MidOpacity = useTransform(smoothProgress, [0.22, 0.34, 0.5], [0, 1, 0.88])
  const MidY = useTransform(smoothProgress, [0.22, 0.34], [32, 0])

  const BottomOpacity = useTransform(smoothProgress, [0.42, 0.56, 0.72], [0, 1, 0.88])
  const BottomY = useTransform(smoothProgress, [0.42, 0.56], [32, 0])

  const FinalOpacity = useTransform(smoothProgress, [0.62, 0.78, 0.94], [0, 1, 0.9])
  const FinalY = useTransform(smoothProgress, [0.62, 0.78], [32, 0])


  return (
    <div
      ref={ref}
      className='relative h-[280vh] bg-black'>

      <div className='sticky top-0 h-screen w-full overflow-hidden'>
        <div className='absolute inset-0 z-0'>
          <video
            autoPlay
            loop
            muted
            playsInline
            className='h-full w-full object-cover scale-[1.03] will-change-transform [transform:translateZ(0)]'
          >
            <source src='/short.mp4' type='video/mp4' />
          </video>
        </div>

        <div className='absolute z-50 inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/30' />
        <div className='absolute z-50 inset-0 grid grid-cols-3 px-20 h-full w-full pointer-events-none'>
          <div className='flex flex-col justify-between py-24 col-start-1'>
            <motion.div
              style={{ opacity: TopOpacity, y: TopY }}
              className='flex flex-col justify-start text-[#D8DBDE] max-w-sm will-change-transform'>
              <h1 className={`text-3xl ${oswald.className} font-bold`}>
                Active Noise Cancellation
              </h1>
              <p className='text-neutral-400 mt-3'>
                <Typewriteranimation text='Silence the chaos. Focus on what matters.' delay={0.04} />
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: MidOpacity, y: MidY }}
              className='flex flex-col justify-end text-[#D8DBDE] max-w-sm will-change-transform'>
              <h1 className={`text-3xl ${oswald.className} font-bold`}>
                Spatial Audio
              </h1>
              <p className='text-neutral-400 mt-3'>
                <Typewriteranimation text='Sound that surrounds you.' delay={0.08} />
              </p>
            </motion.div>
          </div>

          {/* Center Column - Empty for Product */}
          <div className='col-start-2'></div>

          {/* Right Column */}
          <div className='flex flex-col justify-between py-24 col-start-3 items-end text-right'>
            <motion.div
              style={{ opacity: BottomOpacity, y: BottomY }}
              className='flex flex-col justify-start text-[#D8DBDE] max-w-sm will-change-transform'>
              <h1 className={`text-3xl ${oswald.className} font-bold`}>
                Studio Grade Sound
              </h1>
              <p className='text-neutral-400 mt-3'>
                <Typewriteranimation text='Studio grade detail, track by track.' delay={0.1} />
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: FinalOpacity, y: FinalY }}
              className='flex flex-col justify-end text-[#D8DBDE] max-w-sm will-change-transform'>
              <h1 className={`text-3xl ${oswald.className} font-bold`}>
                40-Hour Battery
              </h1>
              <p className='text-neutral-400 mt-3'>
                <Typewriteranimation text='One charge. Days of uninterrupted listening.' delay={0.14} />
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductKnow
