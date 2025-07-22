import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "@pheralb/toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster maxToasts={1}/>
  </StrictMode>
);
