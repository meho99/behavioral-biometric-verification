import { Palette } from "@mui/material/styles";
import { TypographyVariantsOptions } from "@mui/material";

export const getTypography = (palette: Palette): TypographyVariantsOptions => ({
  fontFamily: ["Inter"].join(","),
  fontSize: 15,
  h1: {
    fontSize: "32px",
    textAlign: "center",
    fontWeight: 600,
    color: palette.primary?.main,
    marginBottom: 15,
  },
  h2: {
    fontSize: "22px",
    textAlign: "center",
  },
  h3: {
    fontSize: "20px",
  },
  h4: {
    fontSize: "18px",
    fontWeight: 600,
  },
  h5: {
    fontSize: "16px",
  },
  h6: {
    fontSize: "14px",
  },
  body1: {},
  body2: {
    fontSize: "12px",
  },
  subtitle1: {
    fontSize: 15,
  },
  subtitle2: {
    fontWeight: 700,
    fontSize: 15,
  },
  button: {
    fontSize: "16px",
    textTransform: "none",
    fontWeight: 600,
  },
  caption: {
    fontSize: "15px",
  },
});
