import Stack from "@mui/material/Stack";
import Banner from "../components/Banner";
import Combo from "../components/Combo";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Category from "../components/Category";
import category1 from "../assets/category2.png";
import category2 from "../assets/category4.png";
import category3 from "../assets/category3.png";
import category4 from "../assets/category4.png";
import category5 from "../assets/category1.png";
import category6 from "../assets/category1.png";
import category7 from "../assets/category3.png";
import category8 from "../assets/Customisation.jpeg";
import Doodle from "../assets/Doodle.png";
import "../pages/Home.css";


import Box from "@mui/material/Box";
import BestSelling from "../components/BestSelling";
import Testimonial from "../components/Testimonial";
import CustomizationSection from "../components/CustomizationSection";
import BlogCard from "../components/BlogCard";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FetchBannerApi, FetchBlogApi } from "../Api_Action";
import PageLoading from "../components/PageLoading";
import { ImageApi } from "../ImageApi";
import api from "../BasaApi";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { UserLogin } from "../slice/UserSlice";
function Home() {
  const category = [
    { title: "Chairs & Seating", image: category1, path: "Chairs" },
    { title: "Sofas & Lounges", image: category2, path: "Sofa" },
    { title: "Recliners", image: category3, path: "Recliners" },
    { title: "Tables & Workstations", image: category4, path: "Tables" },
    { title: "Cabinets & Storage", image: category5, path: "Storage" },
    { title: "Beds & Mattresses", image: category6, path: "Beds" },
    { title: "Dining & Kitchen", image: category7, path: "Dining-sets" },
    { title: "Customisation", image: category8, path: "Customisation" },
  ];
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
      const decode = jwtDecode(token);
      dispatch(UserLogin(decode));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
  }, [token]);

  const [blogPoster, setBlogPoster] = useState([]);
  const [firstSubbanner, setFirstSubBanner] = useState({});
  const [secondSubbanner, setSecondSubBanner] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const GetBanner = async () => {
    const data = await FetchBannerApi();
    console.log("banananna", data);
    const filter = data.filter(
      (item) => item.isActive == true && item.bannerType === "SubMain"
    );

    setIsLoading(false);
    setFirstSubBanner(filter?.[0]);
    setSecondSubBanner(filter?.[1]);
  };

  useEffect(() => {
    GetBanner();
  }, []);

  useEffect(() => {
    const handleFetchBloge = async () => {
      const data = await FetchBlogApi();
      setBlogPoster(data?.blogs);
    };
    handleFetchBloge();
  }, []);

  return (
    <Stack spacing={2}>
      <Banner />

      <Grid
        className="outer-grid-bg"
        sx={{ p: { xs: 2, md: 4 } }}
        style={{
          "--top-image": `url(${Doodle})`,        // picture ON TOP
          "--bottom-color": "linear-gradient(#ffffffff, #ffffffff)",  // color BEHIND
        }}
      >
        <Typography
          variant="h4"
          textAlign={{ sm: "center" }}
          fontSize={{ xs: "2rem", sm: "3rem" }}
          sx={{ fontWeight: 600 }}
          gutterBottom
        >
          Explore Our Furnitures
        </Typography>

        <Grid
          container
          spacing={{ xs: 1, sm: 2 }}
        // justifyContent="center"
        // rowGap={2}
        // columnGap={4}
        >
          {category &&
            category.map((ct) => (
              <Grid size={{ xs: 3, sm: 3, md: 3 }} key={ct.path}>
                <Link
                  to={
                    ct.path === "Customisation"
                      ? "/customization"
                      : `/category?q=${ct.path}`
                  }
                >
                  <Category title={ct.title} image={ct?.image} />
                </Link>
              </Grid>
            ))}
        </Grid>
      </Grid>

      <Box sx={{ alignSelf: "center", width: "100%" }}>

        <BestSelling />
      </Box>

      <Box>
        {isLoading ? (
          <PageLoading load={isLoading} />
        ) : (
          firstSubbanner && (
            <Box
              sx={{
                backgroundImage: {
                  xs: `url(${ImageApi}/banner/${firstSubbanner?.mobileImage})`,
                  sm: `url(${ImageApi}/banner/${firstSubbanner?.desktopImage})`,
                },
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                height: { xs: "20vh", sm: "40vh", md: "45vh", lg: "52vh" },
                width: "100%",
              }}
            />
          )
        )}
      </Box>

      <Box
  sx={{
    py: { xs: 3, sm: 8 },
    px: { xs: 2, sm: 6 },
    textAlign: "center",
  }}
>
  <Typography
    component="h2"
    sx={{
      fontWeight: 0,
      fontSize: { xs: "2rem", sm: "2.8rem", md: "3.2rem" },
      lineHeight: 1.2,
      mb: { xs: 2, sm: 4 },
      fontFamily: "Inter, Poppins, sans-serif",
      letterSpacing: "-0.6px",
      color: "#1a1a1a",
    }}
  >
    Shop{" "}
    <Box
  component="span"
  sx={{
    background: "linear-gradient(90deg, #d4bea5 0%, #ff005d 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: 800,
  }}
>
  By Space
</Box>
  </Typography>

  <Combo />
</Box>


      <Box>


        <Grid
          sx={{
            borderRadius: "12px",
            overflow: "hidden",

            backgroundImage: `
      linear-gradient(rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.61)),
      url(${Doodle}),
      linear-gradient(#ffffff,#ffffff)
    `,
            backgroundSize: "cover, cover, cover",
            backgroundPosition: "center, center, center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <CustomizationSection />
        </Grid>

      </Box>

      <Box>
        {isLoading ? (
          <PageLoading load={isLoading} />
        ) : (
          secondSubbanner && (
            <Box
              sx={{
                backgroundImage: {
                  xs: `url(${ImageApi}/banner/${secondSubbanner?.mobileImage})`,
                  sm: `url(${ImageApi}/banner/${secondSubbanner?.desktopImage})`,
                },
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                height: { xs: "20vh", sm: "40vh", md: "45vh", lg: "54vh" },
                width: "100%",
              }}
            />
          )
        )}
      </Box>

      <Box
        sx={{
          p: { xs: 0, sm: 4, md: 6 },
          backgroundColor: "#E8F6FF",
        }}
      >
        <Testimonial />
      </Box>

      <Stack bgcolor="#FAFAFA">
        <Typography
          variant="h3"
          textAlign="center"
          lineHeight={1.6}
          fontWeight={770}
        >
          Blogs & Guides
        </Typography>
        <Typography
          variant="body1"
          fontSize="1.2rem"
          color="textSecondary"
          textAlign="center"
          lineHeight={{ xs: 2, sm: 4 }}
        >
          Discover expert tips, market trends, and essential knowledge to make
          informed furniture.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "column", md: "row" }}
          columnGap={2}
          rowGap={4}
          justifyContent="center"
          alignItems="center"
          p={4}
        >
          {blogPoster && blogPoster.map((blog) => <BlogCard blog={blog} />)}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Home;
