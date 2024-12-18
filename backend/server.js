import express from "express";
import productosRoutes from "./routes/productos.route.js";
import categoriasRoutes from "./routes/categorias_productos.route.js";
import clientesRoutes from "./routes/clientes.route.js";
import estadosRoutes from "./routes/estados.route.js";

const app = express();
app.use(express.json());
app.use("/api/productos", productosRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/estados", estadosRoutes);

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
