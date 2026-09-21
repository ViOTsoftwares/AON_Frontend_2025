import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { useState } from "react";
import { ImageApi } from "../ImageApi";
import { Link } from "react-router-dom";

function ProductCard({
  product,
  cardWidth = { xs: "100%", sm: 210, md: 220, lg: 240 },
  cardHeight = { xs: 265, sm: 320, md: 346 },
  similar = false,

  imageHeight = { xs: 160, sm: 235, md: 260 },
  imageWidth = "100%",
  contentHeight = { xs: 85, sm: 85, md: 86 },
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
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
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
        boxShadow: "var(--shadow-card)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: "var(--shadow-card-hover)",
        },
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
          <Box
            sx={{
              height: imageHeight,
              width: imageWidth,
              bgcolor: "#f8fafc",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              p: { xs: 1, sm: 1.2 },
              boxSizing: "border-box",
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src={`${ImageApi}/product/${product?.ImageArray?.[0]}`}
              alt={product?.Title || "Product"}
              loading="lazy"
              sx={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                objectPosition: "center",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.04)",
                },
              }}
            />
            {/* Chip sits on top-left of image */}
            {animate ? (
              <Chip
                label={`${product?.Discount}% off`}
                color="primary"
                sx={{
                  ...discountAnimation,
                  width: { xs: 66, sm: 84 },
                  height: { xs: 26, sm: 34 },
                  fontSize: { xs: 11, sm: 13 },
                  borderRadius: "0px 0px 18px 0px",
                  fontFamily: "Inter, sans-serif",
                  transition: "0.4s cubic-bezier(0.68,0.46,0.45,0.68)",
                  transform: "scale(1)",
                  background: "var(--gradient-brand)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 2,
                }}
              />
            ) : (
              <Chip
                label={`${product?.Discount}% off`}
                color="primary"
                sx={{
                  ...discountAnimation,
                  fontFamily: "Inter, sans-serif",
                  borderRadius: "18px",
                  width: { xs: 66, sm: 84 },
                  height: { xs: 26, sm: 34 },
                  fontSize: { xs: 11, sm: 13 },
                  transition: "0.4s cubic-bezier(0.68,0.46,0.45,0.68)",
                  transform: "scale(1.05)",
                  background: "var(--gradient-brand)",
                  position: "absolute",
                  top: 6,
                  left: 8,
                  zIndex: 2,
                }}
              />
            )}
          </Box>
        </Link>

        <CardContent
          sx={{
            flex: 1,
            width: "100%",
            boxSizing: "border-box",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            px: { xs: 1.2, sm: 1.5 },
            py: { xs: 1, sm: 1.2 },
            "&:last-child": { pb: { xs: 1, sm: 1.2 } },
          }}
        >
          <Typography
            color="textPrimary"
            sx={{
              fontSize: { xs: "0.82rem", sm: "0.92rem", md: "0.98rem" },
              fontWeight: 600,
              lineHeight: 1.3,
              fontFamily: "Inter, sans-serif",
              mb: 0.5,
              ...lineDots,
            }}
          >
            {product?.Title}
          </Typography>

          <Typography
            component="div"
            sx={{
              fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" },
              fontWeight: 700,
              fontFamily: "Inter, sans-serif",
              display: "flex",
              alignItems: "baseline",
              gap: 0.8,
              mt: "auto",
            }}
          >
            <span>{rupee.format(product?.SellingPrice)}</span>
            {product?.MRP > product?.SellingPrice && (
              <Typography
                component="span"
                color="textDisabled"
                sx={{
                  textDecoration: "line-through",
                  fontSize: { xs: "0.75rem", sm: "0.85rem" },
                  fontWeight: 400,
                }}
              >
                {rupee.format(product?.MRP)}
              </Typography>
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
