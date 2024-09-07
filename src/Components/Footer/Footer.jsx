import React from 'react'
import style from "./Footer.module.css"
import amazonLogo from "../../assets/amazonLogo.png"
import american from "../../assets/american.png"
import paypal from "../../assets/paypal.png"
import masterCard from "../../assets/masterCard.png"
import googlePlay from "../../assets/googleplay.png"
import app2 from "../../assets/app2.png"

export default function Footer() {
  
  
  return <>
  <div className='bg-slate-100  absolute left-[-10px] p-4 container px-7'>
    <div className="container  text-center md:text-start px-5 py-5">
      <h1 className='capitalize'>get the fresh cart app</h1>
      <h2 className='pt-1'>we will send you a link, open it on your phone to download the app</h2>
    </div>
    <div className='w-full ps-1 text-center'>
      <input type="text" className='md:w-[80%] rounded-md outline-none ps-2 p-1 w-full mb-3' name=""  id="" placeholder='Email..' />
      <button className='ms-4 p-2 px-9 text-white shadow-lg   hover:bg-green-600 transition-colors rounded-lg  bg-green-500 '>Share App Link</button>
    </div>
    <div className='md:flex justify-between items-center md:px-7 pt-3 md:pt-0'>
      <div className='md:flex  md:gap-3 pt-5 '>
        <h2 className='text-center'>payment partners </h2>
        <div className='flex justify-center py-2 md:gap-3  gap-1 '>
            <img src={amazonLogo} className='w-14  object-contain pb-3' alt="" />
            <img src={american} className='w-14  object-contain pb-3' alt="" />
            <img src={paypal} className='w-14  object-contain pb-3' alt="" />
            <img src={masterCard}  className='w-14  object-contain pb-3' alt="" />
        </div>
      </div>
      <div className='md:flex items-center gap-3 md:pt-0 pt-3' >
        <h2 className='capitalize text-center'>get deliveries with freshCart</h2>
          <div className='flex justify-center py-3 gap-3'>
          <img src={googlePlay}  className='w-20 cursor-pointer  object-contain' alt="" />
          <img src={app2}  className='w-20 cursor-pointer  object-contain ' alt="" />
          </div>

      </div>
    </div>
    
  </div>
  
  
  </>
}
