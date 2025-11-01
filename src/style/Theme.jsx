import { createTheme } from "@mui/material";
const theme = createTheme({

  components: {
    MuiButton: {
      variants: [
        {
          props: { color: "gradient" },
          style: {
            background: "linear-gradient(135deg, #1976d2, rgb(11, 206, 255))",
            "&:hover": {
              background: "linear-gradient(135deg,rgb(11, 206, 255), #1976d2 )",

              cursor: "pointer",
            },
          },
        },
      ],
    },
  },
  typography: {
    fontFamily: ' "Mukta","Roboto", "Helvetica", "Arial", "sans-serif"',
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
