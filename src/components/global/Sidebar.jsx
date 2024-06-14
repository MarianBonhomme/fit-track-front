import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";
import AvatarColor from "../user/AvatarColor";
import { useUser } from "../../utils/user/UserContext";

export default function Sidebar() {
  const { user } = useUser();
  const location = useLocation();

  return (
    <nav className="h-[60px] sm:h-screen max-sm:w-screen sm:w-[80px] bg-primary fixed bottom-0 sm:top-0 left-0 z-40 flex sm:flex-col max-sm:justify-evenly sm:gap-10 items-center sm:py-10 max-sm:border-t border-gray">
      <div className="max-sm:hidden">
        {location.pathname === "/user" ? (
           <AvatarColor avatar={user.avatar} color={user.color} colorSize={"md"} avatarSize={"xs"} />
        ) : (
          <Link to='/user' aria-label="User">
            <AvatarColor avatar={user.avatar} color={user.color} colorSize={"md"} avatarSize={"xs"} />
          </Link>
        )}  
      </div>
      {location.pathname === "/nutrition" ? (
        <div className="flex flex-col items-center justify-center">
          <Icon icon="ion:nutrition" className="text-secondary size-[30px]"/>
          <p className="text-xxs/4">Nutrition</p>
        </div>
      ) : (
        <Link to='/nutrition' aria-label="Nutrition" className="flex flex-col items-center justify-center">
          <Icon icon="ion:nutrition-outline" className="text-secondary size-[30px]" />
          <p className="brightness-75 text-xxs/4">Nutrition</p>
        </Link>
      )}
      {location.pathname === "/training" ? (
        <div className="flex flex-col items-center justify-center">
          <Icon icon="ion:fitness" className="text-secondary size-[30px]"/>
          <p className="text-xxs/4">Training</p>
        </div>
      ) : (
        <Link to='/training' aria-label="Training" className="flex flex-col items-center justify-center">
          <Icon icon="ion:fitness-outline" className="text-secondary size-[30px]" />
          <p className="brightness-75 text-xxs/4">Training</p>
        </Link>
      )}  
      <div className="sm:hidden">
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
      </div>
      {location.pathname === "/weight" ? (
        <div className="flex flex-col items-center justify-center">
          <Icon icon="ion-scale" className="text-secondary size-[30px]" />
          <p className="text-xxs/4">Weight</p>
        </div>
      ) : (
        <Link to='/weight' aria-label="Weight" className="flex flex-col items-center justify-center">
          <Icon icon="ion:scale-outline" className="text-secondary size-[30px]" />
          <p className="brightness-75 text-xxs/4">Weight</p>
        </Link>
      )}
      <div className="flex flex-col items-center justify-center">
        <Icon icon="ion:nutrition" className="text-secondary opacity-0 size-[30px]"/>
      </div>
    </nav>
  );
}
