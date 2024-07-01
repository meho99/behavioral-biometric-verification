import { Palette } from "@mui/material/styles";
import { TypographyVariantsOptions } from "@mui/material";

export const getTypography = (palette: Palette): TypographyVariantsOptions => ({
  fontFamily: ["Inter"].join(","),
  fontSize: 12,
  h1: {
    fontSize: "26px",
    textAlign: "center",
    fontWeight: 600,
    color: palette.primary?.main,
    marginBottom: 15,
  },
  h2: {
    fontSize: "17px",
    textAlign: "center",
  },
  h3: {
    fontSize: "16px",
  },
  h4: {
    fontSize: "15px",
    fontWeight: 600,
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
    fontSize: "13px",
    textTransform: "none",
    fontWeight: 600,
  },
  caption: {
    fontSize: "13px",
  },
});
