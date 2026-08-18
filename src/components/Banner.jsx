import Box from "@mui/material/Box";
import Carousel from "./Carousel";
import { useEffect, useState } from "react";
import { FetchBannerApi } from "../Api_Action";
import { ImageApi } from "../ImageApi";
import PageLoading from "./PageLoading";

function Banner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBanner = async () => {
      const data = await FetchBannerApi();
      const activeMainBanners = data.filter(
        (item) => item.isActive === true && item.bannerType === "Main",
      );

      setBanners(activeMainBanners);
      setLoading(false);
    };

    getBanner();
  }, []);

  return (
    <>
      <PageLoading load={loading} />
      <Carousel className="hero-carousel">
        {banners.map((banner) => (
          <Box
            key={banner?._id || banner?.id}
            sx={{
              backgroundImage: {
                xs: `url(${ImageApi}/banner/${banner?.mobileImage || banner?.desktopImage})`,
                sm: `url(${ImageApi}/banner/${banner?.desktopImage})`,
              },
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              aspectRatio: { xs: "3 / 2.5", sm: "4.3 / 1" },
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
