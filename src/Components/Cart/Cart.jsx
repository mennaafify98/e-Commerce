import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    getLoggedUserCart,
    updateCartProductQuantity,
    deleteCartItem,
    clearCart,
    setnumberItems,
    numberItems,
  } = useContext(CartContext);
  const [CartDetalis, setCartDetalis] = useState(null);

  async function getCartItems() {
    let response = await getLoggedUserCart();

    if (response.data.status == "success") {
      setCartDetalis(response.data.data);
    }
  }

  async function updateProduct(id, count) {
    if (count == 0) {
      deleteItem(id);
    } else {
      let response = await updateCartProductQuantity(id, count);
      if (response.data.status == "success") {
        toast.success("Product Updated Successfully");

        setCartDetalis(response.data.data);
      } else {
        toast.error("دوس تاني متيأسش");
      }
    }
  }

  async function deleteItem(productId) {
    let response = await deleteCartItem(productId);

    if (response.data.status == "success") {
      setnumberItems(numberItems - 1);
      setCartDetalis(response.data.data);
    }
  }

  async function clearAllCart() {
    let response = await clearCart();

    if (response.data.message == "success") {
      setCartDetalis(response.data.data);
    }
  }

  useEffect(() => {
    getCartItems();
    document.title = "Cart"
  }, []);
  return (
    <>
      {CartDetalis?.products?.length > 0 ? (
        <>
          <h2 className="text-center font-bold text-emerald-600 capitalize my-5 pb-2 text-2xl">
            Total Price: {CartDetalis?.totalCartPrice}
          </h2>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {CartDetalis?.products.map((product) => (
                  <tr
                    key={product.product.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateProduct(product.product.id, product.count - 1)
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <span>{product.count}</span>
                        </div>
                        <button
                          onClick={() =>
                            updateProduct(product.product.id, product.count + 1)
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price} LE
                    </td>
                    <td className="px-6 py-4">
                  <button className="bin-button" onClick={() => deleteItem(product.product.id)}>
                    <svg
                      className="bin-top"
                      viewBox="0 0 39 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line y1="5" x2="39" y2="5" stroke="white" strokeWidth="4"></line>
                      <line
                        x1="12"
                        y1="1.5"
                        x2="26.0357"
                        y2="1.5"
                        stroke="white"
                        strokeWidth="3"
                      ></line>
                    </svg>
                    <svg
                      className="bin-bottom"
                      viewBox="0 0 33 39"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask id="path-1-inside-1_8_19" fill="white">
                        <path
                          d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                        ></path>
                      </mask>
                      <path
                        d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                        fill="white"
                        mask="url(#path-1-inside-1_8_19)"
                      ></path>
                      <path d="M12 6L12 29" stroke="white" strokeWidth="4"></path>
                      <path d="M21 6V29" stroke="white" strokeWidth="4"></path>
                    </svg>
                  </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to={`/checkout`}>
              <button className="btn my-3">CheckOut</button>
            </Link>
            <button
              onClick={() => clearAllCart()}
              className="btn bg-emerald-600 p-3 rounded-lg text-white shadow-xl hover:bg-emerald-700 transition-colors"
            >
              Clear Cart
            </button>
          </div>
          <div className=" my-5 p-4 flex justify-end">
   
            
          </div>
        </>
      ) : (
        <i className="loader top-[50%]"></i>
        
      )}
      
    </>
  );
}
