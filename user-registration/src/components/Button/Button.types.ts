import { ButtonProps as MuiButtonProps } from "@mui/material/Button";

export type ButtonProps<
  D extends React.ElementType = "button",
  P = object
> = MuiButtonProps<D, P> & {
  isLoading?: boolean;
};
