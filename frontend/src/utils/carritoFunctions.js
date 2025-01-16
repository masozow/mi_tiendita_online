import {
  getAllItems,
  addItem,
  deleteItem,
  deleteDatabase as deleteDB,
  clearAllItems,
} from "./indexeddb";

/**
 * Función que devuelve un string con el formato de moneda
 * para mostrar precios, con separador de miles y decimales.
 * Si el valor es nulo o undefined, devuelve una cadena vacia.
 * @param {number} num - valor a formatear
 * @returns {string} string formateado con el formato de moneda
 */
export const formatoMoneda = (num) =>
  `Q${num?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
/**
 * Función que devuelve un string para mostrar el stock de un producto.
 * Si el stock es 0 o menor, devuelve " - Agotado", de lo contrario
 * devuelve una cadena vacia.
 * @param {number} stock - stock del producto
 * @returns {string} string para mostrar el stock
 */
export const formatoStock = (stock) => {
  return stock <= 0 ? " - Agotado" : "";
};
/**
 * Calcula el total de la suma de los subtotales de los elementos en el carrito.
 * Si no hay elementos, devuelve 0.
 *
 * @param {Array} items - Lista de objetos, cada uno debe tener una propiedad 'subtotal' numérica.
 * @returns {number} El total de los subtotales de los elementos.
 */
export const calcularTotal = (items) =>
  items && items.length > 0
    ? items.map(({ subtotal }) => subtotal).reduce((suma, i) => suma + i, 0)
    : 0;

export const obtenerItemsCarrito = async (userId, setFilas) => {
  const items = await getAllItems(userId);
  setFilas(items);
};

export const handleRemoveItem = (idProducto, removeFromCart, setFilas) => {
  removeFromCart(idProducto);
  setFilas((prevFilas) =>
    prevFilas.filter((fila) => fila.idProducto !== idProducto)
  );
};

export const handleClearCart = async ({ userId, dispatch, setFilas, cb }) => {
  if (dispatch) dispatch({ type: "CLEAR_CART" });
  setFilas([]);
  cb();
  if (userId) await clearAllItems(userId);
};

export const deleteDatabase = deleteDB;
