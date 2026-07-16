import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";

const SimilarProducts = ({ similarProduct = [], setIsLoading }) => {
  const handleProductClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsLoading(true);
  };

  return (
    <Box component="section" sx={{ px: { xs: 2, sm: 4 }, py: 4 }}>
      <Typography fontSize={22} fontWeight={500} fontFamily="Inter" mb={2}>
        Similar Products
      </Typography>

      <Grid
        container
        direction="row"
        flexWrap="wrap"
        columnGap={2}
        rowGap={4}
        justifyContent="center"
        alignItems="center"
      >
        {similarProduct && similarProduct.length > 0 ? (
          similarProduct.map((product) => (
            <Grid
              key={product._id || product.id || product.title}
              size={{ xs: 5.7, sm: 5.4, md: 3.7, lg: 2.81 }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "stretch",
              }}
              onClick={handleProductClick}
            >
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          <Grid size={{ xs: 12 }}>
            <Typography variant="body2" color="text.secondary">
              No similar products found.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default SimilarProducts;
