import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import useProducts from "../../Hooks/useProducts";
import toast from "react-hot-toast";


export default function ProductDetails() {
  const [product, setproduct] = useState(null);
  const [relatedProdcts, setrelatedProdcts] = useState([])
  let { id ,category} = useParams();
  let {  addProductToCard, setnumberItems , numberItems} = useContext(CartContext);
  let {  isError, error, isLoading } = useProducts();
  const [loading, setloading] = useState(false)
  const [currentId, setcurrentId] = useState(0)


  async function addToCart(id){
    setcurrentId(id)
    setloading(true)
    let response = await addProductToCard(id)
  
    if(response.data.status == "success"){
      setnumberItems(numberItems + 1)
      setloading(false)
      toast.success(response.data.message)
      
    }
    else{
      setloading(false)
      toast.error(response.data.message)
  
    }
  
    
    }



  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  function getProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        

        setproduct(res.data.data);
      })
      .catch((res) => {
        toast.error("try again")
      });
  }



  function getAllProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((res) => {
      // res.data.data ==> arr 40 prod
     let related = res.data.data.filter((product) => product.category.name == category)
     setrelatedProdcts(related)
    });
  }

  useEffect(() => {
    getProduct(id);
    getAllProducts()
    document.title = "ProductDetails"
  }, [id,category]);

  return (
    <>
      <div  className="row items-center">
        <div  className="w-full md:w-1/4  py-3 ">
        <Slider  {...settings}>
          {product?.images.map((src)=> <img src={src} key={product?.id} className="w-full" />)}

        </Slider>
        </div>
        <div  className="md:w-3/4 p-4 md:text-left text-center">
          <h3 className="font-semibold capitalize text-xl">{product?.title}</h3>
          <h4 className="text-gray-700 my-4">{product?.description}</h4>
          <h4>{product?.category.name}</h4>
          {product != null ? <>
            <div className="flex justify-between p-3 my-5">
            <span>{product?.price} EGP</span>
            <span>
              <i className="fas fa-star text-yellow-500"></i>
              {product?.ratingsAverage}{" "}
            </span>
          </div>
          <button onClick={() => addToCart(product.id)} className="btn">
                {loading && currentId == product.id ? <i className="fas fa-spinner fa-spin"></i> : "Add To Cart"}
              </button>
          </>:<span className="loader mt-[200px]"></span>}
        </div>
      </div>

      <div className="row">
        {relatedProdcts.length > 0 ?  relatedProdcts.map((product) => (
          <div key={product.id} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6">

       <div className="product p-3 my-2">


       <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
              <img src={product.imageCover} className="w-full" alt="" />
              <h3 className=" text-emerald-600">{product.category.name}</h3>
              <h3 className="mb-1 font-semibold">{product.title.split(" ").slice(0,2).join(" ")}</h3>
              <div className="flex justify-between p-3">
                <span>{product.price} EGP</span>
                <span><i className="fas fa-star text-yellow-500"></i>{product.ratingsAverage} </span>
              </div>
       </Link>

              <button className="btn">Add To Cart</button>
            </div>
          </div>
          
        )) : null

}
      </div>
    </>
  );
}
