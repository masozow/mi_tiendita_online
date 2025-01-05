const onSubmit = async (
  data,
  setIsLoading,
  dispatchSnackbar,
  mutateAsync,
  onSuccessCallback,
  refetch
) => {
  setIsLoading(true);
  try {
    const response = await mutateAsync(data);
    console.log("Response: ", response);
    const mensajeSolo = response.data?.toString().split("|")[0].trim();
    dispatchSnackbar({
      type: "OPEN",
      message: mensajeSolo || "Éxito",
      severity: mensajeSolo?.toLowerCase().includes("error")
        ? "error"
        : "success",
    });
    if (refetch) {
      await refetch();
    }
    onSuccessCallback(response);
    setIsLoading(false);
  } catch (error) {
    console.log("Error en onSubmit: ", error);
    const errorMessage = error?.data || "Error desconocido";
    dispatchSnackbar({
      type: "OPEN",
      message: errorMessage,
      severity: "error",
    });
    setIsLoading(false);
  }
};

export default onSubmit;
