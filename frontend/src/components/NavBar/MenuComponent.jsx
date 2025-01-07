import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const MenuComponent = ({ titulo, elementos }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id={`basic-button-${titulo}`}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}>
        {titulo}
      </Button>
      <Menu
        id={`basic-menu-${titulo}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": `basic-button-${titulo}`,
        }}>
        {elementos.map((elemento, index) => (
          <MenuItem
            key={index}
            onClick={handleClose}
            component={NavLink}
            to={elemento.URL}>
            {elemento.texto}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default MenuComponent;
