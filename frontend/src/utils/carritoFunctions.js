import {
  getAllItems,
  addItem,
  deleteItem,
  deleteDatabase as deleteDB,
  clearAllItems,
} from "./indexeddb";

export const formatoMoneda = (num) =>
  `Q${num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;

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
