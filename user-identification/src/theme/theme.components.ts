import { Components, Palette, Theme } from "@mui/material";

// import MontserratMedium from "../assets/fonts/Montserrat-Medium.ttf";
// import MontserratSemiBold from "../assets/fonts/Montserrat-SemiBold.ttf";
// import MontserratBold from "../assets/fonts/Montserrat-Bold.ttf";

export const getComponents = (_palette: Palette): Components<Theme> => {
  return {
    MuiCssBaseline: {
      styleOverrides: `
      body {
        overflow: overlay;
      }
      `,
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          overflowX: "hidden",
          height: "100%",
          paddingTop: 25,
          paddingBottom: 25,
          paddingLeft: 20,
          paddingRight: 20,
        },
        disableGutters: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
      defaultProps: {
        maxWidth: false,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          paddingTop: 10,
          paddingBottom: 10,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          top: "-5px",
        },
      },
    },
  };
};
