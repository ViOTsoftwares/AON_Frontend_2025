import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Rating from "@mui/material/Rating";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CountUp from "./Animations/Counter";
import Modal from "@mui/material/Modal";


function Testimonial() {
  const items = [
    {
      name: "Suriya",
      description:
        "Probably the most Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique in qui ratione pariatur neque fugiat, libero voluptas officiis est!",
      letter: "SR",
      rating: 4.5,
      proofImg:
        "https://rukminim2.flixcart.com/image/832/832/xif0q/bed-mattress/9/d/c/normal-top-single-5-35-72-orthopedic-bed-mattress-dual-comfort-original-imahhk2tvjfdxybj.jpeg?q=70&crop=false",
    },
    {
      name: "Vikram",
      description:
        "I decided to buy Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique in qui ratione pariatur neque fugiat, libero voluptas officiis est!",
      letter: "VR",
      rating: 3.5,
      proofImg:
        "https://rukminim2.flixcart.com/image/832/832/xif0q/bed-mattress/9/d/c/normal-top-single-5-35-72-orthopedic-bed-mattress-dual-comfort-original-imahhk2tvjfdxybj.jpeg?q=70&crop=false",
    },
    {
      name: "Karthi",
      description:
        "Excellent quality furniture, timely delivery, and supportive service team. Absolutely recommended!",
      letter: "KT",
      rating: 5,
      proofImg:
        "https://rukminim2.flixcart.com/image/832/832/xif0q/bed-mattress/9/d/c/normal-top-single-5-35-72-orthopedic-bed-mattress-dual-comfort-original-imahhk2tvjfdxybj.jpeg?q=70&crop=false",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const item = items[currentIndex];

  return (
    <Grid
      container
      alignItems="center"
      spacing={6}
      sx={{
        p: { xs: 2, md: 4 },
        borderRadius: "1rem",
      }}
    >
      {/* LEFT SIDE TEXT SECTION */}
      <Grid
        item
        xs={12}
        md={5}
        spacing={4}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography
          variant="body1"
          color="primary"
          sx={{
            fontWeight: 700,
            letterSpacing: "0.15em",
            lineHeight: "1.5",
            position: "relative",
            "&::before": {
              position: "absolute",
              bottom: { xs: "-4rem", sm: -20 },
              content: '""',
              height: 100,
              width: 100,
              backgroundColor: "rgba(0, 128, 255, 0.07)",
              borderRadius: "50%",
            },
          }}
        >
          ✨ TESTIMONIALS
        </Typography>

        <Typography
          variant="h2"
          textAlign={{ xs: "center", md: "start" }}
          sx={{
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -12,
              left: 0,
              width: 80,
              height: 4,
              background:
                "linear-gradient(90deg, #1976D2, rgba(0,105,153,0.38), transparent)",
              borderRadius: 2,
            },
            fontWeight: 800,
            fontSize: { xs: "2rem", sm: "3.25rem" },
            lineHeight: 1.1,
          }}
        >
          What Our Customers Say
        </Typography>

        <Typography
          variant="body1"
          color="textSecondary"
          textAlign={{ xs: "center", md: "left" }}
          sx={{ fontWeight: 400, fontSize: "1.25rem", lineHeight: 1.7 }}
        >
          Discover genuine furnitures in Arun Office Needs. After initial setup
          and services.
        </Typography>

        <Stack direction="row" spacing={5} sx={{ mt: 3 }}>
          <Box
            sx={{
              position: "relative",
              "&::before": {
                position: "absolute",
                top: "1rem",
                left: "5rem",
                content: '""',
                height: 68,
                width: 68,
                backgroundColor: "rgba(0,128,255,0.07)",
                borderRadius: "50%",
              },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                lineHeight: 1.16,
                fontWeight: 900,
                fontSize: "2.5rem",
              }}
              color="primary"
            >
              <CountUp
                from={0}
                to={2500}
                separator=""
                direction="up"
                duration={0.78}
              />
              +
            </Typography>
            <Typography variant="body1" color="textSecondary" fontWeight={600}>
              Happy Customers
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h3"
              textAlign="center"
              sx={{ lineHeight: 1.167, fontWeight: 900, fontSize: "2.5rem" }}
              color="primary"
            >
              <CountUp
                from={0}
                to={4.8}
                separator=""
                direction="up"
                duration={0.78}
              />
            </Typography>
            <Typography variant="body1" color="textSecondary" fontWeight={600}>
              Average Rating
            </Typography>
          </Box>
        </Stack>
      </Grid>

      {/* RIGHT SIDE TESTIMONIAL CARD WITH BORDER ARROWS */}
      <Grid
        item
        xs={12}
        md={7}
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Border Left Arrow */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: { xs: -2, sm: -10 },
            zIndex: 2,
            bgcolor: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            "&:hover": { bgcolor: "primary.main", color: "white" },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        {/* Testimonial Card */}
        <Item item={item} />

        {/* Border Right Arrow */}
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: { xs: -2, sm: -10 },
            zIndex: 2,
            bgcolor: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            "&:hover": { bgcolor: "primary.main", color: "white" },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

/* --- ITEM COMPONENT --- */
function Item({ item }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Stack
        sx={{
          bgcolor: "rgb(255,255,255)",
          borderRadius: 5,
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          p: { xs: 2, sm: 4 },
          position: "relative",
          maxWidth: 800,
          height: { xs: 450, sm: 420 }, // fixed card height
          width: "100%",
          mx: "auto",
          overflow: "hidden",
        }}
        spacing={3}
      >
        <FormatQuoteIcon
          color="primary"
          sx={{
            position: "absolute",
            top: { xs: 10, sm: -10 },
            right: { xs: 10, sm: 20 },
            fontSize: { xs: "3rem", sm: "5rem" },
            transform: "rotate(15deg)",
            opacity: 0.15,
          }}
        />

        {/* === Top Row === */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Card
            raised
            sx={{
              width: { xs: 60, sm: 80 },
              height: { xs: 60, sm: 80 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "lightgreen",
                width: "100%",
                height: "100%",
                fontSize: { xs: "1rem", sm: "2rem" },
              }}
            >
              {item.letter}
            </Avatar>
          </Card>

          <Typography
            variant="h6"
            fontWeight={700}
            fontSize={{ xs: "1rem", sm: "1.3rem" }}
            sx={{ flexGrow: 1, textAlign: "left" }}
          >
            {item.name}
          </Typography>

          <Rating
            defaultValue={item.rating}
            precision={0.5}
            readOnly
            sx={{ fontSize: { xs: "1.1rem", sm: "1.3rem" } }}
          />
        </Stack>

        {/* === Review + Proof Image === */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="stretch"
          sx={{ flexGrow: 1 }}
        >
          {/* Review Text */}
          <Box
            sx={{
              flex: 1,
              bgcolor: "rgb(250,250,250)",
              borderRadius: 2,
              p: 2,
              overflowY: "auto",
            }}
          >
            <Typography
              variant="body1"
              fontWeight={400}
              fontSize={{ xs: "0.95rem", sm: "1.1rem" }}
              sx={{
                color: "rgb(45, 55, 72)",
                lineHeight: 1.7,
                fontStyle: "italic",
              }}
            >
              "{item.description}"
            </Typography>
          </Box>

          {/* Proof Picture with Click-to-Enlarge */}
          {item.proofImg && (
            <>
              <Card
                onClick={handleOpen}
                sx={{
                  width: { xs: "100%", sm: "30%" },
                  borderRadius: 3,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                <img
                  src={item.proofImg}
                  alt="Proof"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Card>

              {/* === Modal for Enlarged View === */}
              <Modal
                open={open}
                onClose={handleClose}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backdropFilter: "blur(3px)",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    outline: "none",
                    maxWidth: "90vw",
                    maxHeight: "85vh",
                  }}
                >
                  <IconButton
                    onClick={handleClose}
                    sx={{
                      position: "absolute",
                      top: -40,
                      right: -40,
                      bgcolor: "white",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                      "&:hover": { bgcolor: "grey.200" },
                    }}
                  >
                    ✕
                  </IconButton>

                  <img
                    src={item.proofImg}
                    alt="Proof Large"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: "12px",
                      boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
                    }}
                  />
                </Box>
              </Modal>
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

export default Testimonial;
