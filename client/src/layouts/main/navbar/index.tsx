import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md w-full h-16 px-5 sm:fixed top-0 left-0 z-10">
      <div className="container mx-auto h-full flex items-center justify-between gap-5">
        <Link to="/" className="flex items-center">
          <span className="text-5xl text-amber-500">
            <Icon icon="arcticons:shop-apotheke-redcare" />
          </span>
          <span className="text-4xl sm:inline-block hidden font-fredoka font-extrabold text-amber-500">e.com</span>
        </Link>
        <label className="w-full bg-slate-300 py-2 px-2.5 rounded-md flex items-center gap-2">
          <span className="text-black/20 text-3xl">
            <Icon icon="mingcute:search-line" />
          </span>
          <input type="text" className="w-full bg-transparent outline-none font-medium text-xl" placeholder="Search..." />
        </label>
        <div className="sm:flex hidden items-center gap-4">
          <Link to="/profile" className="text-black/30 text-4xl transition-all duration-500 hover:text-amber-500">
            <Icon icon="solar:user-linear" />
          </Link>
          <div>
            <button className="text-black/30 flex items-center justify-center text-4xl transition-all duration-500 hover:text-amber-500">
              <Icon icon="solar:cart-4-outline" />
            </button>
          </div>
          <button className="flex items-center justify-center text-black/30 transition-all duration-500 hover:text-amber-500 text-4xl">
            <Icon icon="solar:sun-2-outline" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
