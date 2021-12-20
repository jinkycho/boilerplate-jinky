import { createTheme } from "@material-ui/core";
import BreakpointOverrides from "@material-ui/core/styles/createBreakpoints";

declare module "@material-ui/core/styles/createBreakpoints" {
  interface BreakpointOverrides {
    xs: false;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#2BEF57",
    },
    secondary: {
      main: "#040828",
    },
    error: {
      main: "#FF8989",
    },
  },
  breakpoints: {
    values: {
      sm: 0,
      md: 768,
      lg: 1024,
      xl: 1200,
    },
  },
});

export default theme;
