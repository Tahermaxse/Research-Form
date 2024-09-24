import React from 'react'
import Image from 'next/image'
import bg from '../public/bg.webp'
import bg1 from '../public/bg1.png'

const RightSide = () => {
  return (
    <>
      <div className="hidden lg:block lg:w-1/2 bg-blue-50">
        <div className="h-full flex items-center justify-center">
          <Image src={bg1} width={430} height={500} alt='bg' />
        </div>
      </div>
    </>
  )
}

export default RightSide
