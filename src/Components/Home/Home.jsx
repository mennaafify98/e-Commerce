import React from "react";
import style from "./Home.module.css";
import RecentProducts from "../RecentProducts/RecentProducts"
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";
import Footer from "../Footer/Footer";



export default function Home() {

  return <>
  <MainSlider />
  <CategoriesSlider />
  <RecentProducts />
  <Footer />
  </>
}
