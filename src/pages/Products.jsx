import React from "react";
import ProductCard from "../components/ProductCard";
import Stack from "@mui/material/Stack";
import Filter from "../components/Filter";
import NativeSelect from "@mui/material/NativeSelect";
import Typography from "@mui/material/Typography";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import Grid from "@mui/material/Grid";
import PaginationOutlined from "../components/Pagination";
import Button from "@mui/material/Button";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { useState } from "react";
import { useEffect } from "react";
import {
  FetchAllProductsApi,
  FetchBannerApi,
  FetchBlogApi,
} from "../Api_Action";
import PageLoading from "../components/PageLoading";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { ImageApi } from "../ImageApi";
function Products() {
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
  const [limit, setLimit] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [maximumPage, setMaximumPage] = useState(0);
  const [value, setValue] = useState(30);
  const [Brand, setBrand] = useState([]);
  const [Category, setCategory] = useState([]);
  const [FabricType, setFabricType] = useState([]);
  const [FinishType, setFinishType] = useState([]);
  const [FrameMaterial, setFrameMaterial] = useState([]);
  const [priceRangeValue, setPriceRangeValue] = useState([0, 50000]);
  const [Banner, setBanner] = useState({});
  const [chips, setChip] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const GetBanner = async () => {
    setLoading(true);
    const data = await FetchBannerApi();
    const filter = data.filter(
      (item) => item.isActive == true && item.bannerType === "Product"
    );
    setLoading(false);
    setBanner(filter?.[0]);
    setIsLoading(false);
  };

  useEffect(() => {
    GetBanner();
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setLoading(true);
      const data = await FetchAllProductsApi("", filter, page, limit);
      if (FrameMaterial.length === 0) {
        setBrand(data?.list.Brand);
        setCategory(data?.list.Category);
        setFabricType(data?.list.FabricType);
        setFinishType(data?.list.FinishType);
        setFrameMaterial(data?.list.FrameMaterial);
      }
      setIsLoading(false);
      setLoading(false);
      setProducts(data?.product || []);
      setPage(data.page);
      setMaximumPage(Math.ceil(data.count / limit));
    };
    fetchData();
  }, [filter, page]);

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
          backgroundPosition: "center",
          height: { xs: "15vh", sm: "25vh", md: "30vh", lg: "35vh" },
          width: "100%",
         
        }}
      />
    )
  )}
</Box>

      <Grid px={1.3} pt={2} >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={2}
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
              color: "var(--color-text-secondary)",
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

              border: "1.1px solid var(--color-text-secondary)",
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
              border: "solid 1.90px var(--color-border-muted) ",
              borderRadius: 2,
              display: { xs: "none", sm: "block" },
            }}
          >
            <Filter
              // search={queryObj.search}
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
              chips={chips}
              setChip={setChip}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 9.1, lg: 9.1 }} px={1}>
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
                    <Grid
                      key={product._id}
                      size={{ xs: 5.7, sm: 5.4, md: 3.7, lg: 2.81 }}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "stretch",
                      }}
                    >
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
              totalPages={maximumPage} // total pages
            />
          </Grid>
        </Grid>
      </Grid>
      <Drawer open={open} onClose={handleClose}>
        <Box sx={{ p: 2, width: 320, overflowX: "hidden" }}>
          <Filter
            handleClose={handleClose}
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
            chips={chips}
            setChip={setChip}
          />
        </Box>
      </Drawer>
    </div>
  );
}

export default Products;
