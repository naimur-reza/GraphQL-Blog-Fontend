import { useLocation } from "react-router-dom";

const Navbar = () => {
  const path = useLocation().pathname;

  return (
    <div className="border-b h-14 flex items-center px-5 text-2xl font-semibold justify-between text-gray-800 ">
      {path === "/"
        ? "Dashboard"
        : path === "/blogs"
        ? "Blogs"
        : path === "/add-blog"
        ? "Post Blog"
        : ""}
    </div>
  );
};

export default Navbar;
