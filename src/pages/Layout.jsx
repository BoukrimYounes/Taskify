import { Outlet } from "react-router-dom";
import Navbar from "../compontnts/Navbar";

function Layout() {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
