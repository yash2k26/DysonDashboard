import React from 'react'
import Topbar from './UI/Topbar'

const layout = ({children}:{children : React.ReactNode}) => {
  return (
    <div className=' bg-[#000000]'>
      <header className='top-0 z-50 sticky' >
        <Topbar/>
      </header>
      <main >
        {children}
      </main>
    </div>
  )
}

export default layout
