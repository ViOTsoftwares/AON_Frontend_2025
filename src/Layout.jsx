import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import NavBarLink from "./components/NavBarLink";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getCMSApi } from "./Api_Action";
import { useDispatch } from "react-redux";
import { GetCMS } from "./slice/CMS_Slice";
import { useEffect } from "react";
function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const FetchCms = async () => {
    const data = await getCMSApi();
    dispatch(GetCMS(data));
  };
  useEffect(() => {
    FetchCms();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Header />
      {isMobile ? (
        <Toolbar
          sx={{
            position: "sticky",
            top: "0px",
            backgroundColor: "#1976d2",
            zIndex: "1100",
            height: "74px",
          }}
        >
          <SearchBar />
        </Toolbar>
      ) : (
        <NavBarLink />
      )}

      <Stack direction="column" sx={{ mt: { xs: "0.20rem", md: "2.8rem" } }}>
        <Outlet />
        {/* <ScrollToTop
       
          smooth
          style={{ borderRadius: "50%", backgroundColor: "whitesmoke" }}
          width="100"
          height="100"
          component={<NorthIcon />}
        /> */}
      </Stack>

      <Footer />
    </ThemeProvider>
  );
}

export default Layout;
