import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

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
    window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  return (
    <Grid container spacing={2} px={2} alignItems="flex-start">
      {/* Left: Images - fixed max width and fixed image box to avoid layout shifts */}
      <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}>
        <Box
          sx={{
            pl: { md: 8 },
            width: "100%",
            maxWidth: { xs: 520, md: 520 }, // constrain so image doesn't blow layout
          }}
        >
          {/* CarouselImage should itself be responsive; we wrap to enforce max width */}
          <Box
            sx={{
              width: "100%",
              height: { xs: 280, sm: 340, md: 500 }, // consistent visible image area per breakpoint
              overflow: "hidden",
              borderRadius: 1,
              bgcolor: "background.paper",
            }}
          >
            {/* If CarouselImage accepts style props, pass them — otherwise wrap the image container */}
            <CarouselImage images={Product?.ImageArray || []} />
          </Box>
        </Box>
      </Grid>

      {/* Right: Details */}
      <Grid
        alignContent={"flex-end"}
        item
        xs={12}
        md={6}
        sx={{
           ml: "auto",
           pr: {md:15},
          width: "100%",
          // ensure details column doesn't shrink to tiny width
          maxWidth: { xs: "100%", md: "680px" },
          boxSizing: "border-box",
        }}
      >
        <Stack spacing={2} p={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box sx={{ flex: 1, pr: 1 }}>
              <Typography
                component="h1"
                fontSize={{ xs: "1.05rem", sm: "1.25rem" }}
                lineHeight="1.5rem"
                fontWeight={600}
                sx={{
                  fontFamily: "Inter, sans-serif",
                  // clamp title to avoid pushing layout
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
                sx={{ fontFamily: "Inter, sans-serif", color: "text.secondary", mt: 0.5 }}
              >
                {Product?.Subtitle}
              </Typography>
            </Box>

            <IconButton aria-label="share product" onClick={handleShare} size="large" sx={{ ml: 1 }}>
              <ShareIcon />
            </IconButton>
          </Stack>

          <Typography fontSize="14px" lineHeight="1.2rem" fontWeight={600} color="success.main">
            Special Price
          </Typography>

          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={1.6} alignItems="center">
                <Typography
                  fontSize={{ xs: "1.4rem", sm: "1.6rem" }}
                  fontWeight={700}
                  sx={{ fontFamily: "Inter, sans-serif" }}
                >
                  {sellingPrice}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  <del>{discountPrice}</del>
                </Typography>

                <Typography variant="body2" color="success.main">
                  {Product?.Discount ? `${Product.Discount}% off` : ""}
                </Typography>
              </Stack>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ p: 1.4, fontSize: "1rem" }}
                onClick={() => dispatch(AddCart({ ...Product, Qty: 1 }))}
              >
                ADD TO CART
              </Button>

              <Button
                fullWidth
                variant="outlined"
                size="large"
                sx={{ p: 1.4, fontSize: "1rem" }}
                onClick={() => {
                  if (isUser) {
                    navigate("/checkout", { state: { id: Product._id } });
                  } else {
                    toastMessage("Please login to continue", "warning");
                  }
                }}
              >
                BUY NOW
              </Button>
            </Stack>

            <Stack direction="row" justifyContent="flex-end" alignItems="center" gap={2} sx={{ mt: 1 }}>
              {EcomLinks?.oneImage && (
                <IconButton
                  component="a"
                  href={EcomLinks.oneLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ p: 0 }}
                >
                  <Box
                    component="img"
                    src={`${ImageApi}/product/${EcomLinks.oneImage}`}
                    alt="social-1"
                    sx={{ width: 40, height: "auto", objectFit: "contain" }}
                  />
                </IconButton>
              )}

              {EcomLinks?.twoImage && (
                <IconButton
                  component="a"
                  href={EcomLinks.twoLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ p: 0 }}
                >
                  <Box
                    component="img"
                    src={`${ImageApi}/product/${EcomLinks.twoImage}`}
                    alt="social-2"
                    sx={{ width: 40, height: "auto", objectFit: "contain" }}
                  />
                </IconButton>
              )}

              {EcomLinks?.threeImage && (
                <IconButton
                  component="a"
                  href={EcomLinks.threeLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ p: 0 }}
                >
                  <Box
                    component="img"
                    src={`${ImageApi}/product/${EcomLinks.threeImage}`}
                    alt="social-3"
                    sx={{ width: 40, height: "auto", objectFit: "contain" }}
                  />
                </IconButton>
              )}

              {EcomLinks?.fourImage && (
                <IconButton
                  component="a"
                  href={EcomLinks.fourLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ p: 0 }}
                >
                  <Box
                    component="img"
                    src={`${ImageApi}/product/${EcomLinks.fourImage}`}
                    alt="social-4"
                    sx={{ width: 40, height: "auto", objectFit: "contain" }}
                  />
                </IconButton>
              )}
            </Stack>
          </Stack>

          {/* Description */}
          <Box>
            <Typography variant="h6" fontWeight={600}>
              Product Description
            </Typography>
            <Typography mt={1} variant="body1" sx={{ color: "text.secondary" }}>
              {Product?.Description}
            </Typography>
          </Box>

          {/* Benefits */}
          <Stack
            direction="row"
            justifyContent="center"
            spacing={3}
            sx={{
              "& > :not(style)": {
                width: { xs: 120, sm: 160, md: 200 },
                height: { xs: 80, sm: 90, md: 100 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
              },
            }}
          >
            <Paper elevation={0}>
              <ShieldTwoToneIcon sx={{ fontSize: 34 }} />
              <Typography variant="body2">Secure Order</Typography>
            </Paper>

            <Paper elevation={0}>
              <SpeedIcon sx={{ fontSize: 34 }} />
              <Typography variant="body2">Fast Delivery</Typography>
            </Paper>

            <Paper elevation={0}>
              <FindReplaceIcon sx={{ fontSize: 34 }} />
              <Typography variant="body2">Easy Returns</Typography>
            </Paper>
          </Stack>

          {/* Product Info Table - use Box not Grid item to avoid nested Grid misuse */}
          <Box sx={{ p: 0 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
              Product Information
            </Typography>
            <Box>
              <ProductTable Product={Product} />
            </Box>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ProductDetailCard;
