// Header.jsx
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import SearchBar from "./SearchBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import MenuBar from "./MenuBar";
import Login from "./Login";
import Badge from "@mui/material/Badge";
import CustomeButton from "./CustomeButton";
import Grow from "@mui/material/Grow";
import Autocomplete from "@mui/material/Autocomplete";
import { useScroll } from "../hook/useScroll";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { ImageApi } from "../ImageApi";

import HeaderBg from "../assets/HeaderBg.jpg";      // <-- make sure this path is correct
import "../components/HeaderBg.css";                   // <-- the CSS file I'll paste below

function Header() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { cart } = useSelector((state) => state.CartState);
  const { isUser } = useSelector((state) => state.UserState);
  const { cmsDate } = useSelector((state) => state.CmsState);

  function handleClose() {
    setShow(!show);
  }

  const searchTerms = [
    "sofa",
    "study table",
    "sofa set",
    "bed",
    "Home and office desks",
    "Bookshelves and Bookcases",
    "Beds with storage",
    "Chest of drawers",
  ];

  return (
    <AppBar
      sx={{
        top: 0,
        height: { xs: "80px", md: "95px" },
        position: { xs: "sticky", md: "sticky" },
        backgroundColor: { xs: "white", md: "white" }, // try explicit white on all sizes
        boxShadow: "0 2px 8px rgba(88, 59, 59, 1)",
        zIndex: 1200,
      }}
    >
      <Toolbar
        className="toolbar-bg"
        style={{
          "--bg-image": `url(${HeaderBg})`,
          "--bg-color": "linear-gradient(#ffffff,#ffffff)",
        }}
        sx={{
          height: "100%",
          backgroundColor: "transparent",
          px: { xs: 1, sm: 2, md: 4 },
        }}
      >
        <Grid container flexGrow={1}>
          <Grid sx={{ width: { xs: "50px", md: "100px" } }}>
            <img
              src={`${ImageApi}/banner/` + cmsDate?.logo}
              alt="logo"
              height="auto"
              width="100%"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            />
          </Grid>
        </Grid>

        <Box
          flexGrow={1}
          sx={{
            
            display: { xs: "none", md: "flex", lg: "flex" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SearchBar />
        </Box>

        <Stack
          flexGrow={0.4}
          direction="row"
          spacing={1}
          justifyContent="flex-end"
          alignItems="center"
        >
           <CustomeButton navigate={navigate} />
          <Login sx={{pl:2,}} />
         

          <Stack direction="row" gap={4} sx={{ display: { xs: "none", sm: "block" } }}>
            <Badge badgeContent={cart?.length || 0} color="error">
              <IconButton onClick={() => navigate("cart")}>
                <ShoppingCartIcon fontSize="medium" />
              </IconButton>
            </Badge>
          </Stack>

          <Box sx={{ width: { md: 40 }, height: { md: 46 } }}>
            <IconButton
              sx={{
                display: { sm: "block", md: true ? "block" : "none" },
                width: 40,
                height: 40,
              }}
              onClick={handleClose}
            >
              <Grow in={{ sm: true, md: true }} {...(true ? { timeout: 1000 } : {})}>
                <MenuIcon />
              </Grow>
            </IconButton>
          </Box>
        </Stack>

        <MenuBar show={show} handleClose={handleClose} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
