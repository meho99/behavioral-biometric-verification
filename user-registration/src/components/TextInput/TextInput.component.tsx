import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { FieldErrorMessage } from "../FieldErrorMessage/FieldErrorMessage.component";
import { TextInputProps } from "./TextInput.types";

export const TextInput = ({
  title,
  value,
  onChange,
  labelSx,
  error,
  InputLabelProps,
  ...inputProps
}: TextInputProps) => (
  <Box>
    <TextField
      label={title}
      error={!!error}
      value={value}
      onChange={onChange}
      InputLabelProps={{ sx: labelSx, ...InputLabelProps }}
      {...inputProps}
    />
    <FieldErrorMessage error={error} />
  </Box>
);
