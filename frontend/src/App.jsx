import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/usuarios/Login.jsx";
import AgregarProducto from "./pages/productos/AgregarProducto.jsx";
import TodosProductos from "./pages/productos/TodosProductos.jsx";
import Box from "@mui/material/Box";
import Container from "@mui/material/Paper";
import NavBar from "./components/NavBar/NavBar.jsx";
import CatalogoProductos from "./pages/productos/CatalogoProductos.jsx";
import Carrito from "./pages/carrito/Carrito.jsx";
import NuevaOrden from "./pages/ordenes/NuevaOrden.jsx";
import TodasCategorias from "./pages/categorias/TodasCategorias.jsx";
import TodasMarcas from "./pages/marcas/TodasMarcas.jsx";
import HistorialOrdenes from "./pages/ordenes/HistorialOrdenes.jsx";
import TodosUsuarios from "./pages/usuarios/TodosUsuarios.jsx";
import AgregarUsuario from "./pages/usuarios/AgregarUsuario.jsx";
import ModificarProducto from "./pages/productos/ModificarProducto.jsx";

import { AuthProvider } from "./store/AuthContext.jsx";
import { ShoppingCartProvider } from "./store/ShoppingCartContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import { rolesDictionary } from "./utils/rolesDictionary.js";
import TodasOrdenes from "./pages/ordenes/TodasOrdenes.jsx";
import AgregarMarca from "./pages/marcas/AgregarMarca.jsx";
import AgregarCategoria from "./pages/categorias/AgregarCategoria.jsx";
import AgregarEstado from "./pages/estados/AgregarEstado.jsx";
import TodosEstados from "./pages/estados/TodosEstados.jsx";
import OrdenesPendientes from "./pages/ordenes/OrdenesPendientes.jsx";
import OrdenesCliente from "./pages/ordenes/OrdenesCliente.jsx";

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <AuthProvider>
        <ShoppingCartProvider>
          {!isLoginPage && <NavBar />}
          <Container
            sx={{
              my: { xs: "3rem", md: "4rem", lg: "3rem" },
              p: { xs: "1rem", md: "2rem" },
              backgroundColor: "background.default",
              height: "100%",
            }}
            elevation={0}>
            <Routes>
              {/* -------- Home ----- */}
              <Route path="/" element={<Home />} />

              {/* -------- Login ----- */}
              <Route path="/login" element={<Login />} />

              {/* -------- Productos ----- */}
              <Route
                element={
                  <ProtectedRoute
                    roles={[rolesDictionary.Cliente, rolesDictionary.Operador]}
                  />
                }>
                <Route
                  path="/producto/catalogo"
                  element={<CatalogoProductos />}
                />
              </Route>
              <Route path="/producto/crear" element={<AgregarProducto />} />
              <Route
                path="/producto/modificar/:id"
                element={<ModificarProducto />}
              />
              <Route path="/producto/" element={<TodosProductos />} />

              {/* -------- Carrito ----- */}
              <Route path="/carrito" element={<Carrito />} />

              {/* -------- Ordenes ----- */}
              <Route
                element={<ProtectedRoute roles={[rolesDictionary.Operador]} />}>
                <Route
                  path="/ordenes/historial"
                  element={<HistorialOrdenes />}
                />
              </Route>
              <Route path="/ordenes/crear" element={<NuevaOrden />} />
              <Route path="/ordenes/cliente" element={<OrdenesCliente />} />
              <Route
                path="/ordenes/pendientes"
                element={<OrdenesPendientes />}
              />
              <Route path="/ordenes/" element={<TodasOrdenes />} />

              {/* -------- Usuarios ----- */}
              <Route
                element={<ProtectedRoute roles={[rolesDictionary.Operador]} />}>
                <Route path="/usuario" element={<TodosUsuarios />} />
              </Route>
              <Route
                element={<ProtectedRoute roles={[rolesDictionary.Operador]} />}>
                <Route path="/usuario/crear" element={<AgregarUsuario />} />
              </Route>

              {/* -------- Categorias ----- */}
              <Route path="/categoria" element={<TodasCategorias />} />
              <Route path="/categoria/crear" element={<AgregarCategoria />} />

              {/* -------- Marcas ----- */}
              <Route path="/marca/crear" element={<AgregarMarca />} />
              <Route path="/marca" element={<TodasMarcas />} />

              {/* -------- Estados ----- */}
              <Route path="/estado/crear" element={<AgregarEstado />} />
              <Route path="/estado" element={<TodosEstados />} />

              {/* -------- 404 ----- */}
              <Route path="*" element={<div>404</div>} />
            </Routes>
          </Container>
        </ShoppingCartProvider>
      </AuthProvider>
    </Box>
  );
};

export default App;
