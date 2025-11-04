import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import office from "../assets/Office.jpeg";
import reception from "../assets/reception.jpg";
import luxuryLiving from "../assets/Luxury Living Area.jpeg";
import hostel from "../assets/Hostel.jpeg";
import hospital from "../assets/Hospital.jpeg";
import classroom from "../assets/Classroom Design.jpeg";
import cafeteria from "../assets/cafeteria.jpeg";
import outdoor from "../assets/Outdoor.jpeg";
import { useNavigate } from "react-router-dom";
function Combo() {
  const navigate = useNavigate();
  const comboStyle = (image) => ({
    width: "100%",
    height: { xs: 150, sm: 250 },
    borderRadius: 2,
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    position: "relative",
    cursor:"pointer"
  });

  return (
    <Grid container spacing={1} sx={{ p: "15px", borderRadius: "10px" }}>
      <Grid size={6}>
        <Card
          sx={comboStyle(office)}
          onClick={() => navigate("/category?q=Office")}
         
        >
          <Button
            variant="contained"
            textAlign="center"
            size="small"
            sx={{
              color: "white",
              position: "absolute",
              right: 10,
              bottom: "2rem",
            }}
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/category?q=Office")}
          >
            Office
          </Button>
        </Card>
      </Grid>{" "}
      <Grid size={6}>
        <Card
          sx={comboStyle(cafeteria)}
          onClick={() => navigate("/category?q=Cafeteria")}
        >
          <Button
            variant="contained"
            textAlign="center"
            sx={{
              color: "white",
              position: "absolute",
              right: 10,
              bottom: "2rem",
            }}
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/category?q=Cafeteria")}
          >
            Cafeteria
          </Button>
        </Card>
      </Grid>{" "}
      <Grid size={6}>
        <Card
          sx={comboStyle(luxuryLiving)}
          onClick={() => navigate("/category?q=Residential")}
        >
          <Button
            variant="contained"
            textAlign="center"
            sx={{
              color: "white",
              position: "absolute",
              right: 10,
              bottom: "2rem",
            }}
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/category?q=Residential")}
          >
            Residential
          </Button>
        </Card>
      </Grid>{" "}
      <Grid size={6}>
        <Card
          sx={comboStyle(hospital)}
          onClick={() => navigate("/category?q=Hospital")}
        >
          <Button
            variant="contained"
            textAlign="center"
            sx={{
              color: "white",
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
      <Grid size={6}>
        <Card
          sx={comboStyle(classroom)}
          onClick={() => navigate("/category?q=Institutional")}
        >
          <Button
            variant="contained"
            textAlign="center"
            sx={{
              color: "white",
              position: "absolute",
              right: 10,
              bottom: "2rem",
            }}
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/category?q=Institutional")}
          >
            Institutional
          </Button>
        </Card>
      </Grid>{" "}
      <Grid size={6}>
        <Card
          sx={comboStyle(hostel)}
          onClick={() => navigate("/category?q=Hostel")}
        >
          <Button
            variant="contained"
            textAlign="center"
            sx={{
              color: "white",
              position: "absolute",
              right: 10,
              bottom: "2rem",
            }}
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/category?q=Hostel")}
          >
            Hostel
          </Button>
        </Card>
      </Grid>{" "}
      <Grid size={6}>
        <Card
          sx={comboStyle(outdoor)}
          onClick={() => navigate("/category?q=Outdoor")}
        >
          <Button
            variant="contained"
            textAlign="center"
            sx={{
              color: "white",
              position: "absolute",
              right: 10,
              bottom: "2rem",
            }}
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/category?q=Outdoor")}
          >
            Outdoor
          </Button>
        </Card>
      </Grid>
      <Grid size={6}>
        <Card
          sx={comboStyle(classroom)}
          onClick={() => navigate("/category?q=Institutional")}
        >
          <Button
            variant="contained"
            textAlign="center"
            sx={{
              color: "white",
              position: "absolute",
              right: 10,
              bottom: "2rem",
            }}
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/category?q=Institutional")}
          >
            Reception
          </Button>
        </Card>
      </Grid>{" "}
      <Grid size={12}>
        <Card
          sx={comboStyle(hostel)}
          onClick={() => navigate("/category?q=Hostel")}
        >
          <Button
            variant="contained"
            textAlign="center"
            sx={{
              color: "white",
              position: "absolute",
              right: 10,
              bottom: "2rem",
            }}
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/category?q=Hostel")}
          >
            Others
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Combo;
