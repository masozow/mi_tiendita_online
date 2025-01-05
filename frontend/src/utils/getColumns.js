const getColumns = (isSmallScreen, isMediumScreen, isLargeScreen) => {
  if (isSmallScreen) return 1;
  if (isMediumScreen) return 2;
  if (isLargeScreen) return 4;
  return 1;
};

export default getColumns;
