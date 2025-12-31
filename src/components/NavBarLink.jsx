import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import { useNavigate, useLocation } from "react-router-dom";
import { useScroll } from "../hook/useScroll";
import TabsBgImg from "../assets/HeaderBg.jpg";
import "./NavBar.css";

/* ---------------- Tabs styles ---------------- */

export const tabsStyles = () => ({
  root: {
    minHeight: 44,
  },
  flexContainer: {
    position: "relative",
    padding: "0 6px",
    zIndex: 1,
  },
  indicator: {
    top: 6,
    bottom: 6,
    right: 3,
    height: "auto",
    borderRadius: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.36)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.16)",
  },
});

export const tabItemStyles = (theme) => ({
  root: {
    fontWeight: 600,
    minHeight: 44,
    minWidth: 100,
    padding: "6px 16px",
    opacity: 0.75,
    color: "rgba(59, 23, 23, 1)",
    textTransform: "initial",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "&:hover": {
      opacity: 1,
    },

    [`&.${tabClasses.selected}`]: {
      opacity: 1,
      color: "rgba(59, 23, 23, 1)",
    },

    [theme.breakpoints.up("md")]: {
      minWidth: 120,
    },
  },
});

/* ---------------- Utility ---------------- */

function toSx(styles, classes) {
  return function sxCallback(theme) {
    let sx = {};
    Object.entries(styles(theme)).forEach(([key, value]) => {
      if (key === "root") {
        sx = { ...sx, ...value };
      } else {
        sx[`& .${classes[key]}`] = value;
      }
    });
    return sx;
  };
}

/* ---------------- Component ---------------- */

export function TabsApple({ sx }) {
  const navigate = useNavigate();
  const location = useLocation();
  const show = useScroll(true);

  const tabItemSx = toSx(tabItemStyles, tabClasses);

  const Pages = [
    { pageName: "Home", pageUrl: "/" },
    { pageName: "Products", pageUrl: "/products" },
    { pageName: "Catalog", pageUrl: "/catalog" },
    { pageName: "Customization", pageUrl: "/customization" },
    { pageName: "Contact Us", pageUrl: "/about-us" },
    { pageName: "Blogs", pageUrl: "/blogs" },
  ];

  /* 🔥 Route-driven tab index (SOURCE OF TRUTH) */
  const currentTabIndex = Pages.findIndex(
    (pg) => location.pathname === pg.pageUrl
  );

  const safeTabIndex = currentTabIndex === -1 ? 0 : currentTabIndex;

  return (
    <Box sx={{ display: show ? "block" : "none" }}>
      <Stack
        className="tabs-bg"
        style={{
          "--bg-mask": `linear-gradient(rgba(73, 76, 1, 0.25), rgba(180, 206, 50, 0.11))`,
          "--bg-image": `url(${TabsBgImg})`,
          "--bg-color": "linear-gradient(#ffffff,#ffffff)",
        }}
        justifyContent="center"
        alignItems="center"
        sx={{
          position: "fixed",
          top:"96px",
          width: "100%",
          height: "56px",
          zIndex: 1100,
        }}
      >
        <Tabs
          value={safeTabIndex}
          sx={[
            toSx(tabsStyles, tabsClasses),
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        >
          {Pages.map((pg, i) => (
            <Tab
              key={i}
              disableRipple
              label={pg.pageName}
              sx={tabItemSx}
              onClick={() => navigate(pg.pageUrl)}
            />
          ))}
        </Tabs>
      </Stack>
    </Box>
  );
}

export default TabsApple;
