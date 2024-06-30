import { Grid } from "@mui/material";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { FieldsErrors } from "../../constants";
import { TextInput } from "./TextInput.component";
import {
  InputType,
  ControlledInputProps,
  ControlledInputGridProps,
} from "./TextInput.types";

export const ControlledInput = <FormValues extends FieldValues>({
  name,
  type = "text",
  rules,
  control,
  parser,
  ...inputProps
}: ControlledInputProps<FormValues>) => {
  const inputValidation: Record<
    InputType,
    UseControllerProps<FormValues>["rules"]
  > = {
    email: {
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: FieldsErrors.InvalidEmail,
      },
    },
    text: {},
    password: {
      minLength: {
        value: 8,
        message: FieldsErrors.PasswordTooShort,
      },
    },
    date: {},
  };

  return (
    <Controller
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextInput
          {...inputProps}
          onChange={onChange}
          error={error}
          value={parser ? parser(value) : value}
          type={type}
        />
      )}
      name={name}
      control={control}
      rules={{
        required: FieldsErrors.required,
        ...inputValidation[type],
        ...rules,
      }}
    />
  );
};

export const ControlledInputGrid = <FormValues extends FieldValues>({
  gridProps,
  ...inputProps
}: ControlledInputGridProps<FormValues>) => {
  return (
    <Grid item {...gridProps}>
      <ControlledInput {...inputProps} />
    </Grid>
  );
};
