import React, { useEffect, useState } from 'react'
import style from "./Brands.module.css"
import axios from 'axios'
import Footer from "../Footer/Footer"
export default function Brands() {
  const [allBrands, setallBrands] = useState([])

 async function getAllBrands(){
   let response= await  axios.get(`https://ecommerce.routemisr.com/api/v1/brands`) 
   setallBrands(response.data.data)
  }

  useEffect(()=>{
    getAllBrands()
    document.title = "Brands"
  },[])
  return <>
    {allBrands.length > 0 ?    <div className="row">
        {allBrands?.map((brand) => (
          <div key={brand._id} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6 app">
            <div className="product drop-shadow-md  transition-all hover:drop-shadow-2xl p-3 my-2">
            
                <img src={brand?.image} className="w-full " alt="" />
              
              <h3 className="mb-1  font-semibold mt-4 text-center">
                  {brand?.name}
                </h3>
            </div>
          </div>
        ))}
      </div> : <i className='loader md:mt-72 mt-60'></i>}
        {allBrands.length > 0 ? <Footer /> : null}
  </>
}
