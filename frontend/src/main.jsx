import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { StylesProvider } from "@mui/styles";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <StylesProvider injectFirst>
        <App />
      </StylesProvider>
    </BrowserRouter>
  </StrictMode>
);
