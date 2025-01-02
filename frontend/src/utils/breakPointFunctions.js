import { useMediaQuery } from "@mui/material";

/**
 * Determina el tamaño de la pantalla basado en los puntos de quiebre del tema.
 *
 * @param {object} theme - El objeto del tema que contiene las definiciones de los puntos de quiebre.
 * @returns {object} Un objeto que contiene valores booleanos que indican si el tamaño de la pantalla es pequeño, mediano o grande.
 * @returns {boolean} return.isSmallScreen - Verdadero si el tamaño de la pantalla es pequeño.
 * @returns {boolean} return.isMediumScreen - Verdadero si el tamaño de la pantalla es mediano.
 * @returns {boolean} return.isLargeScreen - Verdadero si el tamaño de la pantalla es grande.
 */
const breakPointsFromTheme = (theme) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  return { isSmallScreen, isMediumScreen, isLargeScreen };
};

export { breakPointsFromTheme };
