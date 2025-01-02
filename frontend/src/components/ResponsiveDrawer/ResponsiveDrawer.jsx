import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [marca, setMarca] = useState("");
  const [categoria, setCategoria] = useState("");
  const theme = useTheme();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleMarcaChange = (event) => {
    setMarca(event.target.value);
  };

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const drawer = (
    <div>
      <Box sx={{ p: 2 }}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="marca-label">Marca</InputLabel>
          <Select
            labelId="marca-label"
            id="marca-select"
            value={marca}
            label="Marca"
            onChange={handleMarcaChange}>
            <MenuItem value="">
              <em>Ninguna</em>
            </MenuItem>
            <MenuItem value={1}>Marca 1</MenuItem>
            <MenuItem value={2}>Marca 2</MenuItem>
            <MenuItem value={3}>Marca 3</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="categoria-label">Categoría</InputLabel>
          <Select
            labelId="categoria-label"
            id="categoria-select"
            value={categoria}
            label="Categoría"
            onChange={handleCategoriaChange}>
            <MenuItem value="">
              <em>Ninguna</em>
            </MenuItem>
            <MenuItem value={1}>Categoría 1</MenuItem>
            <MenuItem value={2}>Categoría 2</MenuItem>
            <MenuItem value={3}>Categoría 3</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="mailbox folders">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "none", lg: "block" },
          }}
          open>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
        }}>
        <Toolbar />
        <Box
          sx={{
            position: "absolute",
            top: "64px", // Adjust based on the height of your navbar
            left: 0,
            zIndex: theme.zIndex.drawer + 1,
            display: { xs: "block", sm: "block", md: "block", lg: "none" },
          }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
              },
            }}>
            <ArrowRightIcon />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  children: PropTypes.node,
};

export default ResponsiveDrawer;
