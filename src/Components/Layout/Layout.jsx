import React from "react";
import style from "./Layout.module.css";
import Navbar from "../Navber/Navber";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-16 md:py-10">
        <Outlet />
      </div>
    </>
  );
}
