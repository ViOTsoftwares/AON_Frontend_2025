import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ProcardCard from "./ProductCard";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import product1 from "../assets/product1.png";
import product2 from "../assets/product2.png";
import product3 from "../assets/product3.png";
import product4 from "../assets/product4.png";
import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import { useEffect, useState } from "react";
import { BestSellingProductApi } from "../Api_Action";
import PageLoading from "./PageLoading";

const TabItem = styled(Tab)(({ theme }) => ({
  position: "relative",
  borderRadius: "30px",
  textAlign: "center",
  transition: "all .5s",
  padding: "10px 15px",

  height: "auto",
  margin: "10px 0",
  marginLeft: "10px",
  float: "none",
  fontSize: "16px",
  fontWeight: "500",
  backgroundColor: "#D7E8F5",

  [`&.${tabClasses.selected}`]: {
    // ,&:hover
    color: "#FFFFFF",
    backgroundColor: "#1976d2",
  },
}));
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function BestSelling() {
  const [tabIndex, setTabIndex] = useState(0);
  const [bestSelling, setBestSelling] = useState([]);

  const [navTitle, setNavTitle] = useState([]);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const FetchBestSelling = async () => {
    const data = await BestSellingProductApi(category);
    setIsLoading(false);
    if (navTitle.length == 0) {
      setNavTitle(data?.navTitle);
    }
    setBestSelling(data?.product);
  };
  useEffect(() => {
    FetchBestSelling();
  }, [category]);
  return (
    <Stack spacing={2} direction="column">
      <Typography
        component="h2"
        sx={{ fontWeight: 600, fontSize: { xs: "3rem", sm: "3.5rem" } }}
        textAlign="center "
      >
        Our <span style={{ color: "#1976D2" }}>Best Selling </span>
      </Typography>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Tabs
          value={tabIndex}
          onChange={(e, index) => {
            setCategory(navTitle[index]);
            setTabIndex(index);
            setIsLoading(true);
          }}
          sx={{
            [`& .${tabsClasses.indicator}`]: {
              display: "none",
            },
            width: { xs: 310, sm: "auto", md: "auto" },
          }}
          variant="scrollable"
        >
          {navTitle &&
            navTitle.map((selling, index) => (
              <TabItem
                disableRipple
                label={selling}
                key={index}
                {...a11yProps(index)}
              />
            ))}
        </Tabs>
      </Stack>
      {isLoading ? (
        <PageLoading load={isLoading} />
      ) : (
        navTitle &&
        navTitle.map((title, index) => (
          <CustomTabPanel value={tabIndex} index={index} key={index}>
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 2, opacity: 1 }}
                exit={{ y: -10, opacity: 1 }}
                transition={{ duration: 0.58 }}
              >
                <Grid
                  container
                  spacing={{ xs: 1, md: 1 }}
                  sx={{ px: 2 }}
                  alignItems="center"
                  justifyContent="center"
                >
                  {bestSelling &&
                    bestSelling.map((product, i) => (
                      <Grid
                        size={{ xs: 6, sm: 2.8, md: 2.8 }}
                        sx={{ alignItems: "stretch" }}
                      >
                        <ProcardCard product={product} />
                      </Grid>
                    ))}
                </Grid>
              </motion.div>
            </AnimatePresence>
          </CustomTabPanel>
        ))
      )}
    </Stack>
  );
}

export default BestSelling;
