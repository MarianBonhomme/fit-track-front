import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  return (
    <nav className="h-[60px] sm:h-screen max-sm:w-screen sm:w-[60px] bg-primary fixed bottom-0 sm:top-0 left-0 z-40 flex sm:flex-col max-sm:justify-evenly sm:gap-10 items-center sm:py-10">
      {location.pathname === "/nutrition" ? (
        <Icon icon="ion:nutrition" className="text-secondary size-[30px]"/>
      ) : (
        <Link to='/nutrition' aria-label="Nutrition">
          <Icon icon="ion:nutrition-outline" className="text-secondary size-[30px]" />
        </Link>
      )}
      {location.pathname === "/profile" ? (
        <Icon icon="iconamoon:profile-fill" className="text-secondary size-[30px]" />
      ) : (
        <Link to='/profile' aria-label="Profile">
          <Icon icon="iconamoon:profile-light" className="text-secondary size-[30px]" />
        </Link>
      )}
      {location.pathname === "/sport" ? (
        <Icon icon="ion:fitness" className="text-secondary size-[30px]"/>
      ) : (
        <Link to='/sport' aria-label="Sport">
          <Icon icon="ion:fitness-outline" className="text-secondary size-[30px]" />
        </Link>
      )}
    </nav>
  );
}
