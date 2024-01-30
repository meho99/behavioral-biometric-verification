import { CssBaseline, createTheme } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";
import { getComponents } from "./theme.components";
import { getPalette } from "./theme.palette";
import { getTypography } from "./theme.typography";

const getMuiTheme = () => {
  const palette = getPalette();
  const components = getComponents(palette);
  const typography = getTypography(palette);

  return createTheme({
    typography,
    palette,
    components,
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });
};

const theme = getMuiTheme();

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);
