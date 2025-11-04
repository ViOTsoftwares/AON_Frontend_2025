import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
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
  const navigate = useNavigate()
 const handleSearch = (e) => {
  if (e.key === "Enter" && show.trim() !== "") {
    const query = show.trim().replace(/\s+/g, "-"); 
    // OR: const query = encodeURIComponent(show.trim());
    navigate("/search?q=" + query);
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
                <IconButton onClick={() => setShow("")}>
                  <ClearIcon></ClearIcon>
                </IconButton>
              )}
            </Box>
          
              <Button
                color="gradient"
                sx={{
                  color: "whitesmoke",
                  height: "inherit",
                  width: "20%",

                  borderRadius: "0px 50px 50px 0px",
                }}
              >
                <SearchIcon sx={{ fontSize: "30px" }} />
              </Button>
           
          </>
        }
        sx={{
          borderRadius: "50px",

          padding: "0px",
          backgroundColor: { md: "rgb(215, 232, 245)", xs: "white" },
          border: "solid 2px 2px 2px 0px rgb(193, 228, 255)",
          height: {xs:"38px",md:"47px"},
          " fieldset": {
            borderWidth: "0px",
          },
          ".MuiOutlinedInput-input::placeholder": {
            color: "gray",
            fontSize: "1em",
            opacity: 1,
          },
          // "&.Mui-focused fieldset": {
          //   border: "0",
          // },
        }}
        onChange={(e) => setShow(e.target.value)}
        onKeyDown={handleSearch}
      ></OutlinedInput>
    </FormControl>
  );
}

export default SearchBar;
