import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";
import AvatarColor from "../user/AvatarColor";
import { useUser } from "../../utils/user/UserContext";

export default function Sidebar() {
  const { user } = useUser();
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
      {location.pathname === "/training" ? (
        <Icon icon="mingcute:fitness-fill" className="text-secondary size-[30px]"/>
      ) : (
        <Link to='/training' aria-label="Training">
          <Icon icon="mingcute:fitness-line" className="text-secondary size-[30px]" />
        </Link>
      )}  
      {location.pathname === "/user" ? (
        <div className="-translate-y-2">
          <AvatarColor avatar={user.avatar} color={user.color} colorSize={"md"} avatarSize={"xs"} />
        </div>
      ) : (
        <Link to='/user' aria-label="User">
          <div className="-translate-y-2">
            <AvatarColor avatar={user.avatar} color={user.color} colorSize={"md"} avatarSize={"xs"} />
          </div>
        </Link>
      )}    
      {location.pathname === "/health" ? (
        <Icon icon="solar:health-bold" className="text-secondary size-[30px]" />
      ) : (
        <Link to='/health' aria-label="Health">
          <Icon icon="solar:health-outline" className="text-secondary size-[30px]" />
        </Link>
      )}
      <Icon icon="ion:nutrition" className="text-secondary opacity-0 size-[30px]"/>
    </nav>
  );
}
