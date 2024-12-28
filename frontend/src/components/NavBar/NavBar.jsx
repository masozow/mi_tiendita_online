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
} from "@mui/material";
import React from "react";
import "./NavBar.module.css";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import { useState } from "react";
// import { AccountMenu } from "./AccountMenu.jsx";
const NavBar = () => {
  const menuItems = [
    <IconButton
      component={NavLink}
      to="/carrito"
      color="inherit"
      aria-label="ver su carrito"
    >
      <ShoppingCartIcon color="inherit" aria-label="ver su carrito" />
    </IconButton>,
    <IconButton color="inherit">
      <PersonIcon color="inherit" aria-label="opciones de usuario" />
    </IconButton>,
  ];
  const [anchorNav, setAnchorNav] = useState(null);
  const openMenu = (event) => {
    setAnchorNav(Boolean(event.currentTarget));
  };
  const closeMenu = () => {
    setAnchorNav(null);
  };
  return (
    <AppBar className="navBar" disableGutters position="fixed">
      <Toolbar sx={{ minHeight: "3rem" }}>
        <IconButton
          color="inherit"
          component={NavLink}
          to="/"
          edge="start"
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <StorefrontIcon color="inherit" />
        </IconButton>
        <Container sx={{ flexGrow: 1 }} disableGutters>
          <Typography
            component={NavLink}
            to="/"
            variant="h5"
            color="inherit"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            Mi tiendita
          </Typography>
        </Container>
        {/* <AccountMenu /> */}
        <Stack
          disableGutters
          direction={"row"}
          spacing={1}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {menuItems.map((item) => item)}
        </Stack>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            color="inherit"
            size="large"
            edge="start"
            onClick={openMenu}
          >
            {anchorNav ? <CloseIcon /> : <MenuIcon />}
            {/* <MenuIcon /> */}
          </IconButton>
          <Menu
            open={anchorNav}
            sx={{ display: { xs: "flex", md: "none" } }}
            onClose={closeMenu}
            color="inherit"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuList>
              {menuItems.map((item) => (
                <MenuItem>{item}</MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

// <IconButton
//   component={NavLink}
//   to="/carrito"
//   color="primary"
//   aria-label="ver su carrito"
// >
//   <AddShoppingCartIcon />
// </IconButton>;
