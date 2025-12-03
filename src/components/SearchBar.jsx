import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const placeholderOptions = [
    "Sofa Couch",
    "Dining Table",
    "Dining Chair",
    "Queen Bed",
    "King Bed",
    "Office Chair",
    "Coffee Table",
    "Wardrobe",
    "Study Table",
    "Work Desk",
    "Bedside Table",
    "Bookshelf",
    "TV Unit",
    "Chest Of Drawers",
    "Shoe Rack",
    "Recliner Chair",
    "Dressing Table",
  ];
  const [show, setShow] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(
    placeholderOptions[0]
  );
  const navigate = useNavigate();

  const doNavigate = (value) => {
    const query = value.trim().replace(/\s+/g, "-");
    if (query) navigate("/search?q=" + query);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && show.trim() !== "") {
      doNavigate(show);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % placeholderOptions.length
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentPlaceholder(placeholderOptions[currentIndex]);
  }, [currentIndex, placeholderOptions]);

  return (
    <FormControl fullWidth>
      <OutlinedInput
        value={show}
        type="text"
        placeholder={`Search for ${currentPlaceholder}`}
        endAdornment={
          <>
            <Box sx={{ width: "50px" }}>
              {show && (
                <IconButton
                  aria-label="clear search"
                  onClick={() => setShow("")}
                  sx={{
                    color: "gray",
                    // Clear icon hover color
                    "&:hover": {
                      color: "#8f5438",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <ClearIcon />
                </IconButton>
              )}
            </Box>

            <Button
              onClick={() => show.trim() && doNavigate(show)}
              color="gradient"
              sx={{
                color: "whitesmoke",
                height: "inherit",
                width: { xs: "38%", md: "20%" },
                minWidth: "56px",
                borderRadius: "0px 50px 50px 0px",
                background:
                  "linear-gradient(135deg, #8f5438 0%, #5e3e30ff 100%)",
                // Hover effect for button: darker gradient + shadow
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #7a3f2b 0%, #4b2b20 100%)",
                  boxShadow: "0 6px 18px rgba(92, 58, 48, 0.25)",
                  transform: "translateY(-1px)",
                },
                // target the icon inside to change color smoothly on hover
                ".MuiSvgIcon-root": {
                  transition: "color 160ms ease",
                },
              }}
            >
              <SearchIcon sx={{ fontSize: "30px" }} />
            </Button>
          </>
        }
        sx={{
          borderRadius: "50px",
          padding: "0px",
          backgroundColor: { md: "rgba(246, 246, 246, 1)", xs: "white" },
          borderColor: "rgba(246, 246, 246, 1)",
          height: { xs: "50px", md: "47px" },
          " fieldset": {
            borderWidth: "0px",
          },
          ".MuiOutlinedInput-input::placeholder": {
            color: "gray",
            fontSize: "1em",
            opacity: 1,
          },
          // INPUT container hover/focus styles:
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          },
          "&.Mui-focused": {
            boxShadow: "0 6px 20px rgba(143,84,56,0.12)",
          },
          // smoother transition for hover/focus
          transition: "box-shadow 180ms ease, transform 120ms ease",
        }}
        onChange={(e) => setShow(e.target.value)}
        onKeyDown={handleSearch}
        inputProps={{
          "aria-label": "search products",
        }}
      />
    </FormControl>
  );
}

export default SearchBar;
