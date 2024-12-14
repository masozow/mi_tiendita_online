import { QueryTypes } from 'sequelize';
import sequelize from '../config/sequelize.js'; // Importa la conexión

// Función para obtener productos
async function obtenerTodosProductos() {
  try {
    const usuarios = await sequelize.query('EXEC sp_obtenerTodosProductos', {
      type: QueryTypes.SELECT,
    });
    return usuarios;
  } catch (err) {
    console.error('Error al ejecutar el procedimiento:', err);
    throw err; // Lanza el error para que el llamador pueda manejarlo
  } finally {
    // Cerrar la conexión después de la consulta
    await sequelize.close();
    console.log('Conexión cerrada.');
  }
}

async function obtenerTodosProductosActivosStockMayorCero() {
  try {
    const datos = await sequelize.query('SELECT * FROM vw_Total_productos_activos_stock_mayor_cero', {
      type: QueryTypes.SELECT,
    });
    console.log('Datos obtenidos de la vista:', datos);
    return datos;
  } catch (err) {
    console.error('Error al consultar la vista:', err);
  }
}

export { obtenerTodosProductos,obtenerTodosProductosActivosStockMayorCero };