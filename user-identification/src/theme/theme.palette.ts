import createPalette from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {}

declare module "@mui/material/Checkbox" {
  interface CheckboxPropsSizeOverrides {
    large: true;
  }
}

export const getPalette = () =>
  createPalette({
    mode: "dark",
    primary: {
      main: "#308284",
    },
    // secondary: {},
    success: {
      main: "#308284",
    },
    // info: {},
    error: {
      main: "#f33738",
    },
    // warning: {},
    text: {
      primary: "#D8D8D8",
      disabled: "#9B9B9B",
      // secondary: "#707070",
    },

    background: {
      default: "#121212",
      paper: "#4a4a4a",
    },
  });
