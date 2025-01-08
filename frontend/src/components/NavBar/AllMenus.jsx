import { Badge, IconButton, Stack } from "@mui/material";
import MenuComponent from "./MenuComponent";
import { NavLink, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useCustomMutation } from "../../hooks/useLoginMutation";
import MenuComponent from "./MenuComponent";
import Dialogo from "../Dialogo/Dialogo";
import onSubmit from "../../utils/onSubmit";

const menuProductos = [
  { texto: "Listado", URL: "/producto" },
  { texto: "Crear", URL: "/producto/crear" },
  { texto: "Catalogo", URL: "/producto/catalogo" },
];
const menuCategorias = [
  { texto: "Listado", URL: "/categoria" },
  { texto: "Crear", URL: "/categoria/crear" },
];
const menuMarcas = [
  { texto: "Listado", URL: "/marca" },
  { texto: "Crear", URL: "/marca/crear" },
];
const menuUsuarios = [
  { texto: "Listado", URL: "/usuario" },
  { texto: "Crear", URL: "/usuario/crear" },
];
const menuOrdenes = [
  { texto: "Listado", URL: "/ordenes" },
  { texto: "Historial", URL: "/ordenes/historial" },
  { texto: "Crear", URL: "/ordenes/crear" },
];
const menuEstados = [
  { texto: "Listado", URL: "/estado" },
  { texto: "Crear", URL: "/estado/crear" },
];

const navigate = useNavigate();
const { mutateAsync } = useCustomMutation("/api/usuarios/logout", "POST");

const handleLogoutClick = () => {
  onSubmit({}, setIsLoading, dispatchSnackbar, mutateAsync, () => {
    navigate("/login");
  });
};

const menuItems = [
  <MenuComponent titulo="Productos" elementos={menuProductos} />,
  <MenuComponent titulo="Categorias" elementos={menuCategorias} />,
  <MenuComponent titulo="Marcas" elementos={menuMarcas} />,
  <MenuComponent titulo="Usuarios" elementos={menuUsuarios} />,
  <MenuComponent titulo="Ordenes" elementos={menuOrdenes} />,
  <MenuComponent titulo="Estados" elementos={menuEstados} />,
  <Stack direction="row">
    <IconButton component={NavLink} to="/carrito" aria-label="ver su carrito">
      <Badge
        badgeContent={cartItemCount}
        color="primary"
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
        }}>
        <ShoppingCartIcon aria-label="ver su carrito" />
      </Badge>
    </IconButton>
    <IconButton component={NavLink} to="/login">
      <PersonIcon aria-label="iniciar sesión" />
    </IconButton>
    <Dialogo
      onConfirm={handleLogoutClick}
      triggerButton={
        <IconButton>
          <PowerSettingsNewIcon aria-label="cerrar sesión" />
        </IconButton>
      }
      titulo="Cerrar sesión"
      mensaje={`¿Desea cerrar sesión?`}
    />
  </Stack>,
];
