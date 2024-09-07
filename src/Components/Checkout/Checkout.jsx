import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Checkout() {
  let { checkout } = useContext(CartContext);
  let {cartId} =useContext(CartContext)

  let forimk = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    

    onSubmit: () =>
      handleCheckout(cartId , `http://localhost:5173`),
  });
  

  async function handleCheckout(cartId, url) {
  let {data} = await checkout(cartId, url , forimk.values);
    window.location.href = data.session.url;
  }



  return (
    <>
      <div className="my-5">
        <h2 className="font-bold text-2xl text-center text-emerald-600 mb-5">
          Check Out Now
        </h2>
        <form onSubmit={forimk.handleSubmit} className="max-w-lg mx-auto">
          <div className="relative z-0 w-full mb-5 group ">
            <input
              onBlur={forimk.handleBlur}
              onChange={forimk.handleChange}
              value={forimk.values.details}
              name="details"
              type="text"
              id="details"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="details"
              className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Details
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group ">
            <input
              onBlur={forimk.handleBlur}
              onChange={forimk.handleChange}
              value={forimk.values.phone}
              name="phone"
              type="tel"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Phone
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group ">
            <input
              onBlur={forimk.handleBlur}
              onChange={forimk.handleChange}
              value={forimk.values.city}
              name="city"
              type="text"
              id="city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="city"
              className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your City
            </label>
          </div>

          <div className="flex gap-4 items-center">
            <button
              type="submit"
              className="text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              CheckOut
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
