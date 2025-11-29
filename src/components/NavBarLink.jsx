import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import { useNavigate } from "react-router-dom";
import { useScroll } from "../hook/useScroll";
import TabsBgImg from "../assets/HeaderBg.jpg";

export const tabsStyles = () => ({
  root: {
    minHeight: 44,
  },
  flexContainer: {
    position: "relative",
    padding: "0 3px",
    zIndex: 1,
  },
  indicator: {
    top: 3,
    bottom: 3,
    right: 3,
    height: "auto",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px 0 rgba(0,0,0,0.16)",
  },
});

export const tabItemStyles = (theme) => ({
  root: {
    fontWeight: 500,
    minHeight: 44,
    minWidth: 100,
    opacity: 0.7,
    color: (theme.vars || theme).palette.text.primary,
    textTransform: "initial",
    "&:hover": {
      opacity: 1,
    },
    [`&.${tabClasses.selected}`]: {
      color: (theme.vars || theme).palette.text.primary,
      opacity: 1,
    },
    [theme.breakpoints.up("md")]: {
      minWidth: 120,
    },
  },
});

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

export function TabsApple({ sx }) {
  const navigate = useNavigate();
  const show = useScroll(true);
  const [tabIndex, setTabIndex] = React.useState(0);
  const tabItemSx = toSx(tabItemStyles, tabClasses);
  const Pages = [
    {
      pageName: "Home",
      pageUrl: "/",
    },
    {
      pageName: "Products",
      pageUrl: "products",
    },
    {
      pageName: "Catalog",
      pageUrl: "catalog",
    },
    {
      pageName: "Customization",
      pageUrl: "customization",
    },
    {
      pageName: "Contact Us",
      pageUrl: "about-us",
    },
    {
      pageName: "Blogs",
      pageUrl: "blogs",
    },
    // {
    //   pageName: "Privacy Policy",
    //   pageUrl: "privacy-policy",
    // },
    // {
    //   pageName: "Shipping Policy",

    //   pageUrl: "shipping-policy",
    // },
    // {
    //   pageName: "Refund Policy",
    //   pageUrl: "refund-policy",
    // },
    // {
    //   pageName: "Terms & Condition",
    //   pageUrl: "terms-condition",
    // },
  ];
  return (
    <Box sx={{ display: show ? "block" : "none" }}>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          position: "fixed",
          width: "100%",
          height: "45px",
          opacity: "1",
          zIndex: "1100",
          backgroundImage: `
      linear-gradient(rgba(73, 76, 1, 0.25), rgba(180, 206, 50, 0.11)),
      url(${TabsBgImg}),
      linear-gradient(#ffffff,#ffffff)
    `,
          backgroundSize: "Cover, 100% 100% , cover",
          backgroundPosition: "center, center, center",
          backgroundRepeat: "no-repeat, no-repeat, no-repeat",
          backgroundColor: "transparent",
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={(e, index) => setTabIndex(index)}
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
