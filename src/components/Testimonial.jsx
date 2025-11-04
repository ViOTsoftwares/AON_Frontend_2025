import React from "react";
import Carousel from "./Carousel";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Rating from "@mui/material/Rating";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import CountUp from "./Animations/Counter";
function Testimonial(props) {
  var items = [
    {
      name: "Suriya",
      description:
        "Probably the mostLorem ipsum dolor sit amet consectetur adipisicing elit. Similique in qui ratione pariatur neque fugiat, libero voluptas officiis est! Magni autem corrupti cupiditate recusandae consectetur dolores odio, eveniet voluptatum explicabo",
      letter: "SR",
      rating: 4.5,
    },
    {
      name: "Vikram",
      description:
        "I have decited to buy       Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique in qui ratione pariatur neque fugiat, libero voluptas officiis est! Magni autem corrupti cupiditate recusandae consectetur dolores odio, eveniet voluptatum explicabos",
      letter: "VR",
      rating: 3.5,
    },
  ];

  return (
    <Grid
      container
      alignItems="center"
      sx={{
        // background: "linear-gradient(to right,#6395ee,#FFFAFA)",
        p: { xs: 2, md: 4 },
        borderRadius: "1rem",
      }}
      spacing={6}
    >
      <Grid
        container
        size={{ xs: 12, md: 5 }}
        spacing={4}
        justifyContent={{ xs: "center", md: "flex-start" }}
      >
        <Typography
          variant="body1"
          color="primary"
          sx={{
            fontWeight: 700,
            letterSpacing: " 0.15em",
            lineHeight: "1.5",
            position: "relative",

            "&::before": {
              position: "absolute",
              bottom: { xs: "-4rem", sm: -20 },
              content: '""',
              height: 100,
              width: 100,
              backgroundColor: "rgba(0, 128, 255, 0.07)",
              borderRadius: " 50%",
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
                " linear-gradient(90deg, #1976D2, rgba(0, 105, 153, 0.38), transparent)",
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
          Discover genuine furnitures in Arun Office Needs.After initial setup
          and services
        </Typography>

        <Stack direction="row" spacing={5}>
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
                backgroundColor: "rgba(0, 128, 255, 0.07)",
                borderRadius: " 50%",
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
                className="count-up-text"
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
                className="count-up-text"
              />
            </Typography>
            <Typography variant="body1" color="textSecondary" fontWeight={600}>
              Average Rating
            </Typography>
          </Box>
        </Stack>
      </Grid>
      <Grid
        size={{ xs: 12, md: 7 }}
        sx={{
          pl: {
            md: "3rem",
            "&:hover": {
              transition: "0.4s cubic-bezier(0.68, 0.46, 0.45, 0.68)",
              transform: "scale(1.1)",
            },
            transition: "0.4s cubic-bezier(0.68, 0.46, 0.45, 0.68)",
            transform: "scale(1)",
          },
        }}
      >
        <Carousel arrows={false} fade={true} dots={false}>
          {items.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </Carousel>
      </Grid>
    </Grid>
  );
}

function Item({ item }) {
  return (
    <Stack
      sx={{
        maxHeight: 668,
        bgcolor: "rgb(255, 255, 255)",
        position: "relative",

        padding: { xs: 2, sm: 6 },
        borderRadius: 8,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
      spacing={3}
    >
      <FormatQuoteIcon
        color="primary"
        sx={{
          position: "absolute",
          top: { xs: "10px", sm: "-10px" },
          fontSize: { xs: "3rem", sm: "5rem" },
          transform: "rotate(15deg)",
          alignSelf: "flex-end",
          opacity: "0.16",
        }}
      />
      <Box>
        <Typography
          variant="body1"
          fontWeight={{ sm: 400 }}
          fontSize={{ xs: "1rem", sm: "1.35rem" }}
          lineHeight={{ xs: 1.8, sm: 1.7 }}
          sx={{ color: "rgb(45, 55, 72)", cursor: "text" }}
          fontStyle="italic"
          textAlign="center"
        >
          "{item.description}"
        </Typography>
      </Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="stretch"
          spacing={2}
        >
          <Card
            raised
            size="grow"
            sx={{
              width: { xs: 60, sm: 80 },
              height: { xs: 60, sm: 80 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "lightgreen",
                width: { xs: 56, sm: 72 },
                height: { xs: 56, sm: 72 },

                fontSize: { xs: "1rem", sm: "2rem" },
              }}
              variant="circular"
            >
              {item.letter}
            </Avatar>
          </Card>
          <Typography
            textAlign="center"
            variant="h6"
            width={{ xs: "60px", sm: "auto" }}
            fontWeight={{ xs: 500, sm: 700 }}
            fontSize={{ xs: "0.98rem", sm: "1.2rem" }}
          >
            {item.name}
          </Typography>
        </Stack>
        <Box>
          <Rating
            defaultValue={item.rating}
            precision={0.5}
            readOnly
            sx={{
              fontSize: {
                xs: "1.1rem",
                sm: "1.3rem",
              },
            }}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
export default Testimonial;
