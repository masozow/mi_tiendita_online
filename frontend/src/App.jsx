import { Route, Routes } from "react-router-dom";
import Login from "./pages/usuarios/Login.jsx";
import AgregarProducto from "./pages/productos/AgregarProducto.jsx";
import TodosProductos from "./pages/productos/TodosProductos.jsx";
import Box from "@mui/material/Box";
import Container from "@mui/material/Paper";
import NavBar from "./components/NavBar/NavBar.jsx";
import CatalogoProductos from "./pages/productos/CatalogoProductos.jsx";
import Carrito from "./pages/carrito/Carrito.jsx";

const App = () => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <NavBar />
      <Container
        sx={{
          m: { xs: "2rem", md: "3rem", lg: "2rem" },
          p: { xs: "1rem", md: "2rem" },
          backgroundColor: "background.default",
        }}
        elevation={0}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/producto/" element={<TodosProductos />} />
          <Route path="/producto/catalogo" element={<CatalogoProductos />} />
          <Route path="/producto/crear" element={<AgregarProducto />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;
