import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { NutritionProvider } from "./utils/NutritionContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NutritionProvider>
      <App />
    </NutritionProvider>
  </React.StrictMode>
);
