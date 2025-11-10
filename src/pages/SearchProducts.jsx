import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FetchAllProductsApi, FetchBannerApi } from "../Api_Action";
import Grid from "@mui/material/Grid";
import ProductCard from "../components/ProductCard";
import Stack from "@mui/material/Stack";
import Filter from "../components/Filter";
import NativeSelect from "@mui/material/NativeSelect";
import Typography from "@mui/material/Typography";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import PaginationOutlined from "../components/Pagination";
import Button from "@mui/material/Button";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import PageLoading from "../components/PageLoading";
import { ImageApi } from "../ImageApi";
const SearchProducts = () => {
  const { search } = useLocation();
  const [queryObj, setQueryObj] = useState({
    search: "",
  });
  const [filter, setFilter] = useState({
    Brand: [],
    Category: [],
    FabricType: [],
    FinishType: [],
    FrameMaterial: [],
    Price: {},
    order: "",
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [maximumPage, setMaximumPage] = useState(0);
  const [value, setValue] = React.useState(30);
  const [Brand, setBrand] = useState([]);
  const [Category, setCategory] = useState([]);
  const [FabricType, setFabricType] = useState([]);
  const [FinishType, setFinishType] = useState([]);
  const [FrameMaterial, setFrameMaterial] = useState([]);
  const [priceRangeValue, setPriceRangeValue] = useState([0, 100000]);
  const [Banner, setBanner] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleChange = (event) => {
    setValue(event.target.value);
    console.log("------>order", event.target.value);
    setFilter((item) => ({ ...item, order: event.target.value }));
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleClose = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const params = new URLSearchParams(search);
    const q = params.get("q");
    if (q) {
      setQueryObj((prev) => ({
        ...prev,
        search: q.replace(/-/g, " "),
      }));
    }
  }, [search]);
  6;
  console.log("=====> total page", maximumPage);

  useEffect(() => {
    const fetchData = async () => {
      if (queryObj.search) {
        const data = await FetchAllProductsApi(
          queryObj.search,
          filter,
          page,
          limit
        );
        if (FrameMaterial.length === 0) {
          // console.log("max:", max, "min:", min);
          // setPriceRangeValue(data?.list?.Price);
          setBrand(data?.list.Brand);
          setCategory(data?.list.Category);
          setFabricType(data?.list.FabricType);
          setFinishType(data?.list.FinishType);
          setFrameMaterial(data?.list.FrameMaterial);
        }
        setIsLoading(false);
        setProducts(data?.product || []);
        setPage(data.page);
        setMaximumPage(Math.ceil(data.count / limit));
        console.log("API response:", data);
      }
    };
    fetchData();
  }, [queryObj, filter, page]);
  const GetBanner = async () => {
    const data = await FetchBannerApi();
    console.log("banananna", data);
    const filter = data.filter(
      (item) => item.isActive == true && item.bannerType === "Search"
    );
    setIsLoading(false);
    setBanner(filter?.[0]);
  };

  useEffect(() => {
    GetBanner();
  }, []);

  return (
    <div>
      <Box>
        {isLoading ? (
          <PageLoading load={isLoading} />
        ) : (
          Banner && (
            <Box
              sx={{
                backgroundImage: {
                  xs: `url(${ImageApi}/banner/${Banner?.mobileImage})`,
                  sm: `url(${ImageApi}/banner/${Banner?.desktopImage})`,
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
      <Grid px={1.3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          px={2}
        >
          <Typography
            fontSize="1.1rem"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Showing {products.length} Products
          </Typography>
          <Button
            disableRipple
            disableFocusRipple
            variant="outlined"
            sx={{
              fontSize: "1.01rem",
              display: { sm: "none" },
              color: "rgb(59, 58, 58)",
              borderRadius: "10px",
            }}
            startIcon={<TuneRoundedIcon fontSize="inherit" />}
            onClick={() => {
              setOpen(!open);
              console.log("Clicked");
            }}
          >
            Filters
          </Button>
          <NativeSelect
            onChange={handleChange}
            value={value}
            disableUnderline
            IconComponent={UnfoldMoreIcon}
            sx={{
              "& .MuiInputBase-input": {
                p: 1,
                fontWeight: 400,
              },

              border: "1.1px solid rgb(59, 58, 58),",
              borderRadius: "10px",
            }}
          >
            <option value="Newest">Newest</option>
            <option value="LowToHigh">Price:Low to High</option>
            <option value="HighToLow">Price:High to Low</option>
          </NativeSelect>
        </Stack>
        <Grid container py={3}>
          <Grid
            size={{ xs: 0, sm: 4, md: 2.9, lg: 2.4 }}
            height="100%"
            px={2}
            py={2}
            sx={{
              border: "solid 1.90px rgba(145, 142, 142, 0.45) ",
              borderRadius: 2,
              display: { xs: "none", sm: "block" },
            }}
          >
            <Filter
              search={queryObj.search}
              brands={Brand}
              categories={Category}
              FabricType={FabricType}
              FinishType={FinishType}
              FrameMaterial={FrameMaterial}
              priceRangeValue={priceRangeValue}
              setPriceRangeValue={setPriceRangeValue}
              setProducts={setProducts}
              filter={filter}
              setFilter={setFilter}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 9.1, lg: 9.6 }} px={2}>
            <Stack rowGap={4}>
              <Grid
                container
                direction="row"
                flexWrap="wrap"
                columnGap={2}
                rowGap={4}
                justifyContent="center"
                alignItems="center"
              >
                {isLoading ? (
                  <PageLoading load={isLoading} />
                ) : (
                  products.map((product) => (
                    <Grid size={{ xs: 10, sm: 5.4, md: 3.7, lg: 2.86 }}>
                      <ProductCard product={product} />
                    </Grid>
                  ))
                )}
              </Grid>
              {products.length === 0 && (
                <Typography variant="h5" textAlign="center">
                  Product is not found
                </Typography>
              )}
            </Stack>
            <PaginationOutlined
              handlePageChange={handlePageChange}
              page={page}
              count={maximumPage} // total pages
            />
          </Grid>
        </Grid>
      </Grid>

      {/* <Drawer open={open} onClose={handleClose}>
        <Box sx={{ p: 2, width: 285, overflowX: "hidden" }}>
          <Filter handleClose={handleClose} />
        </Box>
      </Drawer> */}
    </div>
  );
};

export default SearchProducts;
