import Stack from "@mui/material/Stack";
import Banner from "../components/Banner";
import Combo from "../components/Combo";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Category from "../components/Category";
import category1 from "../assets/Grid1.png";
import category2 from "../assets/Grid2.png";
import category3 from "../assets/Grid3.png";
import category4 from "../assets/Grid4.png";
import category5 from "../assets/Grid5.png";
import category6 from "../assets/Grid6.png";
import category7 from "../assets/Grid7.png";
import category8 from "../assets/Grid8.png";
import Doodle from "../assets/Doodle.png";
import "../pages/Home.css";
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
import api from "../BasaApi";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { UserLogin } from "../slice/UserSlice";
import officeChairs from "../assets/categories/Office_Chairs.png";
import officeTables from "../assets/categories/Office_Tables.png";
import workstations from "../assets/categories/Workstations.png";
import storageCabinets from "../assets/categories/Storage_Cabinets.png";
import officeSeating from "../assets/categories/Office_Seating.png";
import partitions from "../assets/categories/Partitions.png";
import sofas from "../assets/categories/Sofas.png";
import recliners from "../assets/categories/Recliners.png";
import dining from "../assets/categories/Dining.png";
import beds from "../assets/categories/Beds.png";
import homeStorage from "../assets/categories/Home_Storage.png";
import customization from "../assets/categories/Customization.png";

const DEFAULT_TOP_CATEGORIES = [
  { slotIndex: 0, defaultName: "Office Chairs", defaultImage: officeChairs },
  { slotIndex: 1, defaultName: "Office Tables", defaultImage: officeTables },
  { slotIndex: 2, defaultName: "Workstations", defaultImage: workstations },
  { slotIndex: 3, defaultName: "Storage & Cabinets", defaultImage: storageCabinets },
  { slotIndex: 4, defaultName: "Office Seating", defaultImage: officeSeating },
  { slotIndex: 5, defaultName: "Partitions", defaultImage: partitions },
  { slotIndex: 6, defaultName: "Sofas", defaultImage: sofas },
  { slotIndex: 7, defaultName: "Recliners", defaultImage: recliners },
  { slotIndex: 8, defaultName: "Dining", defaultImage: dining },
  { slotIndex: 9, defaultName: "Beds", defaultImage: beds },
  { slotIndex: 10, defaultName: "Home Storage", defaultImage: homeStorage },
  { slotIndex: 11, defaultName: "Customization", defaultImage: customization, path: "/customization" },
];

function Home() {
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
  }, [dispatch, token]);

  const [blogPoster, setBlogPoster] = useState([]);
  const [firstSubbanner, setFirstSubBanner] = useState({});
  const [secondSubbanner, setSecondSubBanner] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [managedTypeCategories, setManagedTypeCategories] = useState({});

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

  useEffect(() => {
    const fetchManagedCategories = async () => {
      try {
        const { data } = await api.get("/category/get-all");
        const categoryMap = {};
        (data?.category || []).forEach((item) => {
          if (item.category) {
            const info = {
              name: item.category,
              image: item.image ? `${ImageApi}/category-image/${item.image}` : null,
            };
            if (typeof item.slotIndex === "number") {
              categoryMap[item.slotIndex] = info;
            }
            categoryMap[item.category.toLowerCase()] = info;
          }
        });
        setManagedTypeCategories(categoryMap);
      } catch (error) {
        console.log("Unable to load managed category images", error);
      }
    };

    fetchManagedCategories();
  }, []);

  return (
    <Stack spacing={1}>
      <Banner />

      <Grid
        className="outer-grid-bg"
        sx={{ px: { xs: 2, md: 4 }, py: { xs: 2, md: 2.5 }, mt: 0 }}
        style={{
          "--top-image": `url(${Doodle})`,
          "--bottom-color": "var(--color-surface)",
          mixBlendMode: "multiply",
        }}
      >
        <Typography
          variant="h4"
          textAlign={{ sm: "center" }}
          fontSize={{ xs: "1.3rem", sm: "1.8rem", md: "2.1rem" }}
          sx={{ fontWeight: 600, mb: 1.5 }}
        >
          Explore Our Furnitures
        </Typography>

        <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
          {DEFAULT_TOP_CATEGORIES.map((slotItem) => {
            const managed =
              (typeof slotItem.slotIndex === "number" && managedTypeCategories[slotItem.slotIndex]) ||
              managedTypeCategories[slotItem.defaultName.toLowerCase()];

            const displayName = managed?.name || slotItem.defaultName;
            const displayImage = managed?.image || slotItem.defaultImage;
            const linkPath = slotItem.path || `/categories/${encodeURIComponent(displayName)}`;

            return (
              <Grid key={slotItem.defaultName} size={{ xs: 6, sm: 4, md: 2 }}>
                <Box
                  component={Link}
                  to={linkPath}
                  sx={{
                    display: "block",
                    borderRadius: { xs: 2, md: 3 },
                    overflow: "hidden",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": { transform: "translateY(-4px)", boxShadow: "var(--shadow-card)" },
                  }}
                >
                  <Box
                    component="img"
                    src={displayImage}
                    alt={displayName}
                    sx={{ display: "block", width: "100%", height: "auto" }}
                  />
                </Box>
              </Grid>
            );
          })}
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
            color: "var(--color-text-primary)",
          }}
        >
          Shop{" "}
          <Box
            component="span"
            sx={{
              background: "var(--gradient-title-highlight)",
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
      var(--gradient-card-overlay),
      url(${Doodle}),
      var(--color-surface)
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
          backgroundColor: "var(--color-surface-muted)",
        }}
      >
        <Testimonial />
      </Box>

      <Stack bgcolor="var(--color-surface)">
        <Typography
          variant="h4"
          paddingTop={2}
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
          {blogPoster &&
            blogPoster.map((blog, i) => <BlogCard blog={blog} key={i} />)}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Home;
