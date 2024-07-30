import { Components, Palette, Theme } from "@mui/material";

import InterMedium from "../assets/fonts/Inter-Medium.ttf";
import InterSemiBold from "../assets/fonts/Inter-Bold.ttf";
import InterBold from "../assets/fonts/Inter-ExtraBold.ttf";

export const getComponents = (palette: Palette): Components<Theme> => {
  return {
    MuiCssBaseline: {
      styleOverrides: `
      body {
        overflow: overlay;
      }

      @font-face {
        font-family: Inter;
        src: url(${InterMedium}) format("truetype");
        font-weight: normal;
      }
  
      @font-face {
        font-family: Inter;
        src: url(${InterSemiBold}) format("truetype");
        font-weight: 600;
      }
  
      @font-face {
        font-family: Inter;
        src: url(${InterBold}) format("truetype");
        font-weight: 700;
      }

      input:-webkit-autofill,
      input:-webkit-autofill:hover, 
      input:-webkit-autofill:focus, 
      input:-webkit-autofill:active{
      -webkit-box-shadow: 0 0 0 30px ${palette.background.default} inset !important;

      `,
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },

      styleOverrides: {
        contained: {
          color: palette.background.default,
        },
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
          paddingBottom: 0,
          paddingTop: 0,
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

    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          fontSize: 13,
          lineHeight: "10px",
          color: palette.background.default,
        },
        root: {
          fontSize: 12,
          paddingTop: 10,
          paddingBottom: 10,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: palette.primary.main,
        },
      },
    },
  };
};
