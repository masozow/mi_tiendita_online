import React, { createContext, useContext, useReducer, useEffect } from "react";
import { initialState, shoppingCartReducer } from "./shoppingCartReducer";
import { getAllItems, addItem, deleteItem } from "../utils/indexeddb";
import { useAuth } from "./AuthContext";

const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartState, dispatch] = useReducer(shoppingCartReducer, initialState);

  useEffect(() => {
    if (user) {
      const fetchCartItems = async () => {
        const items = await getAllItems(user.ID);
        dispatch({ type: "RESET_CART" });
        items.forEach((item) => {
          dispatch({ type: "ADD_ITEM", payload: item });
        });
      };

      fetchCartItems();
    } else {
      console.log("El usuario no está definido en ShoppingCartProvider");
    }
  }, [user]);

  const addToCart = async (item) => {
    if (user) {
      await addItem(user.ID, item);
      console.log("Dispatching ADD_ITEM:", item);
      dispatch({ type: "ADD_ITEM", payload: item });
    } else {
      console.log("El usuario no esta definidio en addToCart");
    }
  };

  const removeFromCart = async (idProducto) => {
    if (user) {
      await deleteItem(user.ID, idProducto);
      console.log("Dispatching REMOVE_ITEM:", idProducto);
      dispatch({ type: "REMOVE_ITEM", payload: { idProducto } });
    } else {
      console.log("El usuario no está definido en removeFromCart");
    }
  };

  return (
    <ShoppingCartContext.Provider
      value={{ cartState, addToCart, removeFromCart, dispatch }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};
