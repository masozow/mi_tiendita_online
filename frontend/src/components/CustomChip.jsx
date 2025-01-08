import { Chip } from "@mui/material";

const CustomChip = ({ incomingLabel }) => {
  let label = "";
  let color = "default";

  if (incomingLabel !== undefined && incomingLabel !== null) {
    const value =
      typeof incomingLabel === "number"
        ? incomingLabel
        : incomingLabel.toLowerCase();

    switch (value) {
      case 1:
      case "activo":
        label = "Activo";
        color = "success";
        break;
      case 2:
      case "inactivo":
        label = "Inactivo";
        color = "error";
        break;
      case 3:
      case "pendiente":
        label = "Pendiente";
        color = "warning";
        break;
      case 4:
      case "confirmado":
        label = "Confirmado";
        color = "primary";
        break;
      default:
        label = incomingLabel.toString();
        color = "secondary";
        break;
    }
  }

  return <Chip label={label} color={color} />;
};

export default CustomChip;
