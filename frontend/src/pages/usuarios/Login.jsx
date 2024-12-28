import React from "react";
import { TextField, Button, Stack, Typography, Container } from "@mui/material";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    // Handle successful form submission
    console.log(data);
  };

  return (
    <Container disableGutters>
      <Typography variant="h4" color="inherit ">
        Iniciar sesión
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <TextField
            id="email"
            name="email"
            label="Correo"
            type="email"
            variant="standard"
            textAlign="center"
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "El correo no es válido",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            id="password"
            name="password"
            label="Contraseña"
            type="password"
            variant="standard"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained" color="primary">
            Iniciar Sesión
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default Login;
