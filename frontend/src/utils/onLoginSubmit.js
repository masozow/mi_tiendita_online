const onLoginSubmit = async (
  data,
  setIsLoading,
  dispatchSnackbar,
  navigate,
  mutateAsync,
  refetch,
  rolesDictionary
) => {
  setIsLoading(true);
  try {
    const response = await mutateAsync(data); // Esperamos la respuesta de mutateAsync
    console.log("Response: ", response);
    const mensajeSolo = response.data?.toString().split("|")[0].trim();
    dispatchSnackbar({
      type: "OPEN",
      message: mensajeSolo || "Éxito",
      severity: "success",
    });
    await refetch(); // Re-fetch user data after login
    const user = response.data?.user;
    const userRole = parseInt(user?.ID_ROL, 10);
    setTimeout(() => {
      if (userRole === parseInt(rolesDictionary.Cliente, 10)) {
        navigate("/producto/catalogo/");
      } else if (userRole === parseInt(rolesDictionary.Operador, 10)) {
        navigate("/ordenes/historial/");
      } else {
        navigate("/");
      }
      setIsLoading(false);
    }, 1000);
  } catch (error) {
    console.log("Error en onError: ", error);
    const errorMessage = error?.data || "Error desconocido";
    dispatchSnackbar({
      type: "OPEN",
      message: errorMessage,
      severity: "error",
    });
    setIsLoading(false);
  }
};

export default onLoginSubmit;
