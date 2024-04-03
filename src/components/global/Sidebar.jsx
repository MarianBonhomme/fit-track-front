import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav className="h-screen flex flex-col justify-between items-center py-10">
      <div className="flex flex-col gap-10">
        <NavLink to="/" className="relative">
          <Icon icon="fa-solid:apple-alt" width={40} height={40} className="text-green cursor-pointer" />
        </NavLink>
        <NavLink to="sport" className="relative">
          <Icon icon="material-symbols:fitness-center-rounded" width={40} height={40} className="text-red cursor-pointer" />
        </NavLink>
      </div>
    </nav>
  )
}