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
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const currentImage = images[currentIndex];

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* THUMBNAILS — LEFT (PC), BOTTOM (MOBILE) */}
        <Box
          sx={{
            order: { xs: 2, md: 1 },
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            gap: 1.5,
            alignItems: "center",
            justifyContent: "center",

            width: { xs: "100%", md: 90 },
            minWidth: { md: 90 },

            overflowX: { xs: "auto", md: "hidden" },
            overflowY: "hidden",

            py: 1,
          }}
        >
          {images.map((img, index) => (
            <CardMedia
              key={index}
              component="img"
              src={`${ImageApi}/product/${img}`}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: 80,
                height: 60,
                objectFit: "cover",
                borderRadius: 1.5,
                cursor: "pointer",
                border:
                  index === currentIndex
                    ? `3px solid ${theme.palette.primary.main}`
                    : "3px solid transparent",
                opacity: index === currentIndex ? 1 : 0.7,
                transform: index === currentIndex ? "scale(1.05)" : "scale(1)",
                transition: "all 0.3s ease",
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
            position: "relative",
            height: { xs: 350, sm: 480 },
            // backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            overflow: "hidden",
            alignContent: { xs: "center", md: "unset" },
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
              objectFit: "cover",
            }}
          />

          {/* MOBILE NAV ARROWS ONLY */}
          <IconButton
            onClick={goToPrevious}
            sx={{
              position: "absolute",
              display: { xs: "flex", md: "none" },
              top: "50%",
              left: 12,
              transform: "translateY(-50%)",
              bgcolor: alpha(theme.palette.background.paper, 0.9),
              boxShadow: theme.shadows[4],
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
              right: 12,
              transform: "translateY(-50%)",
              bgcolor: alpha(theme.palette.background.paper, 0.9),
              boxShadow: theme.shadows[4],
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
