import { Route, Routes } from "react-router-dom";
import Login from "./pages/usuarios/Login.jsx";
import AgregarProducto from "./pages/productos/AgregarProducto.jsx";
import TodosProductos from "./pages/productos/TodosProductos.jsx";
import Box from "@mui/material/Box";
import Container from "@mui/material/Paper";
import NavBar from "./components/NavBar/NavBar.jsx";
import CatalogoProductos from "./pages/productos/CatalogoProductos.jsx";
import Carrito from "./pages/carrito/Carrito.jsx";

import { AuthProvider } from "./store/AuthContext.jsx";
import { ShoppingCartProvider } from "./store/ShoppingCartContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import { rolesDictionary } from "./utils/rolesDictionary.js";
import HistorialOrdenes from "./pages/ordenes/HistorialOrdenes.jsx";

const App = () => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <AuthProvider>
        <ShoppingCartProvider>
          <NavBar />
          <Container
            sx={{
              m: { xs: "2rem", md: "3rem", lg: "2rem" },
              p: { xs: "1rem", md: "2rem" },
              backgroundColor: "background.default",
            }}
            elevation={0}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
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
              <Route path="/producto/" element={<TodosProductos />} />
              <Route path="/producto/crear" element={<AgregarProducto />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route
                element={<ProtectedRoute roles={[rolesDictionary.Operador]} />}>
                <Route
                  path="/ordenes/historial"
                  element={<HistorialOrdenes />}
                />
              </Route>
            </Routes>
          </Container>
        </ShoppingCartProvider>
      </AuthProvider>
    </Box>
  );
};

export default App;
