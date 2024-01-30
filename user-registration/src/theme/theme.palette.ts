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
    // primary: {
    //   // main: "red",
    // },
    // secondary: {},
    // success: {},
    // info: {},
    // error: {},
    // warning: {},
    text: {
      // primary: "#2A3755",
      // disabled: "#9B9B9B",
      // secondary: "#545778",
    },

    background: {
      default: "#242424",
      paper: "#121212",
    },
  });
