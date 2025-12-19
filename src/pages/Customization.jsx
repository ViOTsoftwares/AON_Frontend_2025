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
      
      
        <Chatbox/>
        
      <Grid
        flexDirection={{ xs: "column", sm: "row" }}
        container
        p={{ xs: 2, md: 6 }}
        py={{ lg: 14 }}
        rowGap={{ xs: 2 }}
        bgcolor="rgba(121, 98, 98, 0.27)"
      > <Grid container mt={1} justifyContent="center" textAlign="center">

  {/* 🔶 Row 1 — Center Title */}
  <Grid item xs={12}>
    <Typography
      variant="body1"
      fontWeight={800}
      lineHeight={2}
      fontSize={{ xs: "1.2rem", sm: "2rem" }}
    >
      The Furniture is beautiful
    </Typography>
  </Grid>

  {/* 🔶 Row 2 — Icons Row centered */}
  <Grid
    item
    xs={12}
    container
    justifyContent="center"
    alignItems="center"
    columnGap={3}
    rowGap={2}
    mt={1}
  >
    {/* Item 1 */}
    <Grid item>
      <Stack direction="row" spacing={1} alignItems="center">
        <Paper elevation={0}
            sx={{ width: 50, height: 50, display: "flex", justifyContent: "center", borderRadius: "40%", backgroundColor:"transparent" ,alignItems: "center" }}>
          <ChairOutlinedIcon fontSize="large" />
        </Paper>
        <Typography variant="body1" fontWeight={600} color="rgba(94,16,14,0.836)">
          <CountUp from={1} to={100} duration={0.78} />+ Collections
        </Typography>
      </Stack>
    </Grid>

    {/* Item 2 */}
    <Grid item>
      <Stack direction="row" spacing={1} alignItems="center">
        <Paper elevation={0}
            sx={{ width: 50, height: 50, display: "flex", justifyContent: "center", borderRadius: "40%", backgroundColor:"transparent" ,alignItems: "center" }}>
          <SpaceDashboardOutlinedIcon fontSize="large" />
        </Paper>
        <Typography variant="body1" fontWeight={600} color="rgba(94,16,14,0.836)">
          <CountUp from={1} to={50} duration={0.78} />+ Fabrics
        </Typography>
      </Stack>
    </Grid>

    {/* Item 3 */}
    <Grid item>
      <Stack direction="row" spacing={1} alignItems="center">
        <Paper elevation={0}
            sx={{ width: 50, height: 50, display: "flex", justifyContent: "center", borderRadius: "40%", backgroundColor:"transparent" ,alignItems: "center" }}>
          <SquareFootOutlinedIcon fontSize="large" />
        </Paper>
        <Typography variant="body1" fontWeight={600} color="rgba(94,16,14,0.836)">
          <CountUp from={1} to={10} duration={0.78} />+ Sofa Legs
        </Typography>
      </Stack>
    </Grid>

    {/* Item 4 */}
    <Grid item>
      <Stack direction="row" spacing={1} alignItems="center">
        <Paper elevation={0}
            sx={{ width: 50, height: 50, display: "flex", justifyContent: "center", borderRadius: "40%", backgroundColor:"transparent" ,alignItems: "center" }}>
          <ChairAltOutlinedIcon fontSize="large" />
        </Paper>
        <Typography variant="body1" fontWeight={600} color="rgba(94,16,14,0.836)">
          Length & Size
        </Typography>
      </Stack>
    </Grid>

    {/* Item 5 */}
    <Grid item>
      <Stack direction="row" spacing={1} alignItems="center">
        <Paper elevation={0}  
          sx={{ width: 50, height: 50, display: "flex", justifyContent: "center", borderRadius: "40%", backgroundColor:"transparent" ,alignItems: "center" }}>
          <EnergySavingsLeafOutlinedIcon fontSize="large" />
        </Paper>
        <Typography variant="body1" fontWeight={600} color="rgba(94,16,14,0.836)">
          Seat Cushions
        </Typography>
      </Stack>
    </Grid>

  </Grid>
</Grid>


      <Grid size={{ xs: 12, sm: 6, md: 7, lg: 6 }} alignItems="flex-start" >
  <div style={{ borderRadius: "24px", overflow: "hidden" }}>
  <ReactCompareImage
    borderRadius="16px"
    leftImage={left}
    rightImage={right}
    aspectRatio="wider"
    skeleton
    leftImageAlt="Before"
    rightImageAlt="After"
    leftImageLabel="Before"
    rightImageLabel="After"
  />
</div>
</Grid>

<Grid size={{ xs: 12, sm: 6, md: 5 }} sx={{ mr: { md: 2 }, ml:{md:2} }}>
  <CustomForm size={{ xs: 12, sm: 6, md: 4 }} />
</Grid>

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
         
        </Grid>
      </Grid>
    </Stack>
  );
}

export default Customization;
