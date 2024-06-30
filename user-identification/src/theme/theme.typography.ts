import { Palette } from "@mui/material/styles";
import { TypographyVariantsOptions } from "@mui/material";

export const getTypography = (palette: Palette): TypographyVariantsOptions => ({
  fontFamily: ["Roboto", "Montserrat"].join(","),
  fontSize: 12,
  h1: {
    fontSize: "28px",
    textAlign: "center",
    fontWeight: 600,
    color: palette.primary?.main,
  },
  h2: {
    fontSize: "20px",
    textAlign: "center",
    lineHeight: "15px",
  },
  h3: {
    fontSize: "18px",
  },
  h4: {
    fontSize: "16px",
  },
  h5: {
    fontSize: "14px",
  },
  h6: {
    fontSize: "12px",
  },
  body1: {},
  body2: {
    fontSize: "11px",
  },
  subtitle1: {
    fontSize: 15,
  },
  subtitle2: {
    fontWeight: 700,
    fontSize: 15,
  },
  button: {
    fontSize: "17px",
    textTransform: "none",
    fontWeight: 600,
  },
  caption: {
    fontSize: "13px",
  },
});
