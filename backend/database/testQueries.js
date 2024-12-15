// import { obtenerTodosProductos,obtenerTodosProductosActivosStockMayorCero } from './entities/productos.js';
// import {insertarEstado,actualizarEstado, obtenerTodosEstados} from './entities/estados.js';
// import {obtenerTodosRoles}from './entities/roles.js';
// import { insertarProducto, actualizarProducto } from "./entities/productos.js";
import {
  insertarMarca,
  actualizarMarca,
  obtenerTodasMarcas,
} from "./entities/marcas_productos.js";

async function main() {
  try {
    // const resultado = await obtenerTodosProductosActivosStockMayorCero();
    // const resultado = await obtenerTodosProductos();
    // const resultado = await insertarEstado('Prueba');
    // const resultado = await actualizarEstado(1,'Activo');
    // const resultado = await obtenerTodosEstados();
    // const resultado = await obtenerTodosRoles();
    // const resultado = await insertarProducto('48795409777','Galaxy a23',18.00,3000.00,4000.00,'',2,1,2);
    // const resultado = await actualizarProducto({
    //   idProducto: 24,
    //   nombreProducto: "Galaxy A23",
    // });
    // const resultado = await insertarMarca("Maggi", 1);
    // const resultado = await actualizarMarca({
    //   idMarca: 28,
    //   nombreMarca: "Maggi",
    // });
    const resultado = await obtenerTodasMarcas();
    console.log("Resultado query:", resultado);
  } catch (err) {
    console.error("Error en la operación:", err);
  }
}
main();
