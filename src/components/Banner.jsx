import Box from "@mui/material/Box";
import Carousel from "./Carousel";
import { useEffect, useState } from "react";
import { FetchBannerApi } from "../Api_Action";
import { ImageApi } from "../ImageApi";
import PageLoading from "./PageLoading";


function Banner() {
  // const banners = [banner1, banner2, banner3];
  const [banners, setBanners] = useState([]);
  const [Loading, setLoading] = useState(true);
  const GetBanner = async () => {
    const data = await FetchBannerApi();
    console.log("banananna", data);
    const filter = data.filter(
      (item) => item.isActive == true && item.bannerType === "Main"
    );
    console.log("---filter", filter);
    setLoading(false);
    setBanners(filter);
  };
  useEffect(() => {
    GetBanner();
  }, []);
  return (
    <>
      <PageLoading load={Loading} />
      <Carousel>
        {banners?.map((banner, index) => (
          <Box
            sx={{
              //  pt: "200px", 
              backgroundImage: {
                xs: `url(${ImageApi}/banner/${banner?.mobileImage})`,
                sm: `url(${ImageApi}/banner/${banner?.desktopImage})`,
                  // 👈 negative margin to compensate nav height
              },
             
              

              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",

              backgroundSize: {
                xs: "cover",
                sm: "cover",
                md: "cover",
                lg: "cover",
              },

              "@media (min-width: 1200px) and (max-width: 1300px)": {
                aspectRatio: "16 / 4",
                height: "unset",
                minHeight: "380px",
              },
              // aspectRatio: {
              //   xs: "none",
              //   sm: "16 / 7",
              //   md: "16 / 5",
              //   lg: "none",
              // },
              // ❌ remove height for tablet
              height: {
                xs: "40vh",
                sm: "45vh",   // 🔥 REQUIRED
                md: "50vh",
                lg: "70vh",
              },

              // ✅ NOW aspectRatio works
              

              width: "100%",
              m: 0,
              p: 0,
            }}
          />


        ))}
      </Carousel>
    </>
  );
}

export default Banner;
