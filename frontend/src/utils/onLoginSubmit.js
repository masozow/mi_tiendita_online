import onSubmit from "./onSubmit";

const onLoginSubmit = async (
  data,
  setIsLoading,
  dispatchSnackbar,
  navigate,
  mutateAsync,
  refetch,
  rolesDictionary
) => {
  const handleSuccess = async (response) => {
    await refetch();
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
    }, 1000);
  };

  await onSubmit(
    data,
    setIsLoading,
    dispatchSnackbar,
    mutateAsync,
    handleSuccess,
    refetch // Pass refetch to onSubmit
  );
};

export default onLoginSubmit;
