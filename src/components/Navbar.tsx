import { useLocation } from "react-router-dom";
import AvatarDropdown from "./AvatarDropdown";

const Navbar = () => {
  const path = useLocation().pathname;

  return (
    <div className="border-b h-14 flex items-center px-5 text-2xl font-semibold justify-between text-gray-800 ">
      {path === "/"
        ? "Dashboard"
        : path === "/products"
        ? "Products"
        : path === "/add-product"
        ? "Add Product"
        : path === "/sale-history"
        ? "Sale History"
        : path === "/my-cart"
        ? "My Cart"
        : ""}
      <AvatarDropdown />
    </div>
  );
};

export default Navbar;
