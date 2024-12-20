import { createRoot } from "react-dom/client";
import "./assets/css/style.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
  </>
);
