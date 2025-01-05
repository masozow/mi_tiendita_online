import React from "react";
import { TextField, Button, Stack } from "@mui/material";

const LoginForm = ({ register, errors, isLoading, onSubmit, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2}>
        <TextField
          id="email"
          name="email"
          label="Correo"
          type="email"
          variant="outlined"
          {...register("correo")}
          error={!!errors.correo}
          helperText={errors.correo?.message}
        />
        <TextField
          id="password"
          name="password"
          label="Contraseña"
          type="password"
          variant="outlined"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained" disabled={isLoading}>
          {isLoading ? "Cargando..." : "Iniciar sesión"}
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
