import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF0000",
    },
    background: {
      default: "#000000",
      paper: "#1C1C1C",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#FF0000",
    },
  },
});

export default theme;
