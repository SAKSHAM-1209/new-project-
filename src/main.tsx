import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { CompareProvider } from "@/contexts/CompareContext";

createRoot(document.getElementById("root")!).render(
  <FavoritesProvider>
    <CompareProvider>
      <App />
    </CompareProvider>
  </FavoritesProvider>
);
