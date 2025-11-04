import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { useState } from "react";
import { ImageApi } from "../ImageApi";
import { Link } from "react-router-dom";
function ProductCard({ product, maxWidth = "100%", similar = false }) {
  console.log("----product", product);

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
      backgroundImage: `linear-gradient(120deg,rgba(255,255,255, 0) 30%,rgba(255,255,255, .8),rgba(255,255,255, 0) 70%)`,
      top: "0px",
      left: "-100px",
      animation: `shine  infinite linear`,
      animationDuration: "4s",
      animationDelay: " 0s",
    },

    "@keyframes shine ": {
      "0%": { left: "-100px" },
      "20%": { left: "100%" },
      " 100%": { left: "100%" },
    },
  };

  return (
    <Card
      onMouseEnter={() => setAnimate(false)}
      onMouseLeave={() => setAnimate(true)}
      raised={animate ? false : true}
      sx={{
        borderTopLeftRadius: 12,
        cursor: "pointer",
        mx: 0.2,
        width: maxWidth,
     
      }}
    >
      <CardActionArea>
        <Link to={"/detail/" + product?._id}>
          <CardMedia
            sx={{
              height: { xs: 157, md: 230 },
            }}
            image={`${ImageApi}/product/${product?.ImageArray[0]}`}
            children={
              <>
                {animate ? (
                  <Chip
                    label={`${product?.Discount}% off`}
                    color="primary"
                    sx={{
                      ...discountAnimation,
                      width: { xs: 70, sm: 94 },
                      height: { xs: 30, sm: 40 },
                      fontSize: { xs: 12, sm: 14 },
                      borderRadius: " 12px 1px",
                      fontFamily: "Inter, sans-serif",
                      transition: "0.4s cubic-bezier(0.68, 0.46, 0.45, 0.68)",
                      transform: "scale(1)",
                      background:
                        "linear-gradient(135deg, #1976d2, rgb(11, 206, 255))",
                    }}
                  />
                ) : (
                  <Chip
                    label={`${product?.Discount}% off`}
                    color="primary"
                    sx={{
                      ...discountAnimation,
                      fontFamily: "Inter, sans-serif",
                      borderRadius: " 12px 1px",
                      width: { xs: 70, sm: 94 },
                      height: { xs: 30, sm: 40 },
                      fontSize: { xs: 12, sm: 14 },
                      transition: "0.4s cubic-bezier(0.68, 0.46, 0.45, 0.68)",
                      transform: "scale(1.100)",
                      background:
                        "linear-gradient(135deg, #1976d2, rgb(11, 206, 255))",
                    }}
                  />
                )}
              </>
            }
          />
        </Link>

        <CardContent>
          <Typography
            color="textPrimary"
            sx={{
              fontSize: { xs: "14px", md: "16px" },
              fontWeight: 400,
              fontFamily: "Inter, sans-serif",
              ...lineDots,
              height: "100%",
            }}
          >
            {product?.Title}
          </Typography>
          <Typography
            component="div"
            sx={{
              fontSize: { xs: "16px", md: "18px" },
              fontWeight: 600,
              lineHeight: "2.2rem",
              fontFamily: "Inter, sans-serif",
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
