import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Bottombar from "./bottombar";

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="sm:pt-16">
        <Outlet />
      </div>
      <Bottombar />
    </div>
  );
};

export default Main;
