import MuiButton from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { ButtonProps } from "./Button.types";

export const Button = <D extends React.ElementType = "button", P = object>({
  color,
  disabled,
  children,
  isLoading = false,
  variant,
  ...buttonProps
}: ButtonProps<D, P>) => (
  <MuiButton
    disabled={disabled || isLoading}
    color={color}
    variant={variant}
    {...buttonProps}
  >
    {isLoading && (
      <CircularProgress
        size={25}
        thickness={4}
        sx={{ mr: 1, color: variant === "text" ? "secondary" : "white" }}
      />
    )}
    {!isLoading && children}
  </MuiButton>
);
