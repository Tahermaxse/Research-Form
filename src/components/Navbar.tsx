import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <>
     <div className="flex items-center mb-6">
          <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6Z" fill="#4285F4"/>
            <path d="M7 7H17V9H7V7Z" fill="white"/>
            <path d="M7 11H17V13H7V11Z" fill="white"/>
            <path d="M7 15H13V17H7V15Z" fill="white"/>
          </svg>
          <span className="text-xl font-bold text-gray-800"><Link href='/'>Research</Link></span>
    </div> 
    </>
  )
}

export default Navbar
