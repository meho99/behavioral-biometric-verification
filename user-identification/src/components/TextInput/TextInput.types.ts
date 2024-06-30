import {
  Control,
  FieldPath,
  FieldError,
  ControllerProps,
  FieldValues,
} from "react-hook-form";
import { TypographyProps } from "@mui/material/Typography";
import { GridProps, TextFieldProps } from "@mui/material";

export type InputType = "text" | "email" | "password" | "date";

export type TextInputProps = Partial<Omit<TextFieldProps, "error">> & {
  title?: string;
  error?: FieldError;
  labelSx?: TypographyProps["sx"];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ControlledInputType<FormValues extends FieldValues> = {
  name: FieldPath<FormValues>;
  control: Control<FormValues>;
  rules?: ControllerProps<FormValues>["rules"];
  type?: InputType;
};

export type ControlledInputProps<FormValues extends FieldValues> =
  ControlledInputType<FormValues> &
    Omit<TextInputProps, "error"> & {
      parser?: (val: string) => string;
    };

export type ControlledInputGridProps<FormValues extends FieldValues> = {
  gridProps?: GridProps;
} & ControlledInputProps<FormValues>;
