import Slider from "react-slick";
import Box from "@mui/material/Box";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./Carousel.css";
import { useRef } from "react";

function Carousel({
  children,
  arrows = true,
  xs = 1,
  sm = 1,
  md = 1,
  lg = 1,
  xl = 1,
  dots = true,
  speed = 3000,
  fade = false,
  autoplaySpeed = 6000,
  direction = false,
  pauseOnHover = false,
  autoplay = true,
  infinite = true,
}) {
  var settings = {
    autoplay: autoplay,
    speed: speed,
    autoplaySpeed: autoplaySpeed,
    dots: dots,
    infinite: infinite,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    pauseOnHover: pauseOnHover,
    rtl: direction,
    lazyload: true,
    fade: fade,
    responsive: [
      {
        breakpoint: 1540,
        settings: {
          slidesToShow: xl,
          slidesToScroll: xl,
          infinite: infinite,
          dots: dots,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: lg,
          slidesToScroll: lg,

          infinite: infinite,
          dots: dots,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: md,
          slidesToScroll: md,
          infinite: infinite,
          dots: dots,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: sm,
          slidesToScroll: sm,
          initialSlide: 2,
          infinite: infinite,

        },
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: xs,
          slidesToScroll: xs,
          infinite: infinite,

        },
      },
    ],
  };

  let sliderRef = useRef(null);

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
        {children}
      </Slider>

      <IconButton
        onClick={() => sliderRef.slickPrev()}
        sx={{
          display: arrows ? "block" : "none",
          position: "absolute",
          top: "50%",
          left: "10px",
          height: "41px",
          "&:hover": {
            backgroundColor: "var(--color-surface)",
          },
          backgroundColor: "var(--color-surface-subtle)",
        }}
      >
        <ChevronLeftIcon />
      </IconButton>
      <IconButton
        onClick={() => sliderRef.slickNext()}
        sx={{
          display: arrows ? "block" : "none",
          position: "absolute",
          top: "50%",
          right: "10px",
          "&:hover": {
            backgroundColor: "var(--color-surface)",
          },
          height: "41px",

          backgroundColor: "var(--color-surface-subtle)",
        }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
}

export default Carousel;
