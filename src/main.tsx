import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ToasterProvider } from "react-buzz";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {" "}
    <ToasterProvider duration={5000} position="bottom-right">
      <App />
    </ToasterProvider>
  </StrictMode>
);
