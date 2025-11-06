import Stack from "@mui/material/Stack";
import Banner from "../components/Banner";
import Combo from "../components/Combo";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Category from "../components/Category";
import category1 from "../assets/category1.png";
import category2 from "../assets/category2.png";
import category3 from "../assets/category3.png";
import category4 from "../assets/category4.png";
import Box from "@mui/material/Box";
import BestSelling from "../components/BestSelling";
import Testimonial from "../components/Testimonial";
import CustomizationSection from "../components/CustomizationSection";
import BlogCard from "../components/BlogCard";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FetchBannerApi, FetchBlogApi } from "../Api_Action";
import PageLoading from "../components/PageLoading";
import { ImageApi } from "../ImageApi";

function Home() {
  const category = [
    { title: "Sofa", image: category1, path: "Sofa" },
    { title: "Recliners", image: category2, path: "Recliners" },
    { title: "Beds", image: category3, path: "Beds" },
    { title: "Dining  sets", image: category4, path: "Dining-sets" },
    { title: "Dressing   Table", image: category2, path: "Dressing-Table" },
  ];

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
    console.log("---filter", filter);

    setIsLoading(false);
    setFirstSubBanner(filter?.[0]);
    setSecondSubBanner(filter?.[1]);
  };
  useEffect(() => {
    GetBanner();
  }, []);
  
  useEffect(() => {
    const handleFetchBanner = async () => {
      const data = await FetchBlogApi();
      setBlogPoster(data?.blogs);
    };
    handleFetchBanner();
  }, []);
  return (
    <Stack spacing={2}>
      <Banner />

      <Grid
        sx={{
          p: 4,
        }}
      >
        <Typography
          variant="h5"
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
          justifyContent="center"
          rowGap={2}
          columnGap={2}
        >
          {category &&
            category.map((ct) => {
              return (
                <Grid size={{ xs: 12, sm: 2.6 }}>
                  <Link to={"/category?q=" + ct.path}>
                    <Category title={ct.title} image={ct?.image} />
                  </Link>
                </Grid>
              );
            })}
        </Grid>
      </Grid>

      <Box sx={{ alignSelf: "center", width: "100%" }}>
        <BestSelling />
      </Box>
      <Box sx={{ padding: { xs: 0, sm: 6 } }}>
        <Combo />
      </Box>
      <Box>
        <CustomizationSection />
      </Box>
      <Box>
        {isLoading ? (
          <PageLoading load={isLoading} />
        ) : (
          firstSubbanner && (
            <Box
              sx={{
                backgroundImage: {
                  xs: `url(${ImageApi}/banner/${firstSubbanner?.mobileImage})`, // For small screens
                  sm: `url(${ImageApi}/banner/${firstSubbanner?.desktopImage})`, // For larger screens
                },
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                height: { xs: "40vh", sm: "58vh", md: "60vh", lg: "70vh" },
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
      <Box>
        {isLoading ? (
          <PageLoading load={isLoading} />
        ) : (
          secondSubbanner && (
            <Box
              sx={{
                backgroundImage: {
                  xs: `url(${ImageApi}/banner/${secondSubbanner?.mobileImage})`, // For small screens
                  sm: `url(${ImageApi}/banner/${secondSubbanner?.desktopImage})`, // For larger screens
                },
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                height: { xs: "40vh", sm: "58vh", md: "60vh", lg: "70vh" },
                width: "100%",
              }}
            />
          )
        )}
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
