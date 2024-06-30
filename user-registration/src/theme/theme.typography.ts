import { Palette } from "@mui/material/styles";
import { TypographyVariantsOptions } from "@mui/material";

export const getTypography = (palette: Palette): TypographyVariantsOptions => ({
  fontFamily: ["Roboto", "Montserrat"].join(","),
  fontSize: 14,
  h1: {
    fontSize: "36px",
    textAlign: "center",
    color: palette.primary?.main,
    marginBottom: "14px",
    fontWeight: 600,
  },
  h2: {
    fontSize: "28px",
  },
  h3: {
    fontSize: "24px",
  },
  h4: {
    fontSize: "20px",
  },
  h5: {
    fontSize: "17px",
  },
  h6: {
    fontSize: "15px",
  },
  body1: {},
  body2: {
    fontSize: "13px",
  },
  subtitle1: {
    fontSize: 15,
  },
  subtitle2: {
    fontWeight: 700,
    fontSize: 15,
  },
  button: {
    fontSize: "19px",
    textTransform: "none",
    fontWeight: 600,
  },
  caption: {
    fontSize: "15px",
  },
});
