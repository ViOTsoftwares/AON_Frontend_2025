import { useState } from "react";
import { useTheme, alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

import carousel1 from "../assets/sofa1.jpg";
import carousel2 from "../assets/sofa2.jpg";
import carousel3 from "../assets/sofa3.jpg";
import carousel4 from "../assets/sofa4.jpg";
import carousel5 from "../assets/sofa5.jpg";
import carousel6 from "../assets/sofa6.jpg";
import { ImageApi } from "../ImageApi";
const carouselImages = [
  carousel1,

  carousel2,

  carousel3,

  carousel4,

  carousel5,

  carousel6,
];

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentImage = images[currentIndex];

  return (
    <Box>
      <Stack
        flexDirection={{ xs: "column", sm: "row" }}
        sx={{
          position: "relative",
          width: "100%",
          margin: "0 auto",

          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "350px", sm: "450px" },
            borderRadius: 2,
            overflow: "hidden",
            mb: 2,
            px: { xs: 0, sm: 2 },
            pt: 2,
            order: { xs: 1, sm: 2 },
          }}
        >
          <CardMedia
            component="img"
            image={`${ImageApi}/product/` + currentImage}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: { xs: "fill", sm: "cover" },
              borderRadius: 1,
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
          <IconButton
            size="small"
            onClick={goToPrevious}
            aria-label="Previous image"
            sx={{
              position: "absolute",
              display: { xs: "block", sm: "none" },
              top: "50%",
              left: 16,
              transform: "translateY(-50%)",
              bgcolor: alpha(theme.palette.background.paper, 0.9),
              color: theme.palette.text.primary,

              boxShadow: theme.shadows[4],
              transition: "all 0.3s ease",
              zIndex: 2,
              "&:hover": {
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                transform: "translateY(-50%) scale(1.1)",
                boxShadow: theme.shadows[8],
              },
            }}
          >
            <ChevronLeft fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            onClick={goToNext}
            aria-label="Next image"
            sx={{
              position: "absolute",
              display: { xs: "block", sm: "none" },
              top: "50%",
              right: 16,
              transform: "translateY(-50%)",
              bgcolor: alpha(theme.palette.background.paper, 0.9),
              color: theme.palette.text.primary,
              boxShadow: theme.shadows[4],
              transition: "all 0.3s ease",
              zIndex: 2,
              "&:hover": {
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                transform: "translateY(-50%) scale(1.1)",
                boxShadow: theme.shadows[8],
              },
            }}
          >
            <ChevronRight fontSize="small" />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "column" },
            gap: 1.5,
            justifyContent: "center",
            alignItems: "center",
            p: { xs: 1, sm: 2.4 },
            overflow: { xs: "scroll", sm: "hidden" },
            order: { xs: 2, sm: 1 },
          }}
        >
          {images.map((image, index) => (
            <CardMedia
              key={index}
              component="img"
              image={`${ImageApi}/product/` + image}
              onClick={() => goToSlide(index)}
              sx={{
                width: 80,
                height: 60,
                objectFit: "cover",
                objectPosition: "center center",
                borderRadius: 1.5,
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                border:
                  index === currentIndex
                    ? `3px solid ${theme.palette.primary.main}`
                    : "3px solid transparent",
                opacity: index === currentIndex ? 1 : 0.7,
                transform: index === currentIndex ? "scale(1.1)" : "scale(1)",
                boxShadow: index === currentIndex ? theme.shadows[6] : "none",
                "&:hover": {
                  opacity: 1,
                  transform: "scale(1.05)",
                  boxShadow: theme.shadows[4],
                },
              }}
            />
          ))}
        </Box>
      </Stack>
    </Box>
  );
};

export default ImageCarousel;
