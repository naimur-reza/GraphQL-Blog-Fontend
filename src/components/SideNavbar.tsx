import { NavLink, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DashboardIcon,
  CubeIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const SideNavbar = () => {
  const path = useLocation().pathname;
  const [isToggled, setIsToggled] = useState(false);

  const options = [
    {
      name: "Dashboard",
      icon: DashboardIcon,
      path: "/",
    },
    {
      name: "Blogs",
      icon: CubeIcon,
      path: "/blogs",
    },
    {
      name: "Create Blog",
      icon: CubeIcon,
      path: "/add-blog",
    },
    // {
    //   name: "My Cart",
    //   icon: ShoppingCart,
    //   path: "/my-cart",
    // },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsToggled(true);
      } else {
        setIsToggled(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`w-44 flex-grow transition duration-300 border-r h-[100vh] p-4 relative ${
        isToggled ? "-ml-44 transition-all  " : "0 transition-all"
      }`}
    >
      {isToggled ? (
        <ChevronRightIcon
          onClick={() => setIsToggled(!isToggled)}
          className="h-7 w-7 bg-black bg-secondary cursor-pointer text-white rounded-full absolute -right-4"
        />
      ) : (
        <ChevronLeftIcon
          onClick={() => setIsToggled(!isToggled)}
          className="h-7 w-7 bg-black cursor-pointer text-white rounded-full absolute -right-4"
        />
      )}
      <div className="flex flex-col space-y-2">
        {options.map((item) => (
          <NavLink key={item.path} to={item.path}>
            <Button
              className="w-full  flex items-center  justify-start "
              variant={path === item.path ? "default" : "ghost"}
            >
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
