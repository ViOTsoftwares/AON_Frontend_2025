import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import ProductCard from "./ProductCard";

const SimilarProducts = ({ similarProduct = [], setIsLoading }) => {
  const handleProductClick = (product) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsLoading(true);
    // navigate or update state here if needed
  };

  return (
    <Box component="section" sx={{ px: { xs: 2, sm: 4 }, py: 4 }}>
      <Typography fontSize={22} fontWeight={500} fontFamily="Inter" mb={2}>
        Similar Products
      </Typography>

      <Grid container spacing={2}>
        {similarProduct && similarProduct.length > 0 ? (
          similarProduct.map((product) => (
            <Grid
              item
              key={product._id || product.id || product.title} // ensure unique key
              xs={5.7}
              sm={5.4}
              md={3.7}
              lg={2.81}// you can keep integers; md 3 works well
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  alignContent: "center",

                  width: "100%",       // ✅ IMPORTANT
                  maxWidth: {
                    xs: 180,
                    sm: 180,
                    md: 220,
                    lg: 260,
                  },
                }}
              >
                <ProductCard product={product} />
              </Box>


            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
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
