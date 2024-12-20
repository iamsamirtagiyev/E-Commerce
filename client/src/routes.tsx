import { createBrowserRouter } from "react-router-dom";
import Main from "./layouts/main";
import Home from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default router;
