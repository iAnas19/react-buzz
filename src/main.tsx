import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ToasterProvider } from "./Toaster";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {" "}
    <ToasterProvider duration={5000} position="bottom-right">
      <App />
    </ToasterProvider>
  </StrictMode>
);
