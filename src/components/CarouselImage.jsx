import { useState } from "react";
import { useTheme, alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CardMedia from "@mui/material/CardMedia";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { ImageApi } from "../ImageApi";

const ImageCarousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentImage = images[currentIndex];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        overflow: "visible",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          width: "100%",
          overflow: "visible",
          alignItems: { xs: "center", md: "stretch" },
        }}
      >
        {/* THUMBNAILS — LEFT (PC), BOTTOM (MOBILE) */}
        <Box
          sx={{
            order: { xs: 2, md: 1 },

            display: "grid",

            // 6 thumbnails fixed
            gridTemplateColumns: {
              xs: "repeat(6, auto)", // ← THIS IS THE KEY
              md: "1fr",
            },

            gap: 1,

            justifyItems: "center", // center each thumbnail
            alignItems: "center",

            // 🔑 THIS IS THE CENTERING MAGIC
            width: "fit-content", // grid hugs content
            marginX: "auto", // center the whole grid

            // desktop constraints
            minWidth: { md: 90 },
            maxWidth: "100%",

            overflow: "visible",
            py: 1,
          }}
        >
          {images.slice(0, 6).map((img, index) => (
            <CardMedia
              key={index}
              component="img"
              src={`${ImageApi}/product/${img}`}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: { xs: 48, sm: 56, md: 70 },
                height: { xs: 48, sm: 56, md: 60 },

                objectFit: "cover",
                borderRadius: 1.5,
                cursor: "pointer",

                border:
                  index === currentIndex
                    ? `3px solid ${theme.palette.primary.main}`
                    : "3px solid transparent",

                opacity: index === currentIndex ? 1 : 0.85,
                transform: index === currentIndex ? "scale(1.05)" : "scale(1)",
                transition: "all 0.25s ease",
              }}
            />
          ))}
        </Box>

        {/* MAIN IMAGE — RIGHT (PC), TOP (MOBILE) */}
        <Box
          sx={{
            order: { xs: 1, md: 2 },
            flex: 1,
            minWidth: 0,
            maxWidth: "100%",
            position: "relative",
            height: { xs: 350, sm: 480 },
            borderRadius: 2,
            overflow: "visible",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardMedia
            component="img"
            src={`${ImageApi}/product/${currentImage}`}
            sx={{
              width: "100%",
              height: { xs: 350, sm: 480 },
              // alignContent:{ xs : "center", md: "unset"},
              objectFit: "contain",
            }}
          />


          {/* MOBILE NAV ARROWS ONLY */}
          <IconButton
            onClick={goToPrevious}
            sx={{
              position: "absolute",
              display: { xs: "flex", md: "none" },
              top: "50%",
              left: 18, // ⬅ padded inside from corner
              transform: "translateY(-50%)",
              bgcolor: alpha(theme.palette.background.paper, 0.9),
              boxShadow: theme.shadows[4],
              zIndex: 10,
            }}
          >
            <ChevronLeft />
          </IconButton>

          <IconButton
            onClick={goToNext}
            sx={{
              position: "absolute",
              display: { xs: "flex", md: "none" },
              top: "50%",
              right: 18, // ⮕ padded inside from corner
              transform: "translateY(-50%)",
              bgcolor: alpha(theme.palette.background.paper, 0.9),
              boxShadow: theme.shadows[4],
              zIndex: 10,
            }}
          >
            <ChevronRight />
          </IconButton>

        </Box>
      </Stack>
    </Box>
  );
};

export default ImageCarousel;
