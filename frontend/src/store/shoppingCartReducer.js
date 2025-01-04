export const initialState = [];

export const shoppingCartReducer = (state, action) => {
  console.log("Reducer action:", action);
  switch (action.type) {
    case "ADD_ITEM":
      console.log("Adding item:", action.payload);
      return [...state, action.payload];
    case "REMOVE_ITEM":
      console.log("Removing item:", action.payload);
      return state.filter(
        (item) => item.idProducto !== action.payload.idProducto
      );
    case "CLEAR_CART":
      console.log("Clearing cart");
      return [];
    case "RESET_CART":
      console.log("Resetting cart");
      return [];
    default:
      return state;
  }
};
