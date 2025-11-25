import Grid from "@mui/material/Grid";
import CustomForm from "../components/CustomForm";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import ChairAltOutlinedIcon from "@mui/icons-material/ChairAltOutlined";
import EnergySavingsLeafOutlinedIcon from "@mui/icons-material/EnergySavingsLeafOutlined";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import ChairOutlined from "@mui/icons-material/ChairOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import custom from "../assets/customize.jpg";
import ReactCompareImage from "react-compare-image";
import left from "../assets/left.jpg";
import right from "../assets/right.jpg";
import CountUp from "../components/Animations/Counter";
import { useEffect } from "react";
import Chatbox from "../components/Chatbot";

function Customization() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
  }, []);

  return (
    <Stack>
      <Grid
        container
        flexDirection="row"
        py={{ xs: 3, sm: 9, md: 16 }}
        sx={{
          backgroundImage: `url(${custom})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Grid size={{ xs: 12, sm: 6 }}></Grid>
        
      </Grid>
      
        <Chatbox/>
      <Grid
        flexDirection={{ xs: "column", sm: "row" }}
        container
        p={{ xs: 2, md: 6 }}
        py={{ lg: 14 }}
        rowGap={{ xs: 2 }}
        bgcolor="rgba(54, 154, 221, 0.17)"
      >
        <Grid size={{ xs: 12, sm: 6, md: 5, lg: 6 }}>
          <Typography variant="body2" color="textSecondary">
            {" "}
            Main Difference
          </Typography>
          <Typography
            variant="body1"
            fontWeight={800}
            lineHeight={2}
            fontSize={{ xs: "1rem", sm: "2rem" }}
          >
            The Furniture is beautiful
          </Typography>
          <Stack rowGap={2} mt={1}>
            <Stack flexDirection="row" columnGap={2} alignItems="center">
              <Paper
                elevation={3}
                sx={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ChairOutlinedIcon fontSize="large" />
              </Paper>
              <Typography variant="body1" textAlign="center" color="primary">
                <CountUp
                  from={1}
                  to={100}
                  separator=""
                  direction="up"
                  duration={0.78}
                />
                + Collections
              </Typography>
            </Stack>
            <Stack flexDirection="row" columnGap={2} alignItems="center">
              <Paper
                elevation={3}
                sx={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SpaceDashboardOutlinedIcon fontSize="large" />
              </Paper>
              <Typography variant="body1" textAlign="center" color="primary">
                <CountUp
                  from={1}
                  to={50}
                  separator=""
                  direction="up"
                  duration={0.78}
                />
                + Fabircs
              </Typography>
            </Stack>{" "}
            <Stack flexDirection="row" columnGap={2} alignItems="center">
              <Paper
                elevation={3}
                sx={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SquareFootOutlinedIcon fontSize="large" />
              </Paper>
              <Typography variant="body1" textAlign="center" color="primary">
                <CountUp
                  from={1}
                  to={10}
                  separator=""
                  direction="up"
                  duration={0.78}
                />
                + Sofa Legs
              </Typography>
            </Stack>{" "}
            <Stack flexDirection="row" columnGap={2} alignItems="center">
              <Paper
                elevation={3}
                sx={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ChairAltOutlinedIcon fontSize="large" />
              </Paper>
              <Typography variant="body1" textAlign="center" color="primary">
                Length & Size
              </Typography>
            </Stack>{" "}
            <Stack flexDirection="row" columnGap={2} alignItems="center">
              <Paper
                elevation={3}
                sx={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <EnergySavingsLeafOutlinedIcon fontSize="large" />
              </Paper>
              <Typography variant="body1" textAlign="center" color="primary">
                Seat Cushions
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 7, lg: 6 }} alignSelf="center">
          <ReactCompareImage
            leftImage={left}
            rightImage={right}
            aspectRatio="wider"
            skeleton={true}
            leftImageAlt="Before"
            rightImageAlt="After"
            leftImageLabel="Before"
            rightImageLabel="After"
          />
        </Grid>
      </Grid>
      <Grid
        container
        px={{ xs: 5, md: 8 }}
        flexDirection="column"
        rowGap={2}
        py={{ lg: 4 }}
      >
        <Grid>
          <Typography variant="h4" textAlign="center">
            Why Choose Arun Office Needs
          </Typography>
          <Typography variant="body1" textAlign="center" lineHeight="4rem">
            Looking for your dream furniture? We make it easy to customise
            furniture
          </Typography>
        </Grid>
        <Grid
          size={12}
          container
          columns={{ xs: 12, sm: 24, md: 24, lg: 20.6 }}
          rowGap={{ xs: 2, sm: 2, md: 5 }}
          columnGap={{ xs: 0, sm: 1, md: 4 }}
          justifyContent="stretch"
        >
          <Grid size={{ xs: 12, sm: 11.5, md: 11, lg: 10 }} alignSelf="stretch">
            <Paper
              sx={{
                display: "flex",
                padding: { xs: "1rem", sm: "1.5", md: "2.8rem" },
                borderRadius: "0.70rem",
                gap: 2,
                height: "100%",
              }}
              elevation={4}
            >
              <ChairOutlined sx={{ fontSize: "5rem" }} color="info" />
              <Typography whiteSpace="pre-line" fontSize="14px">
                Manufacturer Arun Office Needs offer a more controlled and
                personalized experience with extensive customization options.
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 10 }} alignSelf="stretch">
            <Paper
              sx={{
                display: "flex",
                padding: { xs: "1rem", sm: "1.5", md: "2.8rem" },
                borderRadius: "0.70rem",
                gap: 2,
                height: "100%",
              }}
              elevation={4}
            >
              <Inventory2OutlinedIcon sx={{ fontSize: "5rem" }} color="info" />

              <Typography whiteSpace="pre-line" fontSize="14px">
                Wholesaler The Arun Office Needs model provides a more
                streamlined, consistent, and customer-focused approach compared
                to the market model.
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 11.5, md: 11, lg: 10 }} alignSelf="stretch">
            <Paper
              sx={{
                display: "flex",
                padding: { xs: "1rem", sm: "1.5", md: "2.8rem" },
                borderRadius: "0.70rem",
                gap: 2,
                height: "100%",
              }}
              elevation={4}
            >
              <PeopleAltOutlinedIcon sx={{ fontSize: "5rem" }} color="info" />

              <Typography fontSize="14px">
                Retailer Arun Office Needs a strong choice for retailers looking
                to offer high-quality, customizable furniture with reliable
                service and support.
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 10 }} alignSelf="stretch">
            <Paper
              sx={{
                display: "flex",
                padding: { xs: "1rem", sm: "1.5", md: "2.8rem" },
                borderRadius: "0.70rem",
                gap: 2,
                height: "100%",
              }}
              elevation={4}
            >
              <LocalShippingOutlinedIcon
                sx={{ fontSize: "5rem" }}
                color="info"
              />

              <Typography fontSize="14px">
                Customer Arun Office Needs an attractive option for customers
                seeking high-quality, customizable furniture with a reliable and
                customer-focused experience.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          sx={{
            alignSelf: "center",
            borderRadius: "20px",
            width: { xs: "100%", sm: "35%", md: "20%", lg: "16%" },
            fontSize: "0.95rem",
            p: 1,
          }}
        >
          CUSTOMIZE NOW
        </Button>
      </Grid>
      <Grid container>
        <Grid
          size={{ xs: 12, sm: 6 }}

          // sx={{backgroundImage}}
        ></Grid>
        <Grid
          size={{ xs: 12, sm: 6 }}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid size={12}>
            <CustomForm />
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default Customization;
