import { Icon } from "@iconify/react";
import { useDashboard } from "../../utils/global/DashboardContext";
import AvatarColor from "../user/avatar/AvatarColor";
import { useProfile } from "../../utils/profile/ProfileContext";
import { useState } from "react";

export default function Sidebar() {
  const { setActiveDashboard } = useDashboard();
  const { userProfiles, avatars, colors, switchProfile, profileAvatar, profileColor } = useProfile();
  const [isVisible, setIsVisible] = useState(false);
  
  const getAvatarById = (avatarId) => {
    const avatar = avatars.find(avatar => avatar.id === avatarId);
    return avatar
  }

  const getColorById = (colorId) => {
    const color = colors.find(color => color.id === colorId);
    return color
  }

  const profileClicked = (profile) => {
    switchProfile(profile);
    setIsVisible(false);
  }

  return (
    <nav className="h-screen w-[80px] bg-primary fixed top-0 left-0 z-40 flex flex-col justify-between items-center py-10">
      <div className="flex flex-col gap-10">
        <Icon
          icon="fa-solid:apple-alt"
          width={35}
          height={35}
          className="text-green cursor-pointer"
          onClick={() => setActiveDashboard("nutrition")}
        />
        <Icon
          icon="material-symbols:fitness-center-rounded"
          width={35}
          height={35}
          className="text-purple cursor-pointer"
          onClick={() => setActiveDashboard("sport")}
        />
      </div>
      <div className="flex flex-col items-center gap-10">
        <div className="relative">
          <AvatarColor avatar={profileAvatar} color={profileColor} clicked={() => setIsVisible(!isVisible)} colorSize={'md'} avatarSize={'xs'} />  
          {isVisible && 
            <div className="rounded-2xl bg-primary px-3 absolute left-full translate-x-6 -top-1/2">
              {userProfiles && userProfiles.map((profile) => (
                <div key={profile.id} className="flex items-center gap-3 py-2 border-b last:border-b-0 border-lightPrimary cursor-pointer" onClick={() => profileClicked(profile)}>
                  <AvatarColor avatar={getAvatarById(profile.avatar_id)} color={getColorById(profile.color_id)} colorSize={'xs'} avatarSize={'xxs'} />
                  <p className='font-bold'>{profile.pseudo}</p>
                </div>
              ))}
            </div> 
          }
        </div>    
        <Icon
          icon="fluent:settings-24-filled"
          width={35}
          height={35}
          className="text-gray cursor-pointer"
          onClick={() => setActiveDashboard('user')}
        />   
      </div>
    </nav>
  );
}
