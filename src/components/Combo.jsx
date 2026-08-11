import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import api from "../BasaApi";
import { ImageApi } from "../ImageApi";

import office from "../assets/CoOffice.jpeg";
import Reception from "../assets/CoRecep.jpg";
import luxuryLiving from "../assets/CoLive.jpeg";
import hostel from "../assets/CoHostel.jpeg";
import hospital from "../assets/CoHospital.jpeg";
import classroom from "../assets/CoClass.jpeg";
import cafeteria from "../assets/CoCafe.png";
import outdoor from "../assets/CoOutdoor.jpeg";
import Others from "../assets/CoOthers.jpg";

const DEFAULT_SPACES = [
  { slotIndex: 0, key: "office", defaultName: "Office", defaultImage: office },
  { slotIndex: 1, key: "cafeteria", defaultName: "Cafeteria", defaultImage: cafeteria },
  { slotIndex: 2, key: "residential", defaultName: "Residential", defaultImage: luxuryLiving },
  { slotIndex: 3, key: "hospital", defaultName: "Hospital", defaultImage: hospital },
  { slotIndex: 4, key: "institutional", defaultName: "Institutional", defaultImage: classroom },
  { slotIndex: 5, key: "hostel", defaultName: "Hostel", defaultImage: hostel },
  { slotIndex: 6, key: "outdoor", defaultName: "Outdoor", defaultImage: outdoor },
  { slotIndex: 7, key: "reception", defaultName: "Reception", defaultImage: Reception },
  { slotIndex: 8, key: "others", defaultName: "Others", defaultImage: Others, isFullWidth: true },
];

function Combo() {
  const navigate = useNavigate();
  const [managedSpaces, setManagedSpaces] = useState({});

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const { data } = await api.get("/category/get-all");
        const spacesMap = {};
        (data?.category || []).forEach((item) => {
          if (item.spaceCategory) {
            const info = {
              name: item.spaceCategory,
              image: item.image ? `${ImageApi}/category-image/${item.image}` : null,
            };
            if (typeof item.slotIndex === "number") {
              spacesMap[item.slotIndex] = info;
            }
            spacesMap[item.spaceCategory.toLowerCase()] = info;
          }
        });
        setManagedSpaces(spacesMap);
      } catch (error) {
        console.log("Error loading space categories", error);
      }
    };
    fetchSpaces();
  }, []);

  const comboStyle = (image, isFullWidth) => ({
    width: "100%",
    height: isFullWidth ? { xs: 180, sm: 240, md: 260 } : { xs: 180, sm: 270, md: 310 },
    borderRadius: 3,
    overflow: "hidden",
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    position: "relative",
    cursor: "pointer",
    boxShadow: "var(--shadow-card)",
    transition: "transform 0.4s ease, box-shadow 0.4s ease",
    "&:hover": {
      transform: "translateY(-4px) scale(1.02)",
      boxShadow: "var(--shadow-card-hover)",
    },
  });

  return (
    <Grid
      container
      columnSpacing={{ xs: 2, sm: 3.5, md: 4.5 }}
      rowSpacing={{ xs: 2, sm: 3.5, md: 4.5 }}
      sx={{
        p: { xs: "12px", sm: "20px" },
        borderRadius: "10px",
        maxWidth: "1400px",
        mx: "auto",
      }}
    >
      {DEFAULT_SPACES.map((spaceItem) => {
        const managed =
          (typeof spaceItem.slotIndex === "number" && managedSpaces[spaceItem.slotIndex]) ||
          managedSpaces[spaceItem.defaultName.toLowerCase()];
        const spaceName = managed?.name || spaceItem.defaultName;
        const spaceImage = managed?.image || spaceItem.defaultImage;

        return (
          <Grid key={spaceItem.key} size={spaceItem.isFullWidth ? 12 : { xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                ...comboStyle(spaceImage, spaceItem.isFullWidth),
                position: "relative",
                display: "flex",
                alignItems: spaceItem.isFullWidth ? "flex-end" : "center",
                justifyContent: "center",
                pb: spaceItem.isFullWidth ? "2rem" : 0,
              }}
              onClick={() => navigate(`/category?q=${encodeURIComponent(spaceName)}`)}
            >
              <Button
                variant="contained"
                size="medium"
                sx={{
                  color: "var(--color-text-inverse)",
                  background: "var(--gradient-brand)",
                  fontSize: { xs: "1rem", md: "1rem" },
                  fontWeight: 600,
                  paddingX: { xs: 3, md: 3.5 },
                  paddingY: { xs: 1.2, md: 1.7 },
                  borderRadius: "120px",
                  borderColor: "var(--color-text-inverse)",
                  textAlign: "center",
                  zIndex: 2,
                  boxShadow: "var(--shadow-brand-strong)",
                }}
                endIcon={<ArrowForwardIcon fontSize="inherit" />}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/category?q=${encodeURIComponent(spaceName)}`);
                }}
              >
                {spaceName}
              </Button>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Combo;
