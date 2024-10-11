
import Image from 'next/image'
import React from 'react'




const Navbar = () => {
  return (
    <div className='flex py-3 flex-wrap justify-around  bg-gradient-to-tr from-blue-600 to bg-pink-500'>
      <div className='flex gap-x-3'>
      <Image src={"/list.png"} alt='logo' width={30} height={30}/>
      <h1 className='text-2xl font-semibold text-white'>Todo App</h1>
      </div>

       <ul className='flex gap-[40px] text-lg text-white'>
        <li>Home</li>
        <li>Product</li>
        <li>About</li>
        <li>Contact</li>
       </ul>

    </div>
  )
}

export default Navbar
