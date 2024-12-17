import express from "express";
import productosRoutes from "./routes/productos.route.js";

const app = express();
app.use(express.json());
app.use("/api/productos", productosRoutes);

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
