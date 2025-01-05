import {
  getAllItems,
  addItem,
  deleteItem,
  deleteDatabase as deleteDB,
} from "./indexeddb";

export const formatoMoneda = (num) =>
  `Q${num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;

export const calcularTotal = (items) =>
  items.map(({ subtotal }) => subtotal).reduce((suma, i) => suma + i, 0);

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

export const handleClearCart = async (userId, dispatch, setFilas) => {
  await deleteDB(userId);
  dispatch({ type: "CLEAR_CART" });
  setFilas([]);
};

export const deleteDatabase = deleteDB;
