import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import NavBarLink from "./components/NavBarLink";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import NorthIcon from "@mui/icons-material/North";
import CustomeButton from "./components/CustomeButton";
import { getCMSApi, TrackSiteVisiterApi } from "./Api_Action";
import { useDispatch } from "react-redux";
import { GetCMS } from "./slice/CMS_Slice";
import { useEffect, useState } from "react";

export default function Layout() {
  const theme = useTheme(); // expects a ThemeProvider higher in the tree (typical in App)
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  // CMS fetch
  useEffect(() => {
    const fetchCms = async () => {
      try {
        const data = await getCMSApi();
        dispatch(GetCMS(data));
      } catch (err) {
        console.error("Failed to fetch CMS:", err);
      }
    };
    fetchCms();
  }, [dispatch]);

  // Site visitor tracking — once per IST calendar day (resets at IST midnight)
  useEffect(() => {
    // Get current date in IST (Asia/Kolkata) as "YYYY-MM-DD"
    const todayIST = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    }); // → "2026-06-17"

    const lastTracked = sessionStorage.getItem("sv_tracked_date");
    if (lastTracked === todayIST) return; // already tracked today

    const trackVisitor = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) return;
        const geoData = await res.json();
        await TrackSiteVisiterApi(geoData);
        sessionStorage.setItem("sv_tracked_date", todayIST);
      } catch (err) {
        console.error("Visitor tracking failed:", err);
      }
    };
    trackVisitor();
  }, []);


  useEffect(() => {
    // use rAF to reduce updates and be smooth
    let ticking = false;
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 0;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(shouldBeScrolled);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // run once to set initial state (in case page loaded scrolled)
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header />

      {isMobile ? (
        <Toolbar
          sx={{
            position: "fixed",
            top: isScrolled ? 0 : "60px",
            width:"100%",
            backgroundColor: "rgba(241, 234, 234, 0.91)",
            zIndex: 1200,
            height: "74px",
            paddingTop: 0,
          }}
        >
          {" "}
          <CustomeButton navigate={navigate} />
          <SearchBar />
        </Toolbar>
      ) : (
        <NavBarLink />
      )}

      <Stack direction="column" sx={{ mt: { xs: "4.8rem", md: "9.5rem" } }}>
        <Outlet />
        {/* Uncomment and configure ScrollToTop if you want */}
        {/* <ScrollToTop smooth component={<NorthIcon />} /> */}
      </Stack>

      <Footer />
    </>
  );
}
