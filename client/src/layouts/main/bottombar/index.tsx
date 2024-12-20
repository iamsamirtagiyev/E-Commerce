import { Icon } from "@iconify/react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

const Bottombar = () => {
  return (
    <div className="flex sm:hidden w-full h-16 border-t-2 bg-white border-black/20 items-center justify-between px-5 fixed left-0 bottom-0">
      <NavLink to="/" className={({ isActive }) => classNames("text-black/40 text-4xl", { "!text-amber-500": isActive })}>
        <Icon icon="solar:home-2-outline" />
      </NavLink>
      <NavLink to="/basket" className={({ isActive }) => classNames("text-black/40 text-4xl", { "!text-amber-500": isActive })}>
        <Icon icon="solar:cart-4-outline" />
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => classNames("text-black/40 text-4xl", { "!text-amber-500": isActive })}>
        <Icon icon="solar:user-linear" />
      </NavLink>
    </div>
  );
};

export default Bottombar;
