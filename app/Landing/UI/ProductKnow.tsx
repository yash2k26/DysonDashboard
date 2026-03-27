'use client'
import { useScroll, useTransform } from 'motion/react'
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

  const TopOpacity = useTransform(scrollYProgress, [0, 0.235], [0, 1])
  const TopY = useTransform(scrollYProgress, [0, 0.235], [40, 0])

  const MidOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
  const MidY = useTransform(scrollYProgress, [0.2, 0.4], [40, 0])

  const BottomOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1])
  const BottomY = useTransform(scrollYProgress, [0.4, 0.6], [40, 0])

  const FinalOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1])
  const FinalY = useTransform(scrollYProgress, [0.6, 0.8], [40, 0])


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
              style={{ opacity: TopOpacity, y: TopY }}
              className='flex flex-col justify-start text-[#D8DBDE] max-w-sm'>
              <h1 className={`text-3xl ${oswald.className} font-bold`}>
                Active Noise Cancellation
              </h1>
              <p className='text-neutral-400 mt-3'>
                <Typewriteranimation text='Silence the chaos. Focus on what matters.' />
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: MidOpacity, y: MidY }}
              className='flex flex-col justify-end text-[#D8DBDE] max-w-sm'>
              <h1 className={`text-3xl ${oswald.className} font-bold`}>
                Spatial Audio
              </h1>
              <p className='text-neutral-400 mt-3'>
                <Typewriteranimation text='Sound that surrounds you.' />
              </p>
            </motion.div>
          </div>

          {/* Center Column - Empty for Product */}
          <div className='col-start-2'></div>

          {/* Right Column */}
          <div className='flex flex-col justify-between py-24 col-start-3 items-end text-right'>
            <motion.div
              style={{ opacity: BottomOpacity, y: BottomY }}
              className='flex flex-col justify-start text-[#D8DBDE] max-w-sm'>
              <h1 className={`text-3xl ${oswald.className} font-bold`}>
                Studio Grade Sound
              </h1>
              <p className='text-neutral-400 mt-3'>
                <Typewriteranimation text='Studio Grade Sound' />
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: FinalOpacity, y: FinalY }}
              className='flex flex-col justify-end text-[#D8DBDE] max-w-sm'>
              <h1 className={`text-3xl ${oswald.className} font-bold`}>
                40-Hour Battery
              </h1>
              <p className='text-neutral-400 mt-3'>
                <Typewriteranimation text='One charge. Days of listening.' />
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductKnow
