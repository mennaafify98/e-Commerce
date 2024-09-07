import React, { useContext, useEffect, useState } from 'react'
import style from "./WishList.module.css"
import { WishListContext } from '../../Context/WishListContext'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function WishList() {
 let {getAllWishList,count,setCount} = useContext(WishListContext)
  const [allList, setAllList] = useState([])
  const [loading, setloading] = useState(false);


  let { addProductToCard, setnumberItems, numberItems } =
    useContext(CartContext);
  let { removeProductFromWishList } = useContext(WishListContext);
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
  async function getWishList(){
    let {data} = await getAllWishList()
    // console.log(data.count);
    setAllList(data.data)
  }

  async function removeFromWishList(id) {
    let {data} = await removeProductFromWishList(id)
    // console.log(data);
    if(data.status == "success"){
      setCount(count - 1)
      toast.success(data.message)
    }else{
      toast.error(data.message)
    }
  }



  useEffect(() => {
    getWishList()
    document.title = "Wishlist"
  } , [allList])
  
  
  return <>
      {allList.length > 0 ? <div className="row">
        {allList.map((product) => (
          <div key={product.id} className="w-full  md:w-1/2 lg:w-1/4 xl:w-1/6">
            <div className="product drop-shadow-md  transition-all hover:drop-shadow-2xl p-4 my-3 relative">
              <Link
                to={`ProductDetails/${product.id}/${product.category.name}`}
              >
                <img src={product.imageCover} className="w-full" alt="" />
              </Link>

              <h3 className=" text-emerald-600 py-1 flex justify-between">
                {product.category.name}
                <button className="deleteButton container2" onClick={() => removeFromWishList(product.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 50 59"
                    className="bin"
                  >
                    <path
                      fill="#B5BAC1"
                      d="M0 7.5C0 5.01472 2.01472 3 4.5 3H45.5C47.9853 3 50 5.01472 50 7.5V7.5C50 8.32843 49.3284 9 48.5 9H1.5C0.671571 9 0 8.32843 0 7.5V7.5Z"
                    ></path>
                    <path
                      fill="#B5BAC1"
                      d="M17 3C17 1.34315 18.3431 0 20 0H29.3125C30.9694 0 32.3125 1.34315 32.3125 3V3H17V3Z"
                    ></path>
                    <path
                      fill="#B5BAC1"
                      d="M2.18565 18.0974C2.08466 15.821 3.903 13.9202 6.18172 13.9202H43.8189C46.0976 13.9202 47.916 15.821 47.815 18.0975L46.1699 55.1775C46.0751 57.3155 44.314 59.0002 42.1739 59.0002H7.8268C5.68661 59.0002 3.92559 57.3155 3.83073 55.1775L2.18565 18.0974ZM18.0003 49.5402C16.6196 49.5402 15.5003 48.4209 15.5003 47.0402V24.9602C15.5003 23.5795 16.6196 22.4602 18.0003 22.4602C19.381 22.4602 20.5003 23.5795 20.5003 24.9602V47.0402C20.5003 48.4209 19.381 49.5402 18.0003 49.5402ZM29.5003 47.0402C29.5003 48.4209 30.6196 49.5402 32.0003 49.5402C33.381 49.5402 34.5003 48.4209 34.5003 47.0402V24.9602C34.5003 23.5795 33.381 22.4602 32.0003 22.4602C30.6196 22.4602 29.5003 23.5795 29.5003 24.9602V47.0402Z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                    <path fill="#B5BAC1" d="M2 13H48L47.6742 21.28H2.32031L2 13Z"></path>
                  </svg>

                  <span className="tooltip">Delete</span>
                </button>

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
                  <i className="fas fa-spinner fa-spin relative left-16"></i>
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
      </div> : <i className='loader top-[40%]'></i>}
  </>
}
