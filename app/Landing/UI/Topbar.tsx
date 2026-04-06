import Image from 'next/image'
import React from 'react'

const Topbar = () => {
  return (
    <div className='bg-transparent z-[120] fixed top-0 left-0 right-0 w-full flex px-10 py-5 items-center justify-between pointer-events-none'>
      <Image
        src="/rem.png"
        width={85}
        height={25}
        draggable={false}
        alt=''
        className='select-none'
      />
      <div>

      </div>
    </div>
  )
}

export default Topbar
