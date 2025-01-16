import { Skeleton } from "@mui/material";

const SkeletonComponent = () => {
  return (
    <>
      <Skeleton variant="text" sx={{ fontSize: "5rem" }} animation="wave" />

      {/* For other variants, adjust the size with `width` and `height` */}
      {/* <Skeleton variant="circular" width={40} height={40} /> */}
      <Skeleton
        variant="rectangular"
        width="auto"
        height="3rem"
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        width="auto"
        height="3rem"
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        width="auto"
        height="3rem"
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        width="auto"
        height="3rem"
        animation="wave"
      />
      {/* <Skeleton variant="rounded" width={210} height={60} /> */}
    </>
  );
};

export default SkeletonComponent;
