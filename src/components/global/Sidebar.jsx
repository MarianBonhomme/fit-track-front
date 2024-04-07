import { Icon } from "@iconify/react";
import { useDashboard } from "../../utils/DashboardContext";
import { useUser } from "../../utils/UserContext";

export default function Sidebar() {
  const { setActiveDashboard } = useDashboard();
  const { user, handleSignout } = useUser();

  return (
    <nav className="h-screen flex flex-col justify-between items-center py-10">
      <div className="flex flex-col gap-10">
        <Icon
          icon="fa-solid:apple-alt"
          width={40}
          height={40}
          className="text-green cursor-pointer"
          onClick={() => setActiveDashboard("nutrition")}
        />
        <Icon
          icon="material-symbols:fitness-center-rounded"
          width={40}
          height={40}
          className="text-purple cursor-pointer"
          onClick={() => setActiveDashboard("sport")}
        />
      </div>
      <div className="flex flex-col gap-10">
        <Icon
          icon="uil:signout"
          width={40}
          height={40}
          className="text-red cursor-pointer"
          onClick={() => setActiveDashboard("settings")}
        />
        {user.pseudo}
      </div>
    </nav>
  );
}
