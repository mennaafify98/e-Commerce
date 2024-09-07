import React, { useContext, useEffect, useState } from "react";
import style from "./Products.module.css";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import useProducts from "../../Hooks/useProducts";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
import Footer from "../../Components/Footer/Footer"
export default function Products() {
  let { data, isError, error, isLoading } = useProducts();
  let { addProductToCard, setnumberItems, numberItems } =
    useContext(CartContext);
  let { addToWishList,count,setCount } = useContext(WishListContext);
  const [loading, setloading] = useState(false);
  const [currentId, setcurrentId] = useState(0);
  async function addToCart(id) {
    setcurrentId(id);
    setloading(true);
    let response = await addProductToCard(id);

    if (response.data.status == "success") {
      setnumberItems(numberItems + 1);
      setloading(false);
      toast.success(response.data.message);
    } else {
      setloading(false);
      toast.error(response.data.message);
    }
  }
  async function addToWish(id) {
    let { data } = await addToWishList(id);
    //  console.log(data);
    if (data.status == "success") {
      setCount(count + 1)
      toast.success(data.message);
    }
  }
  useEffect(() => {
    document.title = "Product"
  } ,[])

  if (isError) {
    return <h3>{error}</h3>;
  }

  if (isLoading) {
    return <span className="loader top-[120%] "></span>;
  }

  return (
    <>
      <div className="row">
        {data?.data?.data.map((product) => (
          <div key={product.id} className="w-full  md:w-1/2 lg:w-1/4 xl:w-1/6">
            <div className="product p-4 my-3 drop-shadow-md  transition-all hover:drop-shadow-2xl relative">
              <Link
                to={`/ProductDetails/${product.id}/${product.category.name}`}
              >
                <img src={product.imageCover} className="w-full" alt="" />
              </Link>

              <h3 className=" text-emerald-600 py-3 flex justify-between">
                {product.category.name}
                <label className="container2 ">
                  <input
                    type="checkbox"
                    onClick={() => addToWish(product.id)}
                  />
                  <svg
                    id="Layer_1"
                    version="1.0"
                    viewBox="0 0 24 24"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"></path>
                  </svg>
                </label>
              </h3>
              <h3 className="mb-1 font-semibold ">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h3>
              <div className="flex justify-between p-3">
                <span>{product.price} EGP</span>
                <span>
                  <i className="fas fa-star text-yellow-500"></i>
                  {product.ratingsAverage}
                </span>
              </div>

              <button onClick={() => addToCart(product.id)}>
                {loading && currentId == product.id ? (
                  <i className="fas fa-spinner fa-spin relative left-[130px] md:left-[80px]" ></i>
                ) : (
                  <div
                    data-tooltip={`${product.price} EGP`}
                    className="button md:w-[170px]"
                  >
                    <div className="button-wrapper">
                      <div className="text">Add To Cart</div>
                      <span className="icon">
                        <svg
                          viewBox="0 0 16 16"
                          className="bi bi-cart2"
                          fill="currentColor"
                          height={16}
                          width={16}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );

}
