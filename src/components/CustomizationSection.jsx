import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";

function CustomizationSection() {
  return (
    <>
      <Typography textAlign="center" fontSize="3rem" fontWeight={600}>
        Tune Your Furniture
      </Typography>
      <Grid container direction={{ xs: "column", sm: "row" }} spacing={2} p={8}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card
            sx={{
              maxHeight: 362,
              maxWidth: "100%",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",

                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography fontSize="2.2rem" fontWeight={{ xs: 400, sm: 700 }}>
                Idea
              </Typography>
              <Typography
                variant="body1"
                sx={{ lineHeight: "2rem" }}
                textAlign="center"
              >
                Have Idea lets talk with out expert to get more about furniture
                and tune your needs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card sx={{ maxHeight: 362, maxWidth: "100%" }}>
            <CardMedia component="img" />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",

                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography fontSize="2.2rem" fontWeight={{ xs: 400, sm: 700 }}>
                Explain
              </Typography>
              <Typography
                variant="body1"
                sx={{ lineHeight: "2rem" }}
                textAlign="center"
              >
                Share your thoughts and explore some great furniture alter and
                tune your furnitues
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card sx={{ maxHeight: 362, maxWidth: "100%" }}>
            <CardMedia component="img" />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",

                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography fontSize="2.2rem" fontWeight={{ xs: 400, sm: 700 }}>
                Product
              </Typography>
              <Typography
                variant="body1"
                sx={{ lineHeight: "2rem" }}
                textAlign="center"
              >
                Have Idea lets talk with out expert to get more about furniture
                and tune your needs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Button sx={{ m: "auto" }} size="large" variant="contained">
          Customization
        </Button>
      </Grid>
    </>
  );
}

export default CustomizationSection;
