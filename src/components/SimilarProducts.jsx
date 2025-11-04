import React, { useState } from "react";
import { Grid, Typography, IconButton, Stack } from "@mui/material";
import ProductCard from "./ProductCard"; // your card component
import Carousel from "./Carousel";

const SimilarProducts = ({ similarProduct, setIsLoading }) => {
  const handleProductClick = (product) => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
    setIsLoading(true);
  };

  return (
    <Grid p={4} position="relative">
      <Typography fontSize="22px" fontWeight={500} fontFamily="Inter" mb={2}>
        Similar Products
      </Typography>
      <Carousel dots={false} infinite={false} sm={1} md={3} lg={4} xl={5}>
        {similarProduct?.length > 0 &&
          similarProduct.map((product, i) => (
            <ProductCard product={product} maxWidth="96%" similar={true} />
          ))}
      </Carousel>
    </Grid>
  );
};

export default SimilarProducts;
