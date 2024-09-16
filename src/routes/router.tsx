import App from "@/App";
import AddBlog from "@/pages/AddBlog";
import Blogs from "@/pages/Blogs";
import Dashboard from "@/pages/Dashboard";
import Subscribers from "@/pages/Subscribers";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/add-blog", element: <AddBlog /> },
      { path: "/subscribers", element: <Subscribers /> },
    ],
  },
]);

export default router;
