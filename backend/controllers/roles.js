import { QueryTypes } from "sequelize";
import sequelize from "./config/sequelize.js";

// Función para obtener productos
async function obtenerTodo() {
  try {
    const datos = await sequelize.query("SELECT * FROM vw_obtenerTodosRoles", {
      type: QueryTypes.SELECT,
    });
    return datos;
  } catch (err) {
    console.error("Error al consultar la vista:", err);
  }
}
const roles = { obtenerTodo };
export { roles };
