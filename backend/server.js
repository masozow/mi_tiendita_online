import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

import productosRoutes from "./routes/productos.route.js";
import categoriasRoutes from "./routes/categorias_productos.route.js";
import clientesRoutes from "./routes/clientes.route.js";
import estadosRoutes from "./routes/estados.route.js";
import marcasRoutes from "./routes/marcas_productos.route.js";
import operadoresRoutes from "./routes/operadores.route.js";
import rolesRoutes from "./routes/roles.route.js";
import usuariosRoutes from "./routes/usuarios.route.js";
import ordenesRoutes from "./routes/ordenes.route.js";

//Configuraciones
const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors());
app.use(bodyParser.json());

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

//Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
