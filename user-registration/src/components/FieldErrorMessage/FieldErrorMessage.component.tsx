import { FieldError } from "react-hook-form";

import Typography from "@mui/material/Typography";

import { FieldErrorMessageProps } from "./FieldErrorMessage.types";
import { FieldsErrors } from "../../constants";

export const getFieldError = (error: FieldError | undefined) => {
  if (!error) {
    return undefined;
  }

  const messageByType = FieldsErrors[error.type as keyof typeof FieldsErrors];
  if (messageByType) {
    return messageByType;
  }
  if (error.message) {
    return error.message;
  }
  return "Field Invalid";
};

export const FieldErrorMessage = ({ error }: FieldErrorMessageProps) => (
  <Typography color="error">{getFieldError(error)}</Typography>
);
