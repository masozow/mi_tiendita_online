import { Route, Routes } from "react-router-dom";
import Login from "./pages/usuarios/Login.jsx";
import AgregarProducto from "./pages/productos/AgregarProducto.jsx";
import TodosProductos from "./pages/productos/TodosProductos.jsx";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import NavBar from "./components/NavBar/NavBar.jsx";
import CatalogoProductos from "./pages/productos/CatalogoProductos.jsx";
import Carrito from "./pages/carrito/Carrito.jsx";

const App = () => {
  return (
    <Box sx={{ minHeight: "100vh" }} disableGutters color="inherit">
      <NavBar />
      <Paper
        sx={{
          marginTop: { xs: "4rem", md: "6rem" },
          marginLeft: { xs: "1rem", md: "5rem" },
          marginRight: { xs: "1rem", md: "5rem" },
          paddingTop: { xs: "1rem", md: "2rem" },
          paddingBottom: { xs: "1rem", md: "2rem" },
          paddingRight: { xs: "1rem", md: "5rem" },
          paddingLeft: { xs: "1rem", md: "5rem" },
        }}
        disableGutters
        color="inherit"
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/producto/" element={<TodosProductos />} />
          <Route path="/producto/catalogo" element={<CatalogoProductos />} />
          <Route path="/producto/crear" element={<AgregarProducto />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      </Paper>
    </Box>
  );
};

export default App;
