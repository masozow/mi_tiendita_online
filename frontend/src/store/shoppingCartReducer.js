export const initialState = [];

export const shoppingCartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    case "REMOVE_ITEM":
      return state.filter(
        (item) => item.idProducto !== action.payload.idProducto
      );
    case "CLEAR_CART":
      return [];
    case "RESET_CART":
      return [];
    default:
      return state;
  }
};
