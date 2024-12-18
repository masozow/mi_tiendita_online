// import { productos } from "./models/productos.model.js";
// import { estados } from "./models/estados.model.js";
// import {obtenerTodosRoles}from './models/roles.model.js';
// import { marcas } from "./models/marcas_productos.model.js";
// import { categorias } from "./models/categorias_productos.model.js";
// import { usuarios } from "./models/usuarios.model.js";
// import { clientes } from "./models/clientes.model.js";
import { operadores } from "./models/operadores.model.js";
// import { ordenes } from "./models/ordenes.model.js";

async function main() {
  try {
    // const resultado = await obtenerTodosProductosActivosStockMayorCero();
    // const resultado = await productos.obtenerTodoPorID(3);
    // const resultado = await insertarEstado('Prueba');
    // const resultado = await actualizarEstado(1,'Activo');
    // const resultado = await estados.obtenerTodo();
    // const resultado = await estados.obtenerTodoPorID(1);
    // const resultado = await obtenerTodosRoles();
    // const resultado = await insertarProducto('48795409777','Galaxy a23',18.00,3000.00,4000.00,'',2,1,2);
    // const resultado = await actualizarProducto({
    //   idProducto: 24,
    //   nombreProducto: "Galaxy A23",
    // });
    // const resultado = await marcas.insertar("Maggi", 1);
    // const resultado = await marcas.actualizar({
    //   idMarca: 28,
    //   nombreMarca: "Maggi",
    // });
    // const resultado = await marcas.obtenerTodo();
    // const resultado = await marcas.obtenerTodoPorID(9);
    // const resultado = await cateogrias.insertar("Abarrotes", 1);
    // const resultado = await categorias.actualizar({
    //   id: 11,
    //   nombre: "Abarrotes",
    //   idEstado: 2,
    // });
    // const resultado = await categorias.obtenerTodo();
    // const resultado = await categorias.obtenerTodoPorID(10);
    // const resultado = await usuarios.insertar(
    //   "usuario@example.com",
    //   "Jhon Smith",
    //   "miPassword123",
    //   "55577780",
    //   "1990-01-01",
    //   1,
    //   2
    // );

    // const resultado = await usuarios.actualizar({
    //   idUsuario: 14,
    //   password: "MyPassword123",
    // });
    // const resultado = await clientes.insertar(
    //   "Jhon Smith",
    //   "Jhon Smith",
    //   "Calle 123",
    //   14,
    //   1
    // );
    // const resultado = await clientes.actualizar({
    //   idCliente: 7,
    //   nombre: "John Smith",
    // });
    // const resultado = await clientes.obtenerTodo();
    // const resultado = await clientes.obtenerTodoPorID(7);
    const resultado = await operadores.insertar(14, 1);
    // const resultado = await operadores.actualizar({
    //   idOperador: 8,
    //   idUsuario: 14,
    // });
    // const resultado = await operadores.obtenerTodo();
    // const resultado = await operadores.obtenerTodoPorID(8);
    // const resultado = await ordenes.insertar(
    //   "Maria Gómez",
    //   "5 avenida 3-45 zona 1, Guatemala, Guatemala",
    //   "584930128",
    //   "maria.gomez@example.com",
    //   "2024-12-21",
    //   20310.0,
    //   3,
    //   2,
    //   5,
    //   JSON.stringify([
    //     { cantidad: 3.0, precio: 700.0, subtotal: 2100.0, idProducto: 14 },
    //     { cantidad: 1.0, precio: 6000.0, subtotal: 6000.0, idProducto: 2 },
    //     { cantidad: 5.0, precio: 2400.0, subtotal: 12000.0, idProducto: 12 },
    //     { cantidad: 3.0, precio: 70.0, subtotal: 210.0, idProducto: 21 },
    //   ])
    // );
    // const resultado = ordenes.actualizar({
    //   idOrden: 9,
    //   direccion: "5 avenida 3-45 zona 12, Guatemala, Guatemala",
    // });
    // const resultado = await ordenes.obtenerTodo();
    // const resultado = await ordenes.obtenerOrdenPorID(9);
    // const resultado = await ordenes.obtenerDetallePorID(9);
    console.log("Resultado query: \n", resultado);
  } catch (err) {
    console.error("Error en la operación:", err);
  }
}
main();
