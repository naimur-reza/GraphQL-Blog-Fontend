import { NavLink, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DashboardIcon,
  CubeIcon,
  ReaderIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { toggleNavbar } from "@/redux/features/navbar/navbarSlice";
import { ShoppingCart } from "lucide-react";

const SideNavbar = () => {
  const path = useLocation().pathname;

  const dispatch = useAppDispatch();

  const isToggled = useAppSelector(
    (state: RootState) => state.navbarSlice.navbar
  );

  const options = [
    {
      name: "Dashboard",
      icon: DashboardIcon,
      path: "/",
    },
    {
      name: "Products",
      icon: CubeIcon,
      path: "/products",
    },
    {
      name: "Add Product",
      icon: CubeIcon,
      path: "/add-product",
    },
    {
      name: "My Cart",
      icon: ShoppingCart,
      path: "/my-cart",
    },
    {
      name: "Sale History",
      icon: ReaderIcon,
      path: "/sale-history",
    },
  ];

  return (
    <div
      className={`w-44 flex-grow transition duration-300 border-r h-[100vh] p-4 relative ${
        isToggled ? "-ml-44 transition-all  " : "0 transition-all"
      }`}>
      {isToggled ? (
        <ChevronRightIcon
          onClick={() => dispatch(toggleNavbar(!isToggled))}
          className="h-7 w-7 bg-gray-800 cursor-pointer text-white rounded-full absolute -right-4"
        />
      ) : (
        <ChevronLeftIcon
          onClick={() => dispatch(toggleNavbar(!isToggled))}
          className="h-7 w-7 bg-gray-800 cursor-pointer text-white rounded-full absolute -right-4"
        />
      )}
      <div className="flex flex-col space-y-2">
        {options.map((item) => (
          <NavLink key={item.path} to={item.path}>
            <Button
              className="w-full  flex items-center  justify-start "
              variant={path === item.path ? "default" : "ghost"}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideNavbar;
