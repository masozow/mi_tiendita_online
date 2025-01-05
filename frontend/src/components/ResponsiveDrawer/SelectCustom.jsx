import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useQueryHook } from "../../hooks/useQueryHook";

/**
 * Componente de selección personalizado que utiliza react-query para
 * obtener los datos de la API. El componente recibe como props:
 * - label: el texto que se va a mostrar en el label del select
 * - handleSelectionChange: la función que se va a llamar cuando se
 *   cambie el valor del select
 * - id: el id que se va a asignar al select
 * - incomingStateValue: el valor actual del select, controlado desde
 *   un estado en el componente padre, que importa a este componente
 * - queryKey: la clave que se va a utilizar para hacer la consulta a
 *   la API, e identificar al query en el cache
 * - URL: la URL de la API a la que se va a hacer la consulta
 *
 * El componente devuelve un FormControl que contiene un Select con
 * las opciones cargadas desde la API. Si la consulta está cargando,
 * se muestra un mensaje de "Cargando...". Si hay un error en la
 * consulta, el componente no muestra nada.
 **/
const SelectCustom = ({
  label,
  handleSelectionChange,
  id,
  incomingStateValue,
  queryKey,
  URL,
}) => {
  const { data, isLoading, error } = useQueryHook(queryKey, URL);
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={`${id}-select`}
        value={incomingStateValue}
        label={label}
        onChange={(event) => handleSelectionChange(event.target.value)}>
        <MenuItem value={0}>
          <em>--Ninguna--</em>
        </MenuItem>
        {isLoading ? (
          <MenuItem value="">
            <em>Cargando...</em>
          </MenuItem>
        ) : (
          data.data?.map((item) => (
            <MenuItem key={item.ID} value={item.ID}>
              {item.NOMBRE}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};

export default SelectCustom;
