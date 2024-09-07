import React, { useEffect, useState } from "react";
import style from "./CategoriesSlider.module.css";
import axios from "axios";
import Slider from "react-slick";




export default function CategoriesSlider() {
  const [categories, setcategories] = useState([]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay:true,
    autoplaySpeed : 2000,
    responsive : [
      {
        breakpoint : 557,
        settings : {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint : 1023,
        settings : {
          slidesToShow: 6,
          slidesToScroll: 1,
        } 
      },
      {
        breakpoint : 823,
        settings : {
          slidesToShow: 5,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint : 767,
        settings : {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint : 715,
        settings : {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },

    ]
  };

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setcategories(res.data.data);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <h2 className="my-3 capitalize font-semibold text-gray-600">shop popular categories</h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id}>
            <img src={category.image} className="w-full md:h-[200px] h-[350px] object-cover" alt="" />
            <h4 className="text-center py-3">{category.name}</h4>
          </div>
        ))}
      </Slider>
    </>
  );
}
