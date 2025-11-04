import { createTheme } from "@mui/material/styles";
let theme = createTheme({
  palette: {
    primary: {
      main: "#03A6A1",
    },
    success: {
      main: "#118B50",
    },
    error: {
      main: "#DC2525",
    },
  },
  typography: {
    fontFamily:
      " 'Archivo','Poppins','Roboto', 'Helvetica', 'Arial', sans-serif",
  },
});

export default theme;
