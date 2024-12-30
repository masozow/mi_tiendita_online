import React from "react";
import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

const TextInput = ({ name, label, type, rules, register = name }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TextField
      id={name}
      name={name}
      label={label}
      type={type}
      variant="outlined"
      fullWidth
      {...register(register, rules)}
      error={!!errors[name]}
      helperText={errors[name]?.message}
    />
  );
};

export default TextInput;
