import { useParams } from "react-router-dom";
import FormUsuarios from "./FormUsuarios";
import { useQueryHook } from "../../hooks/useQueryHook";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const ModificarUsuario = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQueryHook(
    `ObtenerUsuario_${id}`,
    `/api/usuarios/${id}`
  );
  const {
    data: dataCliente,
    isLoading: isLoadingCliente,
    error: errorCliente,
  } = useQueryHook(
    `ObtenerClientePorUsuario_${id}`,
    `/api/clientes/idUsuario/${id}`
  );
  const [usuario, setUsuario] = useState({
    correo: "",
    nombre: "",
    password: "",
    confirmarContrasena: "",
    telefono: "",
    fechaNacimiento: "",
    idCliente: 1,
    idEstado: 1,
    idRol: 1,
    razonSocial: "",
    direccion: "",
  });

  useEffect(() => {
    if (data?.data && data?.data.length > 0) {
      const usuarioData = data.data[0];
      const usuarioBase = {
        correo: usuarioData.CORREO,
        nombre: usuarioData.NOMBRE,
        password: usuarioData.PASSWORD,
        telefono: usuarioData.TELEFONO,
        fechaNacimiento: usuarioData.FECHA_NACIMIENTO,
        idEstado: usuarioData.ID_ESTADO,
        idRol: usuarioData.ID_ROL,
      };
      setUsuario({
        ...usuarioBase,
      });
      if (dataCliente?.data && dataCliente?.data.length > 0) {
        console.log("Dentro de dataCliente: ", dataCliente);
        const clienteData = dataCliente.data[0];
        setUsuario((prev) => ({
          ...prev,
          idCliente: clienteData.ID,
          razonSocial: clienteData.RAZON_SOCIAL,
          direccion: clienteData.DIRECCION_ENTREGA,
        }));
      }
    }
  }, [data, dataCliente]);

  return isLoading || isLoadingCliente ? (
    <Typography>Cargando...</Typography>
  ) : error || errorCliente ? (
    <div>
      Error: {error.message} || {errorCliente.message}
    </div>
  ) : (
    <>
      {(usuario.correo && usuario.idCliente) || usuario.correo ? (
        <FormUsuarios
          data={usuario}
          URL={
            dataCliente?.data && dataCliente?.data.length > 0
              ? `/api/usuarios/cliente/${id}`
              : `/api/usuarios/${id}`
          }
          httpMethod="PUT"
          submitMessage="Modificar Usuario"
        />
      ) : (
        <Typography>Cargando...</Typography>
      )}
    </>
  );
};

export default ModificarUsuario;
