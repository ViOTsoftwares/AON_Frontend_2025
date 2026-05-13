import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { useState } from "react";
import { ImageApi } from "../ImageApi";
import { Link } from "react-router-dom";

function ProductCard({
  product,
  cardWidth = { xs: 160, sm: 210, md: 220, lg: 240 },
  cardHeight = { xs: 270, sm: 320, md: 346 },
  similar = false,

  imageHeight = { xs: 187, sm: 235, md: 260 },
  imageWidth = "100%",
  contentHeight = { xs: 82, sm: 85, md: 86 },
}) {
  const [animate, setAnimate] = useState(true);

  const lineDots = similar
    ? {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }
    : {
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      };

  let rupee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumSignificantDigits: 3,
  });

  const discountAnimation = {
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundImage:
        "linear-gradient(120deg, rgba(255,255,255,0) 30%, rgba(255,255,255,.8) 50%, rgba(255,255,255,0) 70%)",
      top: 0,
      left: "-100px",
      animation: `shine infinite linear`,
      animationDuration: "4s",
      animationDelay: "0s",
    },
    "@keyframes shine": {
      "0%": { left: "-100px" },
      "20%": { left: "100%" },
      "100%": { left: "100%" },
    },
  };

  return (
    <Card
      onMouseEnter={() => setAnimate(false)}
      onMouseLeave={() => setAnimate(true)}
      raised={!animate}
      sx={{
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        cursor: "pointer",
        mx: 0.2,
        width: cardWidth,
        maxWidth: "100%",
        height: cardHeight,
        flex: "0 0 auto",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          height: "100%",
        }}
      >
        <Link
          to={"/detail/" + product?._id}
          style={{ display: "block", textDecoration: "none", width: "100%" }}
        >
          <CardMedia
            sx={{
              // can accept number (px) or responsive object.
              height: imageHeight,
              width: imageWidth,
              backgroundImage: `url(${ImageApi}/product/${product?.ImageArray?.[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              // ensure it shrink/grow properly inside card
              flexShrink: 0,
            }}
          >
            {/* Chip as a child of CardMedia so it sits on top */}
            {animate ? (
              <Chip
                label={`${product?.Discount}% off`}
                color="primary"
                sx={{
                  ...discountAnimation,
                  width: { xs: 70, sm: 94 },
                  height: { xs: 30, sm: 40 },
                  fontSize: { xs: 12, sm: 14 },
                  borderRadius: "0px 0px 24px 0px ",
                  fontFamily: "Inter, sans-serif",
                  transition: "0.4s cubic-bezier(0.68,0.46,0.45,0.68)",
                  transform: "scale(1)",
                  background: "var(--gradient-brand)",
                 
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
            ) : (
              <Chip
                label={`${product?.Discount}% off`}
                color="primary"
                sx={{
                  ...discountAnimation,
                  fontFamily: "Inter, sans-serif",
                  borderRadius: "24px ",
                  width: { xs: 70, sm: 94 },
                  height: { xs: 30, sm: 40 },
                  fontSize: { xs: 12, sm: 14 },
                  transition: "0.4s cubic-bezier(0.68,0.46,0.45,0.68)",
                  transform: "scale(1.1)",
                  background: "var(--gradient-brand)",
                  position: "absolute",
                  top: 9,
                  left: 11,
                }}
              />
            )}
          </CardMedia>
        </Link>

        <CardContent
          sx={{
            // responsive content area
            height: contentHeight,
            minHeight: contentHeight,
            width: "100%",
            boxSizing: "border-box",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            pt: 0.8,
            pb: 0.9,
          }}
        >
          <Typography
            color="textPrimary"
            sx={{
              fontSize: { xs: "13px", md: "16px" },
              fontWeight: 600,
              fontFamily: "Inter, sans-serif",
              ...lineDots,
            }}
          >
            {product?.Title}
          </Typography>

          <Typography
            component="div"
            sx={{
              fontSize: { xs: "16px", md: "18px" },
              fontWeight: 600,
              // lineHeight: "2.2rem",
              fontFamily: "Inter, sans-serif",
              display: "flex",
              alignItems: "center",
            }}
          >
            {rupee.format(product?.SellingPrice)}
            <Typography
              component="span"
              variant="body1"
              color="textDisabled"
              sx={{ textDecoration: "line-through", ml: 1, fontSize: "1rem" }}
            >
              {rupee.format(product?.MRP)}
            </Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
