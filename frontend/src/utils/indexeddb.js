const openDatabase = async (userId) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(`ShoppingCartDB_${userId}`, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("cartItems")) {
        db.createObjectStore("cartItems", { keyPath: "idProducto" });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const addItem = async (userId, item) => {
  try {
    const db = await openDatabase(userId);
    const transaction = db.transaction("cartItems", "readwrite");
    const store = transaction.objectStore("cartItems");

    await new Promise((resolve, reject) => {
      const request = store.add(item);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        console.error("Error adding item to the cart:", event.target.error);
        console.error("Item that caused the error:", item);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error("Error in addItem:", error);
  }
};

export const getAllItems = async (userId) => {
  try {
    const db = await openDatabase(userId);
    const transaction = db.transaction("cartItems", "readonly");
    const store = transaction.objectStore("cartItems");

    const items = await new Promise((resolve, reject) => {
      const request = store.getAll();

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        console.error("Error getting items from the cart:", event.target.error);
        reject(event.target.error);
      };
    });
    return items;
  } catch (error) {
    console.error("Error in getAllItems:", error);
  }
};

export const deleteItem = async (userId, idProducto) => {
  try {
    const db = await openDatabase(userId);
    const transaction = db.transaction("cartItems", "readwrite");
    const store = transaction.objectStore("cartItems");

    await new Promise((resolve, reject) => {
      const request = store.delete(idProducto);

      request.onsuccess = () => {
        console.log("Item removed from the cart:", idProducto);
        resolve();
      };

      request.onerror = (event) => {
        console.error("Error removing item from the cart:", event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error("Error in deleteItem:", error);
  }
};

export const deleteDatabase = async (userId) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(`ShoppingCartDB_${userId}`);

    request.onsuccess = () => {
      console.log("Database deleted successfully");
      resolve();
    };

    request.onerror = (event) => {
      console.error("Error deleting database:", event.target.error);
      reject(event.target.error);
    };

    request.onblocked = () => {
      console.warn("Database deletion blocked");
    };
  });
};

export const clearAllItems = async (userId) => {
  try {
    const db = await openDatabase(userId); // Abre la base de datos
    const transaction = db.transaction("cartItems", "readwrite");
    const store = transaction.objectStore("cartItems");

    await new Promise((resolve, reject) => {
      const request = store.clear(); // Limpia todos los elementos

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        console.error(
          "Error clearing items from the cart:",
          event.target.error
        );
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error("Error in clearAllItems:", error);
  }
};
