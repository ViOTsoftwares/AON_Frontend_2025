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
            loading="lazy"
            key={index}
            sx={{
              // backgroundImage: `url(${ImageApi}/banner/${banner?.imageUri})`,
              backgroundImage: {
                xs: `url(${ImageApi}/banner/${banner?.mobileImage})`, // For small screens
                sm: `url(${ImageApi}/banner/${banner?.desktopImage})`, // For larger screens
              },
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              height: { xs: "40vh", sm: "58vh", md: "50vh", lg: "70vh" },
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
