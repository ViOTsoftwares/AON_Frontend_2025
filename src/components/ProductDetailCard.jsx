import Typography from "@mui/material/Typography";
import React from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

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
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";




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
  const productTitle = Product?.Title || "Check this product";
  const productLink = window.location.href;
  const imageUrl = `${ImageApi}/product/${Product?.ImageArray?.[0]}`;

  try {
    // -------------------------------
    // 1. File share support (Android)
    // -------------------------------
    if (navigator.canShare) {
      try {
        const response = await fetch(imageUrl, { mode: "cors" });
        const blob = await response.blob();
        const file = new File([blob], "product.jpg", { type: blob.type });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: productTitle,
            text: productTitle,
            files: [file],
          });
          return;
        }
      } catch (err) {
        console.warn("Image fetch or file share failed, fallback will run.");
      }
    }

    // -------------------------------
    // 2. Normal share (iOS + Android)
    // -------------------------------
    if (navigator.share) {
      await navigator.share({
        title: productTitle,
        text: productTitle,
        url: productLink,
      });
      return;
    }

    // -------------------------------
    // 3. Desktop fallback: Copy to clipboard
    // -------------------------------
    await navigator.clipboard.writeText(`${productTitle}\n${productLink}`);
    alert("Link copied to clipboard!");

  } catch (err) {
    console.error("Share failed:", err);
    alert("Sharing failed. Try manually copying the link.");
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
                
                <Stack
  direction="row"
  justifyContent="flex-end"
  alignItems="center"
  gap={3}
  sx={{ mt: 2 }}
>
  {[
    { img: "https://assets.upstox.com/content/assets/images/cms/202451/Amazon%20logo.png", url: "https://www.amazon.in/?&tag=googhydrabk1-21&ref=pd_sl_5szpgfto9i_e&adgrpid=155259813593&hvpone=&hvptwo=&hvadid=674893540034&hvpos=&hvnetw=g&hvrand=13918069511242392061&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1007812&hvtargid=kwd-64107830&hydadcr=14452_2316413&gad_source=1" },
    
    { img: "https://assets.upstox.com/content/assets/images/cms/202451/Amazon%20logo.png", url: "https://www.amazon.in/?&tag=googhydrabk1-21&ref=pd_sl_5szpgfto9i_e&adgrpid=155259813593&hvpone=&hvptwo=&hvadid=674893540034&hvpos=&hvnetw=g&hvrand=13918069511242392061&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1007812&hvtargid=kwd-64107830&hydadcr=14452_2316413&gad_source=1" },

    
    { img: "https://assets.upstox.com/content/assets/images/cms/202451/Amazon%20logo.png", url: "https://www.amazon.in/?&tag=googhydrabk1-21&ref=pd_sl_5szpgfto9i_e&adgrpid=155259813593&hvpone=&hvptwo=&hvadid=674893540034&hvpos=&hvnetw=g&hvrand=13918069511242392061&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1007812&hvtargid=kwd-64107830&hydadcr=14452_2316413&gad_source=1" },
    { img: "https://assets.upstox.com/content/assets/images/cms/202451/Amazon%20logo.png", url: "https://www.amazon.in/?&tag=googhydrabk1-21&ref=pd_sl_5szpgfto9i_e&adgrpid=155259813593&hvpone=&hvptwo=&hvadid=674893540034&hvpos=&hvnetw=g&hvrand=13918069511242392061&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1007812&hvtargid=kwd-64107830&hydadcr=14452_2316413&gad_source=1" },
  ].map((item, i) => (
    <IconButton
      key={i}
      component="a"
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ p: 0 }}
    >
      <Avatar
        src={item.img}
        alt="social"
        sx={{
          width: 36,
          height: 36,
          objectFit: "contain",
          bgcolor: "transparent",
        }}
      />
    </IconButton>
  ))}
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
                    elevation={0}
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
                    elevation={0}
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
                    elevation={0}
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
               {/* <Button
                    variant="contained"
                    sx={{
                      alignSelf: "stretch",
                      flexGrow: 0.3,
                      fontSize: "0.90rem",
                    }}
                  >
                    Customize
                  </Button> */}
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
