import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
// import "../Animations/ButtonGlow1.css";



import ShareIcon from "@mui/icons-material/Share";
import ShieldTwoToneIcon from "@mui/icons-material/ShieldTwoTone";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import SpeedIcon from "@mui/icons-material/Speed";

import CarouselImage from "../components/CarouselImage";
import ProductTable from "./ProductTable";
import { useDispatch, useSelector } from "react-redux";
import { AddCart } from "../slice/CartSlice";
import { useNavigate } from "react-router-dom";
import { toastMessage } from "../toastMessage";
import { ImageApi } from "../ImageApi";

const ProductDetailCard = ({ Product = {} }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUser } = useSelector((state) => state.UserState || {});

  const EcomLinks = Product?.EcomLinks || {};

  const sellingPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Product?.SellingPrice || 0);

  const discountPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Product?.MRP || 0);

  const handleShare = () => {
    const shareUrl = `${import.meta.env.VITE_API_URL}/product/share/${Product?._id}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  return (
    <Grid
      container
      spacing={4}
      sx={{
        px: { xs: 1, md: 6 },   // ✅ SAFE LEFT SPACE
        width: "100%",
        boxSizing: "border-box",
      }}
      alignItems={{ xs: "center", md: "flex-start" }}
      ml={{ xs: "20", md: "0" }}
    >
      {/* ================= LEFT : IMAGE ================= */}
      <Grid item xs={12} md={6} >
        <Box
          sx={{
            mt: 1.4,
            width: "100%",
            
            overflow: "hidden", // ✅ prevents carousel overflow
          }}
        >
          <CarouselImage images={Product?.ImageArray || []} />
        </Box>
      </Grid>

      {/* ================= RIGHT : DETAILS ================= */}
      <Grid item xs={12} md={6} width={{ xs: "auto", md: "45%" }} mb={3}  display={"flex"}
      alignContent={{ xs: "center", md: "flex-start" }} >
        <Stack spacing={2} sx={{ mt: 4.4, width: "100%" }}>
          {/* TITLE & SHARE */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box sx={{ flex: 1, pr: 2 }}>
              <Typography
                component="h1"
                fontSize={{ xs: "1.05rem", sm: "1.25rem" }}
                lineHeight="1.5rem"
                fontWeight={600}
                sx={{
                  fontFamily: "Inter, sans-serif",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {Product?.Title}
              </Typography>

              <Typography
                component="h3"
                fontSize={{ xs: "0.95rem", sm: "1rem" }}
                lineHeight="1.4rem"
                fontWeight={400}
                sx={{ color: "text.secondary", mt: 0.5 }}
              >
                {Product?.Subtitle}
              </Typography>
            </Box>

            <IconButton onClick={handleShare}>
              <ShareIcon />
            </IconButton>
          </Stack>

          <Typography fontSize="14px" fontWeight={600} color="success.main">
            Special Price
          </Typography>

          {/* PRICE */}
          <Stack direction="row" spacing={1.6} alignItems="center">
            <Typography fontSize="1.6rem" fontWeight={700}>
              {sellingPrice}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <del>{discountPrice}</del>
            </Typography>
            {Product?.Discount && (
              <Typography variant="body2" color="success.main">
                {Product.Discount}% off
              </Typography>
            )}
          </Stack>

          {/* BUTTONS */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} width="100%">
            <Box className="glow-on-hover" sx={{ width: "100%" }}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  height: 50,
                  fontWeight: 600,
                  borderRadius: "10px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                ADD TO CART
              </Button>
            </Box>

            <Box className="glow-on-hover" sx={{ width: "100%" }}>
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  height: 50,
                  fontWeight: 600,
                  borderRadius: "10px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                BUY NOW
              </Button>
            </Box>
          </Stack>


          {/* ECOM ICONS */}
          <Stack direction="row" justifyContent="flex-end" gap={2}>
            {Object.values(EcomLinks).map((img, i) =>
              img ? (
                <IconButton key={i} sx={{ p: 0 }}>
                  <Box
                    component="img"
                    src={`${ImageApi}/product/${img}`}
                    sx={{ width: 40 }}
                  />
                </IconButton>
              ) : null
            )}
          </Stack>

          {/* DESCRIPTION */}
          <Box>
            <Typography variant="h6" fontWeight={600}>
              Product Description
            </Typography>
            <Typography mt={1} color="text.secondary">
              {Product?.Description}
            </Typography>
          </Box>

          {/* BENEFITS */}
          <Stack direction="row" justifyContent="center" spacing={3}>
            <Paper elevation={0}>
              <ShieldTwoToneIcon fontSize="large" />
              <Typography variant="body2">Secure Order</Typography>
            </Paper>
            <Paper elevation={0}>
              <SpeedIcon fontSize="large" />
              <Typography variant="body2">Fast Delivery</Typography>
            </Paper>
            <Paper elevation={0}>
              <FindReplaceIcon fontSize="large" />
              <Typography variant="body2">Easy Installing</Typography>
            </Paper>
          </Stack>

          {/* PRODUCT INFO */}
          <Box>
            <Typography variant="h6" fontWeight={600}>
              Product Information
            </Typography>
            <ProductTable Product={Product} />
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ProductDetailCard;
