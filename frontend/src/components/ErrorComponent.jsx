const ErrorComponent = ({ error }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <Typography variant="h1">Error: </Typography>
      <Typography variant="h4">{error.message}</Typography>
    </div>
  );
};

export default ErrorComponent;
