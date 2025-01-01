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
        console.log("Item added to the cart:", item);
        resolve();
      };

      request.onerror = (event) => {
        console.error("Error adding item to the cart:", event.target.error);
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

    console.log("All items in the cart:", items);
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
