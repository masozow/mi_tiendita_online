import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useTheme } from "@mui/material/styles";
import DrawerFormControls from "./DrawerFormControls.jsx";

const drawerWidth = 240;

function ResponsiveDrawer({
  children,
  marca,
  categoria,
  handleSelectionChange,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
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

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        backgroundColor: "background.default",
      }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { sm: 0 },
          marginTop: { xs: "2rem", md: "3rem", lg: "2rem" },
          backgroundColor: "background.default",
        }}
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
            display: { sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              marginTop: "3rem",
              backgroundColor: "background.default",
            },
          }}>
          <Box>
            <Divider />
            <DrawerFormControls
              marca={marca}
              categoria={categoria}
              handleSelectionChange={handleSelectionChange}
            />
          </Box>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "block", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              marginTop: "3rem",
              backgroundColor: "background.default",
            },
          }}
          open>
          <Box>
            <Divider />
            <DrawerFormControls
              marca={marca}
              categoria={categoria}
              handleSelectionChange={handleSelectionChange}
            />
          </Box>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginTop: 0, // Ensure no margin top for main component
          backgroundColor: "background.default",
        }}>
        <Box
          sx={{
            position: "absolute",
            left: 0,
            zIndex: theme.zIndex.drawer + 1,
            display: { xs: "block", sm: "block", md: "none", lg: "none" },
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
  marca: PropTypes.number,
  categoria: PropTypes.number,
  handleSelectionChange: PropTypes.func.isRequired,
};

export default ResponsiveDrawer;
