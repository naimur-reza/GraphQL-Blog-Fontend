import App from "@/App";
import AddProduct from "@/pages/AddProduct";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Products from "@/pages/Products";
import Register from "@/pages/Register";
import SaleHistory from "@/pages/SaleHistory";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/add-product", element: <AddProduct /> },
      {
        path: "/sale-history",
        element: <SaleHistory />,
      },
      {
        path: "/products",
        element: <Products />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
