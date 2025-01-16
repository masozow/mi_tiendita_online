import { useState, useEffect, useReducer } from "react";
import { useQueryHook } from "../../hooks/useQueryHook";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  IconButton,
  useTheme,
  Popover,
  TextField,
  Box,
  Stack,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import ImageWithFallback from "../../components/ImageWithFallback";
import getColumns from "../../utils/getColumns";
import { useShoppingCart } from "../../store/ShoppingCartContext";
import { formatoMoneda } from "../../utils/carritoFunctions";
import { breakPointsFromTheme } from "../../utils/breakPointFunctions";
import ResponsiveDrawer from "../../components/ResponsiveDrawer/ResponsiveDrawer";
import { useAuth } from "../../store/AuthContext";
import { rolesDictionary } from "../../utils/rolesDictionary";
const initialState = {
  marca: 0,
  categoria: 0,
};

const reducerMarcaCatalogo = (state, action) => {
  switch (action.type) {
    case "SET_MARCA":
      return { ...state, marca: action.payload };
    case "SET_CATEGORIA":
      return { ...state, categoria: action.payload };
    default:
      return state;
  }
};

const CatalogoProductos = () => {
  const { user, isLoading: isLoadingUser } = useAuth();
  const [state, dispatch] = useReducer(reducerMarcaCatalogo, initialState);
  const [filteredData, setFilteredData] = useState([]);
  const { data, isLoading, error } = useQueryHook(
    "catalogoProductos",
    "/api/productos/catalogo/"
  );

  const theme = useTheme();
  const { isSmallScreen, isMediumScreen, isLargeScreen } =
    breakPointsFromTheme(theme);

  const { cartState, addToCart, removeFromCart } = useShoppingCart();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
    setQuantity(1);
  };

  const handleIconClick = (event, item) => {
    console.log("Icon clicked:", item);
    if (cartState.some((cartItem) => cartItem.idProducto === item.ID)) {
      console.log("Removing item from cart:", item.ID);
      removeFromCart(item.ID);
    } else {
      setAnchorEl(event.currentTarget);
      setSelectedItem(item);
    }
  };

  const handleAddToCart = () => {
    const item = selectedItem;
    const newItem = {
      cantidad: quantity,
      precio: item.PRECIO,
      subtotal: quantity * item.PRECIO,
      idProducto: item.ID,
      foto: item.FOTO,
      nombre: item.NOMBRE,
      marca: item.ID_MARCA,
      categoria: item.ID_CATEGORIA,
    };
    console.log("Adding item to cart:", newItem);
    addToCart(newItem);
    handlePopoverClose();
  };

  // const handleSelectionChange = (value, type) => {
  //   dispatch({ type, payload: value });
  // };

  const handleSelectionChange = (value, type) => {
    if (type) {
      dispatch({ type, payload: value });
    } else {
      console.log("Valor seleccionado:", value);
    }
  };
  useEffect(() => {
    if (data?.data) {
      let filtered = data.data;
      if (state.marca) {
        filtered = filtered.filter((item) => item.ID_MARCA === state.marca);
      }
      if (state.categoria) {
        filtered = filtered.filter(
          (item) => item.ID_CATEGORIA === state.categoria
        );
      }
      setFilteredData(filtered);
    }
  }, [data, state.marca, state.categoria]);

  if (isLoading) return <Typography>Cargando...</Typography>;
  if (error) return <div>Error: {error.message}</div>;

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <ResponsiveDrawer
      marca={state.marca}
      categoria={state.categoria}
      handleSelectionChange={handleSelectionChange}>
      <ImageList
        sx={{ width: "100%", height: "100%" }}
        cols={getColumns(isSmallScreen, isMediumScreen, isLargeScreen)}>
        {filteredData.map((item) => (
          <ImageListItem key={item.ID}>
            <ImageWithFallback
              src={`${import.meta.env.VITE_STATIC_URI + item.FOTO}`}
              fallbackSrc="/Image-not-found.png"
              alt={item.NOMBRE}
              width="100%"
              objectFit="cover"
            />
            {user.ID_ROL === rolesDictionary.Cliente ? (
              <ImageListItemBar
                title={item.NOMBRE}
                subtitle={formatoMoneda(item.PRECIO)}
                actionIcon={
                  <IconButton
                    sx={{
                      color: "rgba(255, 255, 255, 0.9)",
                      opacity: cartState.some(
                        (cartItem) => cartItem.idProducto === item.ID
                      )
                        ? 0.3
                        : 1,
                    }}
                    aria-label={`info about ${item.NOMBRE}`}
                    onClick={(event) => handleIconClick(event, item)}>
                    {cartState.some(
                      (cartItem) => cartItem.idProducto === item.ID
                    ) ? (
                      <RemoveShoppingCartIcon />
                    ) : (
                      <AddShoppingCartIcon />
                    )}
                  </IconButton>
                }
              />
            ) : (
              <ImageListItemBar
                title={item.NOMBRE}
                subtitle={formatoMoneda(item.PRECIO)}
              />
            )}
          </ImageListItem>
        ))}
      </ImageList>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}>
        <Box sx={{ p: 2, maxWidth: "10rem" }}>
          <Typography variant="h7">Cantidad</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              margin="normal"
            />
            <IconButton
              onClick={handleAddToCart}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}>
              <AddIcon />
            </IconButton>
          </Stack>
        </Box>
      </Popover>
    </ResponsiveDrawer>
  );
};

export default CatalogoProductos;
