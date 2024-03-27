import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { NutritionProvider } from "./utils/NutritionContext";
import { ThemeProvider } from "./utils/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <NutritionProvider>
        <App />
      </NutritionProvider>
    </ThemeProvider>
  </React.StrictMode>
);
