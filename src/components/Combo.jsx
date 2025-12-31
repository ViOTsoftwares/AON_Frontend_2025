import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import office from "../assets/CoOffice.jpeg";
import Reception from "../assets/CoRecep.jpg";
import luxuryLiving from "../assets/CoLive.jpeg";
import hostel from "../assets/CoHostel.jpeg";
import hospital from "../assets/CoHospital.jpeg";
import classroom from "../assets/CoClass.jpeg";
import cafeteria from "../assets/CoCafe.jpg";
import outdoor from "../assets/CoOutdoor.jpeg";
import Others from "../assets/CoOthers.jpg";
import { useNavigate } from "react-router-dom";
function Combo() {
  const navigate = useNavigate();
  const comboStyle = (image) => ({
    width: "100%",
    height: { xs: 150, sm: 250 },
    borderRadius: 2,
    overflow: "hidden",
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    position: "relative",
    cursor: "pointer",
    transition: "transform 0.4s ease",
    "&:hover": {
      transform: "scale(1.02)",
    },
  });

  return (
    <Grid container spacing={1} sx={{ p: "15px", borderRadius: "10px" }}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Card
          sx={comboStyle(office)}
          onClick={() => navigate("/category?q=Office")}
        >
          <Button
            variant="contained"
            size="medium"
            sx={{
              color: "white",
              background:
                "linear-gradient(129deg, rgba(87,3,0,0.925), rgba(148,10,0,0.822), rgba(78,5,0,0.897))",
              borderRadius: "5px",
              borderColor: "white",
              position: "absolute",
              right: 10,
              bottom: "2rem",
              textAlign: "center",
            }}
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/category?q=Office")}
          >
            Office
          </Button>
        </Card>
      </Grid>{" "}
      <Grid size={{ xs: 12, sm: 6 }}>
        <Card
          sx={comboStyle(cafeteria)}
          onClick={() => navigate("/category?q=Cafeteria")}
        >
          <Button
            variant="contained"
            sx={{
              color: "white",
              background:
                "linear-gradient(129deg, rgba(87,3,0,0.925), rgba(148,10,0,0.822), rgba(78,5,0,0.897))",
              position: "absolute",
              right: 10,
              bottom: "2rem",

              textAlign: "center",
            }}
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/category?q=Cafeteria")}
          >
            Cafeteria
          </Button>
        </Card>
      </Grid>{" "}
      <Grid size={{ xs: 12, sm: 6 }}>
        <Card
          sx={comboStyle(luxuryLiving)}
          onClick={() => navigate("/category?q=Residential")}
        >
          <Button
            variant="contained"
            sx={{
              color: "white",
              background:
                "linear-gradient(129deg, rgba(87,3,0,0.925), rgba(148,10,0,0.822), rgba(78,5,0,0.897))",
              position: "absolute",
              right: 10,
              bottom: "2rem",
              textAlign: "center",
            }}
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/category?q=Residential")}
          >
            Residential
          </Button>
        </Card>
      </Grid>{" "}
      <Grid size={{ xs: 12, sm: 6 }}>
        <Card
          sx={comboStyle(hospital)}
          onClick={() => navigate("/category?q=Hospital")}
        >
          <Button
            variant="contained"
            sx={{
              color: "white",

              background:
                "linear-gradient(129deg, rgba(87,3,0,0.925), rgba(148,10,0,0.822), rgba(78,5,0,0.897))",
              position: "absolute",
              right: 10,
              bottom: "2rem",
            }}
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/category?q=Hospital")}
          >
            Hospital
          </Button>
        </Card>
      </Grid>{" "}
      <Grid size={{ xs: 12, sm: 6 }}>
        <Card
          sx={comboStyle(classroom)}
          onClick={() => navigate("/category?q=Institutional")}
        >
          <Button
            variant="contained"
            sx={{
              color: "white",
              background:
                "linear-gradient(129deg, rgba(87,3,0,0.925), rgba(148,10,0,0.822), rgba(78,5,0,0.897))",
              position: "absolute",
              right: 10,
              bottom: "2rem",
              textAlign: "center",
            }}
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/category?q=Institutional")}
          >
            Institutional
          </Button>
        </Card>
      </Grid>{" "}
      <Grid size={{ xs: 12, sm: 6 }}>
        <Card
          sx={comboStyle(hostel)}
          onClick={() => navigate("/category?q=Hostel")}
        >
          <Button
            variant="contained"
            sx={{
              color: "white",
              background:
                "linear-gradient(129deg, rgba(87,3,0,0.925), rgba(148,10,0,0.822), rgba(78,5,0,0.897))",
              position: "absolute",
              right: 10,
              bottom: "2rem",
              textAlign: "center",
            }}
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/category?q=Hostel")}
          >
            Hostel
          </Button>
        </Card>
      </Grid>{" "}
      <Grid size={{ xs: 12, sm: 6 }}>
        <Card
          sx={comboStyle(outdoor)}
          onClick={() => navigate("/category?q=Outdoor")}
        >
          <Button
            variant="contained"
            sx={{
              color: "white",
              background:
                "linear-gradient(129deg, rgba(87,3,0,0.925), rgba(148,10,0,0.822), rgba(78,5,0,0.897))",
              position: "absolute",
              right: 10,
              bottom: "2rem",
              textAlign: "center",
            }}
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/category?q=Outdoor")}
          >
            Outdoor
          </Button>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Card
          sx={comboStyle(Reception)}
          onClick={() => navigate("/category?q=Reception")}
        >
          <Button
            variant="contained"
            sx={{
              color: "white",
              background:
                "linear-gradient(129deg, rgba(87,3,0,0.925), rgba(148,10,0,0.822), rgba(78,5,0,0.897))",
              position: "absolute",
              right: 10,
              bottom: "2rem",
              textAlign: "center",
            }}
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/category?q=Reception")}
          >
            Reception
          </Button>
        </Card>
      </Grid>{" "}
      <Grid size={12}>
        <Card
          sx={comboStyle(Others)}
          onClick={() => navigate("/category?q=Others")}
        >
          <Button
            variant="contained"
            sx={{
              color: "white",
              background:
                "linear-gradient(129deg, rgba(87,3,0,0.925), rgba(148,10,0,0.822), rgba(78,5,0,0.897))",
              position: "absolute",
              right: 10,
              bottom: "2rem",
              textAlign: "center",
            }}
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/category?q=Others")}
          >
            Others
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Combo;
