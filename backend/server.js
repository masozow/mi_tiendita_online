import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";

import productosRoutes from "./routes/productos.route.js";
import categoriasRoutes from "./routes/categorias_productos.route.js";
import clientesRoutes from "./routes/clientes.route.js";
import estadosRoutes from "./routes/estados.route.js";
import marcasRoutes from "./routes/marcas_productos.route.js";
import operadoresRoutes from "./routes/operadores.route.js";
import rolesRoutes from "./routes/roles.route.js";
import usuariosRoutes from "./routes/usuarios.route.js";
import ordenesRoutes from "./routes/ordenes.route.js";
import staticRoutes from "./routes/static.route.js";

//Configuraciones
const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors());

//Rutas
app.use("/api/productos", productosRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/estados", estadosRoutes);
app.use("/api/marcas", marcasRoutes);
app.use("/api/operadores", operadoresRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/ordenes", ordenesRoutes);
app.use("/api/static", staticRoutes);

//Más middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  if (err) {
    res.status(400).json({ error: err.message });
  } else {
    next();
  }
});

//Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} \n`);
});

export default app;
