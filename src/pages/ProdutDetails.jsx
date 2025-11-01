import { Box, Stack, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductDetailCard from "../components/ProductDetailCard";
import Carousel from "../components/Carousel";
import ProductTable from "../components/ProductTable";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import { GetSingleProductApi, SimilarProductApi } from "../Api_Action";
import PageLoading from "../components/PageLoading";
import SimilarProducts from "../components/SimilarProducts";
 
const ProductDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [Product, setProduct] = useState({});
  const [similarProduct, setSimilarProduct] = useState([]);
  // const [category ,setCategory] = useState("")
  const FetchSingleProduct = async () => {
    const data = await GetSingleProductApi(id);
    console.log("------>>", data);
    // setCategory(data.SubCategory)
    setIsLoading(false);
    setProduct(data);
    FetchSimilarProduct(data.SubCategory);
  };
  console.log("------>>", Product);
  const FetchSimilarProduct = async (category) => {
    const data = await SimilarProductApi(category, id);
    setSimilarProduct(data);
  };
  // console.log("----->>>",similarProduct);

  useEffect(() => {
    FetchSingleProduct();
  }, [id]);
  // useEffect(()=>{FetchSimilarProduct()},[category])
  return (
    <>
      {isLoading ? (
        <PageLoading load={isLoading} />
      ) : (
        <>
          <ProductDetailCard Product={Product} />
         
          <SimilarProducts
            similarProduct={similarProduct}
            setIsLoading={setIsLoading}
          />
        </>
      )}
    </>
  );
};

export default ProductDetails;
