import React, { useContext, useState } from "react";
import style from "./Navber.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { Button, Navbar } from "flowbite-react";
import { WishListContext } from "../../Context/WishListContext";

export default function Navber() {
  const { numberItems } = useContext(CartContext);
  const { count } = useContext(WishListContext);
  const { userLogin, setuserLogin } = useContext(UserContext);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  function signout() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
  }

  function toggleNav() {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <>
      {/* <nav className="border-gray-200 px-6 bg-slate-300 fixed left-0 right-0 top-0">
        <div className="max-w-screen-xl flex flex-wrap items-center md:justify-normal justify-between p-2 mx-auto py-3">
          <Link to="" className="flex items-center pb-1 space-x-3 rtl:space-x-reverse">
            <img src={logo} width={"110px"} className="h-8 me-3" alt="Flowbite Logo" />
          </Link>
          <button
            onClick={toggleNav}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded={isNavOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="false" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div
            className={`${
              isNavOpen ? "block" : "hidden"
            } w-full md:block md:w-auto relative md:top-1`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col text-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-5 rtl:space-x-reverse md:mt-0 md:border-0 text-white">
              {userLogin != null ? (
                <>
                  <li>
                    <NavLink to="" className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0">
                      <i className="fas fa-home text-emerald-600"></i> Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="cart" className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0">
                      Cart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="products" className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0">
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="categories" className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0">
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="brands" className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0">
                      Brands
                    </NavLink>
                  </li>
                </>
              ) : null}
              {userLogin == null ? (
                <>
                  <div className="md:flex items-center space-x-6 rtl:space-x-reverse relative bottom-[2px] md:left-[950px]">
                    {userLogin != null ? (
                      <>
                        <div className="icons flex my-3 md:my-[-5px] gap-3 justify-center">
                          <Link to={`/cart`}>
                            <i className="fa-solid fa-cart-shopping relative cursor-pointer">
                              <span className="absolute top-[-15px] right-[-12px] text-white size-5 bg-red-600 rounded-full flex items-center justify-center text-[12px]">
                                {numberItems}
                              </span>
                            </i>
                          </Link>
                          <i className="fab fa-facebook text-black"></i>
                          <i className="fab fa-linkedin text-black"></i>
                          <i className="fab fa-youtube text-black"></i>
                          <i className="fab fa-tiktok text-black"></i>
                          <i className="fab fa-twitter text-black"></i>
                        </div>
                      </>
                    ) : null}
                    <div className="links flex gap-3">
                      {userLogin != null ? (
                        <span onClick={signout} className="text-sm cursor-pointer btn">
                          SignOut
                        </span>
                      ) : (
                        <>
                          <NavLink to="login" className="text-sm btn">
                            Login
                          </NavLink>
                          <NavLink to="register" className="text-sm btn">
                            Register
                          </NavLink>
                        </>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="md:flex items-center space-x-6 rtl:space-x-reverse relative bottom-[2px] md:left-[500px]">
                    <div className="icons flex my-3 md:my-[-5px] gap-3 justify-center">
                      <Link to={`/cart`}>
                        <i className="fa-solid fa-cart-shopping hover:text-emerald-500 transition-all relative cursor-pointer">
                          <span className="absolute top-[-15px] right-[-12px] text-white size-5 bg-red-600 rounded-full flex items-center justify-center text-[12px]">
                            {numberItems}
                          </span>
                        </i>
                      </Link>
                      <i className="fab fa-facebook text-black hover:text-blue-600 cursor-pointer transition-all"></i>
                      <i className="fab fa-linkedin text-black hover:text-blue-600 cursor-pointer transition-all"></i>
                      <i className="fab fa-youtube text-black hover:text-red-600 cursor-pointer transition-all"></i>
                      <i className="fab fa-tiktok text-black hover:text-black cursor-pointer transition-all"></i>
                      <i className="fab fa-twitter text-black hover:text-blue-400 cursor-pointer transition-all"></i>
                    </div>
                    <div className="links flex gap-3">
                      {userLogin != null ? (
                        <span onClick={signout} className="text-sm cursor-pointer btn">
                          SignOut
                        </span>
                      ) : (
                        <>
                          <NavLink to="login" className="text-sm btn">
                            Login
                          </NavLink>
                          <NavLink to="register" className="text-sm btn">
                            Register
                          </NavLink>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav> */}

      <nav className="border-gray-200 px-6 bg-slate-300 fixed left-0 right-0 top-0">
        <div className="max-w-screen-xl flex flex-wrap items-center md:justify-normal justify-between p-2 mx-auto py-3">
          <Link
            to=""
            className="flex items-center pb-1 space-x-3 rtl:space-x-reverse"
          >
            <img
              src={logo}
              width={"110px"}
              className="h-8 me-3"
              alt="Flowbite Logo"
            />
          </Link>
          <button
            onClick={toggleNav}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded={isNavOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="false"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              isNavOpen ? "block" : "hidden"
            } w-full md:block md:w-auto relative md:top-1`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col text-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-5 rtl:space-x-reverse md:mt-0 md:border-0 text-white">
              {userLogin != null ? (
                <>
                  <li>
                    <NavLink
                      to=""
                      className="block py-2 px-3 text-black rounded   md:border-0 md:p-0 "
                    >
                      <i className="fas fa-home text-emerald-600"></i> Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="cart"
                      className="block py-2 px-3 text-black rounded   md:border-0 md:p-0 "
                    >
                      Cart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="products"
                      className="block py-2 px-3 text-black rounded   md:border-0 md:p-0 "
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="categories"
                      className="block py-2 px-3 text-black rounded   md:border-0 md:p-0 "
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="brands"
                      className=" block py-2 px-3 text-black rounded   md:border-0 md:p-0 "
                    >
                      Brands
                    </NavLink>
                  </li>
                </>
              ) : null}
              {userLogin == null ? (
                <>
                  <div className="md:flex items-center space-x-6 rtl:space-x-reverse relative bottom-[2px] md:left-[950px]">
                    {userLogin != null ? (
                      <>
                        <div className="icons flex my-3 md:my-[-5px] gap-3 justify-center">
                          <Link to={`/cart`}>
                            <i className="fa-solid fa-cart-shopping relative cursor-pointer">
                              <span className="absolute top-[-15px] right-[-12px] text-white size-5 bg-red-600 rounded-full flex items-center justify-center text-[12px]">
                                {numberItems}
                              </span>
                            </i>
                          </Link>
                          <i className="fa-solid fa-heart"></i>
                          <i className="fab fa-facebook text-black"></i>
                          <i className="fab fa-linkedin text-black"></i>
                          <i className="fab fa-youtube text-black"></i>
                          <i className="fab fa-tiktok text-black"></i>
                          <i className="fab fa-twitter text-black"></i>
                        </div>
                      </>
                    ) : null}
                    <div className="links flex gap-3">
                      {userLogin != null ? (
                        <span
                          onClick={signout}
                          className="text-sm cursor-pointer btn"
                        >
                          SignOut
                        </span>
                      ) : (
                        <>
                          <NavLink to="login" className=" text-sm btn" >
                            Login
                          </NavLink>
                          <NavLink to="register" className="text-sm btn">
                            Register
                          </NavLink>
                        </>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="md:flex items-center space-x-6 rtl:space-x-reverse relative bottom-[2px] md:left-[500px]">
                    <div className="icons flex my-3 md:my-[-5px] gap-3 justify-center">
                      <Link to={`/cart`}>
                        <i className="fa-solid fa-cart-shopping hover:text-emerald-500 transition-all relative cursor-pointer">
                    {numberItems > 0 ?       <span className="absolute top-[-15px] right-[-12px] text-white size-5 bg-red-600 rounded-full flex items-center justify-center text-[12px]">
                            {numberItems}
                          </span>:null}
                        </i>
                      </Link>
                      <Link to={`/wishlist`}>
                        <i className="fa-solid fa-heart text-black hover:text-red-600 cursor-pointer relative transition-all">
                          {count > 0? <span className="absolute top-[-15px] right-[-12px] text-white size-5 bg-red-600 rounded-full flex items-center justify-center text-[12px]">
                            {count}
                          </span>:null}
                        </i>
                      </Link>
                      <i className="fab fa-facebook text-black hover:text-blue-600 cursor-pointer transition-all"></i>
                      <i className="fab fa-linkedin text-black hover:text-blue-600 cursor-pointer transition-all"></i>
                      <i className="fab fa-youtube text-black hover:text-red-600 cursor-pointer transition-all"></i>
                      <i className="fab fa-tiktok text-black hover:text-black cursor-pointer transition-all"></i>
                      <i className="fab fa-twitter text-black hover:text-blue-400 cursor-pointer transition-all"></i>
                    </div>
                    <div className="links flex gap-3">
                      {userLogin != null ? (
                        <span
                          onClick={signout}
                          className="text-sm cursor-pointer btn"
                        >
                          SignOut
                        </span>
                      ) : (
                        <>
                          <NavLink to="login" className="text-sm btn">
                            Login
                          </NavLink>
                          <NavLink to="register" className="text-sm btn">
                            Register
                          </NavLink>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
