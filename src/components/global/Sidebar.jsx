import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  return (
    <nav className="h-[60px] sm:h-screen max-sm:w-screen sm:w-[60px] bg-primary fixed bottom-0 sm:top-0 left-0 z-40 flex sm:flex-col max-sm:justify-evenly sm:gap-10 items-center sm:py-10">
      {location.pathname === "/user" ? (
        <Icon icon="iconamoon:profile-fill" className="text-secondary size-[30px]" />
      ) : (
        <Link to='/user' aria-label="User">
          <Icon icon="iconamoon:profile-light" className="text-secondary size-[30px]" />
        </Link>
      )}
      {location.pathname === "/nutrition" ? (
        <Icon icon="ion:nutrition" className="text-secondary size-[30px]"/>
      ) : (
        <Link to='/nutrition' aria-label="Nutrition">
          <Icon icon="ion:nutrition-outline" className="text-secondary size-[30px]" />
        </Link>
      )}
      {location.pathname === "/sport" ? (
        <Icon icon="mingcute:fitness-fill" className="text-secondary size-[30px]"/>
      ) : (
        <Link to='/sport' aria-label="Sport">
          <Icon icon="mingcute:fitness-line" className="text-secondary size-[30px]" />
        </Link>
      )}      
      {location.pathname === "/health" ? (
        <Icon icon="solar:health-bold" className="text-secondary size-[30px]" />
      ) : (
        <Link to='/health' aria-label="Health">
          <Icon icon="solar:health-outline" className="text-secondary size-[30px]" />
        </Link>
      )}
    </nav>
  );
}
