import { createTheme } from "@mui/material/styles";

const workflowTheme = createTheme({
  palette: {
    primary: {
      main: "#0F4C81",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#E8EAF6",
      contrastText: "#0F4C81",
    },
    background: {
      default: "rgb(249, 248, 250)",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#212121",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
          color: "#FFFFFF",
          borderRadius: 8,
          "&:hover": {
            backgroundColor: "#333333",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            color: "#212121",
          },
          "& .MuiFormLabel-root": {
            color: "#666666",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#333333",
            },
            "&:hover fieldset": {
              borderColor: "#212121",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#212121",
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(249, 248, 250,0.1)",
          backdropFilter: "blur(10px)",
          top: 0,
          left: 0,
          right: 0,
        },
      },
    },
  },
});

export default workflowTheme;
