import { obtenerTodosProductos,obtenerTodosProductosActivosStockMayorCero } from './entities/productos.js';

async function main() {
  try {
    // const productos = await obtenerTodosProductos();
    const productos = await obtenerTodosProductosActivosStockMayorCero();
    console.log('Productos obtenidos:', productos);
  } catch (err) {
    console.error('Error en la operación:', err);
  }
}

main();