import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { AddCart } from "../slice/CartSlice";
import { toastMessage } from "../toastMessage";


import ShareIcon from "@mui/icons-material/Share";
import ShieldTwoToneIcon from "@mui/icons-material/ShieldTwoTone";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import SpeedIcon from "@mui/icons-material/Speed";

import CarouselImage from "../components/CarouselImage";
import ProductTable from "./ProductTable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
    const shareUrl = `${import.meta.env.VITE_API_URL}/product/share/${
      Product?._id
    }`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const handleAddToCart = () => {
  if (!Product?._id) return;
  dispatch(AddCart({ ...Product, Qty: 1 }));
  toastMessage("Added to cart", "success");
};

const handleBuyNow = () => {
  if (!Product?._id) return;

  if (isUser) {
    navigate("/checkout", { state: { id: Product._id } });
  } else {
    toastMessage("Please login to continue", "warning");
  }
};


  return (
    <Grid
      container
      columnSpacing={{ xs: 0, md: 4 }}
      sx={{
        px: { xs: 1, md: 2 },
        margin: 0, // 🔥 kill negative margins
      }}
    >
      {/* ================= LEFT : IMAGE ================= */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          alignSelf: "flex-start", // 🔥 REQUIRED for sticky in Grid
        }}
      >
        <Box
          sx={{
            mt: 1.4,
            ml: { xs: 0.58, md: 0 },
            width: "100%",

            position: { md: "sticky" },
            top: { md: 120 }, 

        
            maxHeight: { md: "calc(100vh - 140px)" }, // viewport limit
            overflow: { md: "hidden" }, // contain image

          
          }}
        >
          <CarouselImage images={Product?.ImageArray || []} />
        </Box>
      </Grid>

      {/* ================= RIGHT : DETAILS ================= */}
      <Grid
        item
        size={{ xs: 12, md: 6 }}
        mb={3}
        display="flex"
        justifyContent={{ xs: "center", md: "flex-start" }}
        sx={{ height: { xs: "default", md: "100vh" }, overflowY: "auto" }}
      >
        <Stack
          spacing={2}
          sx={{ mt: 4.4, width: "100%" }}
          alignItems={{ xs: "center", md: "flex-start" }}
        >
          {/* ===== TITLE + PRICE WRAPPER ===== */}

          <Box
            sx={{
              width: "100%",
              px: { xs: 2.3, md: 0 }, // 👈 XS padding only
              // py: { xs: 0.5, md: 0 },   // optional vertical spacing
            }}
          >
            {/* TITLE & SHARE */}
            <Stack
              direction="row"
              width="100%"
              justifyContent={{ xs: "center", md: "space-between" }}
              alignItems="flex-start"
            >
              <Box sx={{ flex: 1, pr: { md: 2 } }}>
                <Typography
                  component="h1"
                  fontSize={{ xs: "1.45rem", sm: "1.25rem" }}
                  lineHeight="1.5rem"
                  fontWeight={600}
                  textAlign="left"
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
                  textAlign="left"
                  sx={{ color: "text.secondary", mt: 0.5 }}
                >
                  {Product?.Subtitle}
                </Typography>
              </Box>

              <IconButton onClick={handleShare} sx={{ ml: { xs: 1, md: 0 } }}>
                <ShareIcon />
              </IconButton>
            </Stack>

            {/* PRICE */}
            <Box mt={1}>
              <Typography
                fontSize="14px"
                fontWeight={600}
                color="success.main"
                textAlign="left"
              >
                Special Price
              </Typography>

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
            </Box>
          </Box>

          {/* BUTTONS */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            width="100%"
            alignItems="center"
          >
            <Box sx={{ width: { xs: "90%", sm: "100%" }, mx: "auto" }}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleAddToCart}
                sx={{
                  height: 55,
                  fontWeight: 600,
                  borderRadius: "10px",

                  background: "linear-gradient(129deg,rgba(104, 30, 0, 0.84),rgba(94, 0, 5, 0.88),rgba(170, 68, 0, 0.84))",
                  boxShadow: "0 4px 12px rgba(25,118,210,0.35)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(135deg, #1565c0 0%, #1e88e5 100%)",
                    boxShadow: "0 6px 16px rgba(25,118,210,0.45)",
                    transform: "translateY(-1px)",
                  },
                }}
      
              >
                ADD TO CART
              </Button>
            </Box>

            <Box sx={{ width: { xs: "90%", sm: "100%" }, mx: "auto" }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleBuyNow}
                sx={{
                  height: 55,
                  fontWeight: 600,
                  borderRadius: "10px",
                  background: "linear-gradient(129deg,rgba(104, 29, 0, 0.22),rgba(94, 0, 5, 0.26),rgba(170, 68, 0, 0.23))",
                  boxShadow: "0 4px 12px rgba(25,118,210,0.35)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#fff",
                    background: "linear-gradient(135deg, #1565c0 0%, #1e88e5 100%)",
                    boxShadow: "0 6px 16px rgba(25,118,210,0.45)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                BUY NOW
              </Button>
            </Box>
          </Stack>

          {/* ECOM ICONS */}
         <Stack
  direction="row"
  justifyContent={{ xs: "center", md: "flex-end" }}
  gap={2}
   sx={{ pl: { xs: 3.6 } }}
  width="100%"
>
  {Object.entries(EcomLinks).map(([key, value], i) => {
    if (key.includes("Image")) {
      const linkKey = key.replace("Image", "Link");
      const link = EcomLinks[linkKey];

      return link ? (
      <IconButton
  key={i}
  component="a"
  href={link}
  target="_blank"
  rel="noopener noreferrer"
  sx={{
    p: 0,
    width: 48,
    height: 48,
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    mr: 3,
    // ml:{ xs: 1, md: 0},
    justifyContent: "center",
    backgroundColor: "#f5f5f5", // 👈 helps transparent images
    transition: "all 0.25s ease",
    boxShadow: "0 0 12px rgba(197, 30, 0, 0.77)",

    "&:hover": {
      transform: "scale(1.08)",
      boxShadow: "0 0 12px rgba(167, 0, 92, 0.55)",
    },
  }}
>
  <Box
    component="img"
    src={`${ImageApi}/product/${value}`}
    sx={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      transform: "scale(1.15)",   // 🔥 IMPORTANT: fills empty space
      transition: "transform 0.25s ease, filter 0.25s ease",

      "&:hover": {
        filter: "drop-shadow(0 0 6px rgba(184, 3, 3, 0.82))",
      },
    }}
  />
</IconButton>


      ) : null;
    }
    return null;
  })}
</Stack>



          {/* DESCRIPTION */}
          <Box width="100%" px={{ xs: 2.7, md: 0 }}>
            <Typography
              variant="h6"
              fontWeight={600}
              textAlign={{ xs: "left", md: "left" }}
            >
              Product Description
            </Typography>
            <Typography
              mt={1}
              color="text.secondary"
              textAlign={{ xs: "left", md: "left" }}
            >
              {Product?.Description}
            </Typography>
          </Box>

          {/* BENEFITS */}
          <Stack
            direction="row"
            justifyContent="center"
            spacing={3}
            width="100%"
          >
            <Paper elevation={0} sx={{ textAlign: "center" }}>
              <ShieldTwoToneIcon fontSize="large" />
              <Typography variant="body2">Secure Order</Typography>
            </Paper>
            <Paper elevation={0} sx={{ textAlign: "center" }}>
              <SpeedIcon fontSize="large" />
              <Typography variant="body2">Fast Delivery</Typography>
            </Paper>
            <Paper elevation={0} sx={{ textAlign: "center" }}>
              <FindReplaceIcon fontSize="large" />
              <Typography variant="body2">Easy Installing</Typography>
            </Paper>
          </Stack>

          {/* PRODUCT INFO */}
          <Box width="100%">
            <Typography
              variant="h6"
              fontWeight={600}
              textAlign={{ xs: "center", md: "left" }}
            >
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