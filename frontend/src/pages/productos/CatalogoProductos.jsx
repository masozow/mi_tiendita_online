import { useEffect } from "react";
import { useQueryHook } from "../../hooks/useQueryHook";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  ListSubheader,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ImageWithFallback from "../../components/ImageWithFallback";
import getColumns from "../../utils/getColumns";

const CatalogoProductos = () => {
  const { data, isLoading, error } = useQueryHook(
    "catalogoProductos",
    "/api/productos/"
  );

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    console.log("datos: ", data);
  }, [data]);

  if (isLoading) return <Typography>Cargando...</Typography>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* <pre>{JSON.stringify(data)}</pre> */}
      <ImageList
        sx={{ width: "100%", height: "70vh" }}
        cols={getColumns(isSmallScreen, isMediumScreen, isLargeScreen)}>
        <ImageListItem
          key="Subheader"
          cols={getColumns(isSmallScreen, isMediumScreen, isLargeScreen)}>
          <ListSubheader component="div"></ListSubheader>
        </ImageListItem>
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
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.NOMBRE}`}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
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
