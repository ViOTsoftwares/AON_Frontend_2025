// Header.jsx
import AppBar from "@mui/material/AppBar";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import SearchBar from "./SearchBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import MenuBar from "./MenuBar";
import Login from "./Login";
import Badge from "@mui/material/Badge";
import CustomeButton from "./CustomeButton";
import Grow from "@mui/material/Grow";
import { useSelector } from "react-redux";
import { ImageApi } from "../ImageApi";

import HeaderBg from "../assets/HeaderBg.jpg"; // <-- make sure this path is correct
import "../components/HeaderBg.css"; // <-- the CSS file I'll paste below

function Header() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { cart } = useSelector((state) => state.CartState);
  const { cmsDate } = useSelector((state) => state.CmsState);

  function handleClose() {
    setShow(!show);
  }

  return (
    <AppBar sx={{ position: { xs: "static", md: "fixed" } }}>
      <Toolbar
        className="toolbar-bg"
        style={{
          "--bg-image": `url(${HeaderBg})`,
          "--bg-color": "var(--gradient-header-overlay) ",
        }}
      >
        <Grid container flexGrow={0.4}>
          <Grid sx={{ width: { xs: "220px", md: "360px" } }}>
            <img
              src={`${ImageApi}/testimonial/` + cmsDate?.logo}
              alt="logo"
              height="100%"
              width="100%"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            />
          </Grid>
        </Grid>

        <Box
          flexGrow={1.2}
          sx={{
            display: { xs: "none", md: "flex", lg: "flex" },
            ml: 1,
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
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <CustomeButton navigate={navigate} />
          </Box>
          <Login sx={{ pl: 2, pt: 1}} />

          <Stack
            direction="row"
            gap={4}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Tooltip title="Cart" placement="bottom" arrow>
  <IconButton
    onClick={() => navigate("/cart")}
    aria-label={`Cart with ${cart?.length || 0} items`}
  >
    <Badge
      badgeContent={cart?.length}
      color="error"
      invisible={!cart?.length}   // ✅ hides badge when 0
    >
      <ShoppingCartIcon
        sx={{ width: 32, height: 34, color: "var(--color-text-inverse)" }}
        fontSize="medium"
      />
    </Badge>
  </IconButton>
</Tooltip>

          </Stack>
 <Tooltip title="Menu" placement="bottom" arrow>
          <Badge>
              <IconButton
              sx={{
                width: 40,
                height: 40,
              }}
              onClick={handleClose}
            >
              <Grow in={true} timeout={1000}>
                <MenuIcon
                  sx={{
                    color: "var(--color-text-inverse)",
                    width: 30,
                    height: 30,
                  }}
                />
              </Grow>
            </IconButton>
             
            </Badge>
 </Tooltip>
          {/* Hamburger: visible on mobile only, hidden on md+
          <Box sx={{ width: { md: 90 }, height: { md: 95 } }}>
            <IconButton
              sx={{
                width: 40,
                height: 40,
              }}
              onClick={handleClose}
            >
              <Grow in={true} timeout={1000}>
                <MenuIcon sx={{ color: "white" }} />
              </Grow>
            </IconButton>
          </Box> */}
        </Stack>

        <MenuBar show={show} handleClose={handleClose} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
