import React, { useState } from 'react';
import { useProfile } from '../utils/profile/ProfileContext';
import { useUser } from '../utils/user/UserContext';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import AvatarColor from '../components/profile/AvatarColor';
import AvatarItem from '../components/profile/AvatarItem';
import ColorItem from '../components/profile/ColorItem';
import CardTitle from '../components/global/CardTitle';
import { macros } from '../utils/global/MacroService';
import DailyMacroGoal from '../components/profile/DailyMacroGoal';
import DailyMacroGoalForm from '../components/profile/DailyMacroGoalForm';
import { Icon } from '@iconify/react/dist/iconify.js';


export default function ProfilePage() {
  const { isDarkMode, toggleDarkMode } = useUser();
  const { profile, avatars, colors, handleUpdateProfile, profileLoading, userProfiles, switchProfile } = useProfile();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const changeAvatar = (avatar) => {
    const updatedProfile = { ...profile, avatar_id: avatar.id }
    handleUpdateProfile(updatedProfile)
  }

  const changeColor = (color) => {
    const updatedProfile = { ...profile, color_id: color.id }
    handleUpdateProfile(updatedProfile)
  } 
  
  return ( 
    !profileLoading && 
      <>
        <div className='grid sm:grid-cols-3 gap-3 sm:gap-5 p-5'>
          <div className='flex flex-col items-center max-sm:gap-5 justify-between bg-primary rounded-3xl p-5 relative'>
            <div className='space-y-3 text-center'>
              <AvatarColor avatar={profile.avatar} color={profile.color} colorSize={"xl"} avatarSize={"lg"} />
              <p className='text-xl font-bold'>{profile.pseudo}</p>
            </div>
            <div className="absolute top-5 left-5">
              <DarkModeSwitch
                checked={isDarkMode}
                onChange={toggleDarkMode}
                size={40}
              />
            </div>
            <div className="absolute top-5 right-5">
              {userProfiles && userProfiles.map((userProfile) => (
                userProfile.id !== profile.id ? (
                  <div key={userProfile.id} onClick={() => switchProfile(userProfile)} className='flex flex-col items-center'>
                    <AvatarColor avatar={userProfile.avatar} color={userProfile.color} colorSize={"sm"} avatarSize={"xs"} />
                    <p className="text-xxs font-bold">{userProfile.pseudo}</p>
                  </div>
                ) : null
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center bg-primary rounded-3xl p-5 relative">
            <CardTitle text={"Daily Macros Goals"} />
            <div className='grid grid-cols-2 gap-5 mt-5'>
              {macros.map((macro) => (
                <DailyMacroGoal key={macro} value={profile[`daily${macro.charAt(0).toUpperCase()}${macro.slice(1)}`]} macro={macro} />
              ))}
            </div>
            <div className="absolute top-5 right-5">
              <Icon icon="akar-icons:edit" className='size-[15px]' onClick={() => setIsFormVisible(true)} />
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-wrap justify-center gap-3 sm:gap-5'>
              {avatars && avatars.map((avatar) => (
                <AvatarItem key={avatar.id} avatar={avatar} clicked={() => changeAvatar(avatar)} size={'md'} />
              ))}
            </div>
            <div className='flex flex-wrap justify-center gap-3 sm:gap-5'>
              {colors && colors.map((color) => (
                <ColorItem key={color.id} color={color} clicked={() => changeColor(color)} size={'md'} />
              ))}
            </div>
          </div>
        </div>       
        {isFormVisible &&
          <DailyMacroGoalForm close={() => setIsFormVisible(false)} />
        }
      </>
  )
}