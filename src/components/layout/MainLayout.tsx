import { Outlet } from "react-router-dom";
import SideNavbar from "../SideNavbar";
import Navbar from "../Navbar";

const MainLayout = () => {
  return (
    <div className="flex">
      <SideNavbar />
      <div className="  w-full">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
