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
  const [isLoading, setIsLoading] = useState(false);
  const [Product, setProduct] = useState({});
  const [similarProduct, setSimilarProduct] = useState([]);
  // const [category ,setCategory] = useState("")
  const FetchSingleProduct = async () => {
    setIsLoading(true);
    const data = await GetSingleProductApi(id);
    // setCategory(data.SubCategory)
    setIsLoading(false);
    setProduct(data);
    FetchSimilarProduct(data.Category);
  };

  const FetchSimilarProduct = async (category) => {
    const data = await SimilarProductApi(category, id);
    setSimilarProduct(data);
  };

  useEffect(() => {
    FetchSingleProduct();
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
  }, [id]);
  // useEffect(()=>{FetchSimilarProduct()},[category])
  return (
    <>
      {isLoading ? (
        <PageLoading load={isLoading} />
      ) : (
        <>
          <ProductDetailCard Product={Product} />

          {similarProduct.length > 0 ? (
            <SimilarProducts
              similarProduct={similarProduct}
              setIsLoading={setIsLoading}
            />
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
