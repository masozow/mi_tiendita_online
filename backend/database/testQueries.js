import { obtenerTodosProductos,obtenerTodosProductosActivosStockMayorCero } from './entities/productos.js';
import {insertarEstado,actualizarEstado, obtenerTodosEstados} from './entities/estados.js';
import {obtenerTodosRoles}from './entities/roles.js';
async function main() {
  try {
    // const resultado = await obtenerTodosProductosActivosStockMayorCero();
    // const resultado = await obtenerTodosProductos();
    // const resultado = await insertarEstado('Prueba');
    // const resultado = await actualizarEstado(1,'Activo');
    // const resultado = await obtenerTodosEstados();
    const resultado = await obtenerTodosRoles();
    console.log('Resultado query:', resultado);
  } catch (err) {
    console.error('Error en la operación:', err);
  }
}
main();