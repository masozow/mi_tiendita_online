import { Route, Routes } from "react-router-dom";
import Login from "./pages/usuarios/Login.jsx";
import AgregarProducto from "./pages/productos/AgregarProducto.jsx";
import TodosProductos from "./pages/productos/TodosProductos.jsx";
import Box from "@mui/material/Box";
import NavBar from "./components/NavBar/NavBar.jsx";
import CatalogoProductos from "./pages/productos/CatalogoProductos.jsx";
import Carrito from "./pages/carrito/Carrito.jsx";

const App = () => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/producto/" element={<TodosProductos />} />
        <Route path="/producto/catalogo" element={<CatalogoProductos />} />
        <Route path="/producto/crear" element={<AgregarProducto />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </Box>
  );
};

export default App;
