import { createTheme } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(103, 43, 43, 1)",
    },
    secondary: {
      main: "#e38f61ff",
    },
  },
  components: {
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       textTransform: "none",
    //       variants: [
    //         {
    //           props: { variant: "contained" },
    //           style: {
    //             backgroundColor: "rgba(103, 43, 43, 1)",
    //             textTransform: "none",
    //             borderRadius: "12px",
    //           },
    //         },
    //       ],
    //     },
    //   },
    // },
    MuiTab: {
      style: {
        backgroundColor: "transparent",
      },
    },
    MuiSlider: {
      style: {
        color: "#D1855C",
      },
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
