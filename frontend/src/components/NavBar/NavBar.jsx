import {
  AppBar,
  Box,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Menu,
  MenuItem,
  MenuList,
  Badge,
} from "@mui/material";
import React from "react";
import "./NavBar.module.css";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useShoppingCart } from "../../store/ShoppingCartContext";
import MenuComponent from "./MenuComponent";

const NavBar = () => {
  const theme = useTheme();
  const { cartState } = useShoppingCart();
  const cartItemCount = Object.keys(cartState).length;
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
      <IconButton>
        <PowerSettingsNewIcon aria-label="cerrar sesión" />
      </IconButton>
    </Stack>,
  ];

  const [anchorNav, setAnchorNav] = useState(null);
  const openMenu = (event) => {
    setAnchorNav(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorNav(null);
  };

  return (
    <AppBar
      elevation={0}
      position="fixed"
      color="inherit"
      sx={{ backgroundColor: theme.palette.background.default }}>
      <Toolbar sx={{ minHeight: "3rem" }}>
        <IconButton
          component={NavLink}
          to="/"
          edge="start"
          sx={{ display: { xs: "flex", md: "none" } }}>
          <StorefrontIcon />
        </IconButton>
        <Container sx={{ flexGrow: 1 }}>
          <Typography
            component={NavLink}
            to="/"
            variant="h5"
            sx={{ display: { xs: "none", md: "flex" } }}>
            Mi tiendita
          </Typography>
        </Container>
        <Stack
          direction={"row"}
          spacing={1}
          sx={{ display: { xs: "none", md: "flex" } }}>
          {menuItems.map((item, key) => (
            <React.Fragment key={key}>{item}</React.Fragment>
          ))}
        </Stack>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton size="large" edge="start" onClick={openMenu}>
            {anchorNav ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Menu
            open={Boolean(anchorNav)}
            sx={{ display: { xs: "flex", md: "none" } }}
            onClose={closeMenu}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}>
            <MenuList>
              {menuItems.map((item, key) => (
                <MenuItem key={key}>{item}</MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
