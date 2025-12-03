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

  // Defensive EcomLinks
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
  const shareUrl = `${import.meta.env.VITE_API_URL}/product/share/${Product._id}`;

  window.open(
    `https://wa.me/?text=${encodeURIComponent(shareUrl)}`,
    "_blank"
  );
};


  return (
    <Grid container px={2} spacing={2}>
      {/* Left: Images */}
      <Grid item xs={12} md={6}>
        <Box sx={{ position: "sticky", top: 70 }}>
          <CarouselImage images={Product?.ImageArray || []} />
        </Box>
      </Grid>

        <Grid size={{ xs: 12, md: 6.1 }}>
          <Grid>
            <Stack p={2}>
              <Stack
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  component="h1"
                  fontSize={{ xs: "1.1rem", sm: "1.25rem" }}
                  lineHeight="1.75rem"
                  fontWeight={400}
                  sx={{ fontFamily: "inter" }}
                >
                  {Product?.Title}
                </Typography>
                <IconButton sx={{ alignSelf: "flex-start" }}>
                  <ShareIcon onClick={handleShare} />
                </IconButton>
              </Stack>
              <Typography
                component="h3"
                fontSize={{ xs: "1rem", sm: "1rem" }}
                lineHeight="1.75rem"
                fontWeight={400}
                sx={{ fontFamily: "inter" }}
              >
                {Product?.Subtitle}
              </Typography>
              <Typography
                fontSize="14px"
                lineHeight="1.2rem"
                fontStyle={500}
                color="success"
              >
                Special Price
              </Typography>{" "}
              <Stack spacing={2}>
                <Stack
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack
                    flexDirection="row"
                    columnGap={1.6}
                    alignItems="center"
                  >
                    <Typography
                      fontSize={{ xs: "1.5rem", sm: "1.7rem" }}
                      fontWeight={500}
                      sx={{ fontFamily: "inter" }}
                    >
                      {/* ₹{Product.SellingPrice} */}
                      {sellingPrice}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      <del>{discountPrice}</del>
                    </Typography>
                    <Typography variant="body1" color="success">
                      {Product?.Discount}% off
                    </Typography>
                  </Stack>
                </Stack>
                <Stack flexDirection="row" columnGap={2}>
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
              {/* render Ecom link images defensively */}
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
          <Typography variant="h6" fontWeight={549}>
            Product Description
          </Typography>
          <Typography mt={1} variant="body1">
            {Product?.Description}
          </Typography>

          {/* Benefits */}
          <Stack
            direction="row"
            justifyContent="center"
            spacing={4}
            sx={{
              "& > :not(style)": {
                width: 200,
                height: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center"
              },
            }}
          >
            <Paper elevation={0}>
              <ShieldTwoToneIcon sx={{ fontSize: 40 }} />
              <Typography>Secure Order</Typography>
            </Paper>

            <Paper elevation={0}>
              <SpeedIcon sx={{ fontSize: 40 }} />
              <Typography>Fast Delivery</Typography>
            </Paper>

            <Paper elevation={0}>
              <FindReplaceIcon sx={{ fontSize: 40 }} />
              <Typography
                textAlign="center"
                lineHeight="1.15rem"
                sx={{ mt: "2px" }}
              >
                Easy Returns
              </Typography>
            </Paper>
          </Stack>



          {/* Product Info Table */}
          <Grid item xs={12} sx={{ p: 1 }}>
            <Typography variant="h6" fontWeight={549}>
              Product Information
            </Typography>
            <Box mt={1}>
              <ProductTable Product={Product} />
            </Box>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ProductDetailCard;
