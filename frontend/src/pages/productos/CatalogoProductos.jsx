import { useEffect, useState } from "react";
import { useQueryHook } from "../../hooks/useQueryHook";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
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

const CatalogoProductos = () => {
  const { data, isLoading, error } = useQueryHook(
    "catalogoProductos",
    "/api/productos/"
  );

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

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
    if (cartState[item.ID]) {
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
    addToCart(newItem);
    handlePopoverClose();
  };

  if (isLoading) return <Typography>Cargando...</Typography>;
  if (error) return <div>Error: {error.message}</div>;

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      {/* <pre>{JSON.stringify(data)}</pre> */}
      <ImageList
        sx={{ width: "100%", height: "70vh" }}
        cols={getColumns(isSmallScreen, isMediumScreen, isLargeScreen)}>
        {data.data.map((item) => (
          <ImageListItem key={item.ID}>
            <ImageWithFallback
              src={`${import.meta.env.VITE_STATIC_URI + item.FOTO}`}
              fallbackSrc="/Image-not-found.png"
              alt={item.NOMBRE}
              width="100%"
              objectFit="cover"
            />
            <ImageListItemBar
              title={item.NOMBRE}
              subtitle={item.PRECIO}
              actionIcon={
                <IconButton
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                    opacity: cartState[item.ID] ? 0.3 : 1,
                  }}
                  aria-label={`info about ${item.NOMBRE}`}
                  onClick={(event) => handleIconClick(event, item)}>
                  {cartState[item.ID] ? (
                    <RemoveShoppingCartIcon />
                  ) : (
                    <AddShoppingCartIcon />
                  )}
                </IconButton>
              }
            />
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
              inputProps={{ min: 1 }}
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
    </div>
  );
};

export default CatalogoProductos;

// "ID": 2,
//       "NOMBRE": "iPhone",
//       "CODIGO": "48795409886",
//       "STOCK": 12,
//       "COSTO": 5000,
//       "PRECIO": 6000,
//       "FOTO": "",
//       "ID_CATEGORIA": 2,
//       "ID_MARCA": 1
