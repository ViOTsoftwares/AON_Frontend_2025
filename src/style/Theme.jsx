import { createTheme } from "@mui/material/styles";
import colorControl from "./colorControl.js";

const theme = createTheme({
  palette: {
    primary: {
      main: colorControl.brand.primary,
    },
    secondary: {
      main: colorControl.brand.secondary,
    },
    text: {
      primary: colorControl.text.primary,
      secondary: colorControl.text.secondary,
    },
    background: {
      default: colorControl.surface.page,
      paper: colorControl.surface.base,
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
        color: colorControl.brand.accent,
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
