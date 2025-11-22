import Typography from "@mui/material/Typography";
import React from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CarouselImage from "../components/CarouselImage";
import { useDispatch, useSelector } from "react-redux";
import { AddCart } from "../slice/CartSlice";
import { useNavigate } from "react-router-dom";
import ShareIcon from "@mui/icons-material/Share";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ShieldTwoToneIcon from "@mui/icons-material/ShieldTwoTone";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import SpeedIcon from "@mui/icons-material/Speed";
import ProductTable from "./ProductTable";
import Box from "@mui/material/Box";
import { toastMessage } from "../toastMessage";
import { ImageApi } from "../ImageApi";
const ProductDetailCard = ({ Product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUser } = useSelector((state) => state.UserState);
  const sellingPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0, // removes decimals
  }).format(Product?.SellingPrice);
  const discountPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0, // removes decimals
  }).format(Product?.MRP);

  const handleShare = async () => {
    try {
      // Check support
      if (!navigator.canShare || !navigator.canShare({ files: [] })) {
        alert("Sharing is not supported on this browser.");
        return;
      }

      // Fetch the image
      const response = await fetch(
        `${ImageApi}/product/${Product?.ImageArray?.[0]}`,
        {
          mode: "cors", // Ensure CORS works
        }
      );

      const blob = await response.blob();
      const file = new File([blob], "product.jpg", { type: blob.type });

      // Share data
      await navigator.share({
        title: Product?.Title,
        text: Product?.Title,
        files: [file],
      });
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <>
      <Grid container px={2}>
        <Grid size={{ xs: 12, md: 5.9 }}>
          <Box sx={{ position: "sticky", top: 70 }}>
            <CarouselImage images={Product?.ImageArray} />
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

                  <Button
                    variant="contained"
                    sx={{
                      alignSelf: "stretch",
                      flexGrow: 0.3,
                      fontSize: "0.90rem",
                    }}
                  >
                    Customize
                  </Button>
                </Stack>

                <Stack
                  flexDirection="row"
                  columnGap={2}
                  justifyContent="center"
                  sx={{
                    "& > :not(style)": {
                      width: 200,
                      height: 100,
                    },
                  }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography>Secure Order</Typography>
                    <ShieldTwoToneIcon sx={{ fontSize: "40px" }} />
                  </Paper>
                  <Paper
                    elevation={3}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    Fast Delivery
                    <SpeedIcon sx={{ fontSize: "40px" }} />
                  </Paper>
                  <Paper
                    elevation={3}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    100% Replacement warranty
                    <FindReplaceIcon sx={{ fontSize: "40px" }} />
                  </Paper>
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
              </Stack>
            </Stack>
            <Grid container>
              <Stack>
                <Typography variant="h6" fontWeight={549}>
                  Product Description
                </Typography>
                <div>
                  <Typography mt={1} variant="body1">
                    {Product?.Description}
                  </Typography>
                </div>
              </Stack>
              <Grid
                size={{ xs: 12, sm: 12, md: 12 }}
                sx={{ justifyContent: "center", padding: 1 }}
              >
                <Typography variant="h6" fontWeight={549}>
                  Product Information
                </Typography>
                <div style={{ marginTop: 10 }}>
                  <ProductTable Product={Product} />
                </div>
              </Grid>
              <Grid
                container
                size={{ xs: 12, sm: 6, md: 6 }}
                sx={{
                  width: "100%",
                  height: "100%",
                  p: 1,
                  flexDirection: "column",
                }}
              ></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductDetailCard;
