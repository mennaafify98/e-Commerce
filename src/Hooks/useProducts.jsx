import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useProducts() {



    function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let productInfo  = useQuery({
    queryKey: ["recentproduct"],
    queryFn: getProducts,
    staleTime : 7000,
    // retry : 3,
    // retryDelay : 6000,
    // refetchInterval : 2000,
    // refetchIntervalInBackground : true,
    // refetchOnWindowFocus : true,
    // gcTime : 4000,
    // select : (data)=> data.data.data,
  });



  return productInfo;
}
