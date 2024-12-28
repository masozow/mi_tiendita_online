import { AppBar, Container, IconButton, Stack, Toolbar } from "@mui/material";
import React from "react";
import "./NavBar.module.css";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { Link, NavLink } from "react-router-dom";
// import { AccountMenu } from "./AccountMenu.jsx";
const NavBar = () => {
  return (
    <AppBar className="navBar" disableGutters position="static">
      <Toolbar>
        <Container sx={{ flexGrow: 1 }} disableGutters>
          <Typography variant="h5" color="inherit" component={NavLink} to={"/"}>
            Mi tiendita
          </Typography>
        </Container>
        {/* <AccountMenu /> */}
        <Stack disableGutters direction={"row"} spacing={2}>
          <IconButton
            component={NavLink}
            to="/carrito"
            color="inherit"
            aria-label="ver su carrito"
          >
            <AddShoppingCartIcon />
          </IconButton>
          <IconButton color="inherit">
            <PersonIcon color="inherit" aria-label="ver su carrito" />
          </IconButton>
        </Stack>
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
