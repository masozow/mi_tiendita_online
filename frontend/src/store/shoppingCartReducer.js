const initialState = {};

const shoppingCartReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_CART":
      const { idProducto, ...itemDetails } = action.payload;
      const newState = { ...state };
      if (newState[idProducto]) {
        delete newState[idProducto];
      } else {
        newState[idProducto] = itemDetails;
      }
      console.log("New state:", newState);
      return newState;
    case "ADD_ITEM":
      return {
        ...state,
        [action.payload.idProducto]: action.payload,
      };
    case "RESET_CART":
      return initialState;
    default:
      return state;
  }
};

export { initialState, shoppingCartReducer };
