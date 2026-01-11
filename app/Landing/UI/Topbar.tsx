import Image from 'next/image'
import React from 'react'

const Topbar = () => {
  return (
    <div className='bg-transparent z-50 absolute flex p-2.5 items-center justify-between '>
      <Image 
        src="/rem.png"
        width={85} 
        height={25} 
        draggable={false}
        alt='' 
        className=' '
        />
        <div>

        </div>
    </div>
  )
}

export default Topbar
