import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./router.tsx";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
