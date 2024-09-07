import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import Footer from "../Footer/Footer"



export default function Login() {

  let {userLogin,setuserLogin} = useContext(UserContext)
  const navigate = useNavigate();
  const [ApiError, setApiError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  async function handleLogin(values) {
    setisLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        setisLoading(false);
        if (res.data.message == "success") {
          localStorage.setItem("userToken", res.data.token);
          setuserLogin( res.data.token)
          navigate("/");
        }
      })
      .catch((res) => {
        setisLoading(false);
        
        setApiError(res.response.data.message);
      });
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email is required !"),
    password: Yup.string()
      .matches(/^[A-Za-z0-9]{6,10}$/, "password should be 6 between 10 char")
      .required("password is required"),
  });

  let forimk = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      {ApiError ? (
        <div className="w-1/2 mx-auto bg-red-600 text-white font-bold rounded-lg p-3">
          {ApiError}
        </div>
      ) : null}
      <div className="my-5">
        <h2 className="font-bold text-2xl text-center text-emerald-600 mb-5">
          Login Now
        </h2>
        <form onSubmit={forimk.handleSubmit} className="max-w-lg mx-auto">
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

          <div className="md:flex flex-col gap-4 items-center">
            <button
              type="submit"
              className="text-white  bg-emerald-600 my-3 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-600 font-bold rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 text-center "
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Login"
              )}
            </button>
            <span>
              don't you have an account ?
              <Link to={"/register"} className="text-blue-600 hover:underline hover:text-blue-600">
                Register Now
              </Link>{" "}
            </span>
            <span>
              <Link to={"/forgetpassword"} className="text-blue-600 hover:underline hover:text-blue-600">
                Forget Password ?
              </Link>{" "}
            </span>
       
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
