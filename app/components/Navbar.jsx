import React from 'react'

import Link from "next/link"

const Navbar = () => {
  return (
    <nav className='fixed min-w-[600px] p-5 border-b'>
        <div className='flex justify-between'>
            <span>
                <Link href="/">Nigga</Link>
            </span>
            <div className='flex gap-x-3'>
                <Link href="">Sign in</Link>
                <Link href="">Sign up</Link>
            </div>
        </div>
    </nav>
  )
}

export default Navbar