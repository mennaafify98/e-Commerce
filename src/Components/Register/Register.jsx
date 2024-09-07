import React, { useContext, useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import Footer from "../Footer/Footer"



export default function Register() {

  let {userLogin,setuserLogin} = useContext(UserContext)
  const navigate = useNavigate();
  const [ApiError, setApiError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  async function handleRegister(values) {
    setisLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((res) => {
        setisLoading(false);
        if (res.data.message == "success") {
          localStorage.setItem("userToken", res.data.token)
          setuserLogin(res.data.token)
          navigate("/")
        }
      })
      .catch((res) => {
        setisLoading(false);
        
        setApiError(res.response.data.message);
      });
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "min length is 3")
      .max(10, "max length is 10")
      .required("name is required !"),
    email: Yup.string().email("invalid email").required("email is required !"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "invalid phone number !")
      .required("phone is required !"),
    password: Yup.string()
      .matches(/^[A-Za-z0-9]{6,10}$/, "password should be 6 between 10 char")
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "rePassword and password not the same")
      .required("rePassword is required !"),
  });


  let forimk = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      {ApiError ? (
        <div className="w-1/2 mx-auto bg-red-600 text-white font-bold rounded-lg p-3">
          {ApiError}
        </div>
      ) : null}
      <div className="my-5 ">
        <h2 className="font-bold text-2xl text-center text-emerald-600 mb-5">
          Register Now
        </h2>
        <form onSubmit={forimk.handleSubmit} className="max-w-lg mx-auto">
          <div className="relative z-0 w-full mb-5 group ">
            <input
              onBlur={forimk.handleBlur}
              onChange={forimk.handleChange}
              value={forimk.values.name}
              name="name"
              type="text"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Name
            </label>
          </div>
          {forimk.errors.name && forimk.touched.name ? (
            <div
              role="alert"
              className="text-red-500 rounded-lg p-1 mb-4 text-sm"
            >
              {forimk.errors.name}
            </div>
          ) : null}
          <div className="relative z-0 w-full mb-5 group ">
            <input
              onBlur={forimk.handleBlur}
              onChange={forimk.handleChange}
              value={forimk.values.email}
              name="email"
              type="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Email
            </label>
          </div>
          {forimk.errors.email && forimk.touched.email ? (
            <div
              role="alert"
              className="text-red-500  rounded-lg p-1 mb-4 text-sm"
            >
              {forimk.errors.email}
            </div>
          ) : null}
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
          {forimk.errors.phone && forimk.touched.phone ? (
            <div
              role="alert"
              className="text-red-500  rounded-lg p-1 mb-4 text-sm"
            >
              {forimk.errors.phone}
            </div>
          ) : null}
          <div className="relative z-0 w-full mb-5 group ">
            <input
              onBlur={forimk.handleBlur}
              onChange={forimk.handleChange}
              value={forimk.values.password}
              name="password"
              type="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Password
            </label>
          </div>
          {forimk.errors.password && forimk.touched.password ? (
            <div
              role="alert"
              className="text-red-500  rounded-lg p-1 mb-4 text-sm"
            >
              {forimk.errors.password}
            </div>
          ) : null}
          <div className="relative z-0 w-full mb-5 group ">
            <input
              onBlur={forimk.handleBlur}
              onChange={forimk.handleChange}
              value={forimk.values.rePassword}
              name="rePassword"
              type="password"
              id="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="rePassword"
              className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your rePassword
            </label>
          </div>
          {forimk.errors.rePassword && forimk.touched.rePassword ? (
            <div
              role="alert"
              className="text-red-500  rounded-lg p-1 mb-4 text-sm"
            >
              {forimk.errors.rePassword}
            </div>
          ) : null}
          <div className="md:flex gap-4 items-center">
          <button
            type="submit"
            className="text-white my-3 bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Register"
            )}
          </button>
          <span >do you have an account ? <Link to={"/login"} className="text-blue-600">Login Now</Link>  </span>
          </div>
   
        </form>
      </div>
      <Footer />
    </>
  );
}
