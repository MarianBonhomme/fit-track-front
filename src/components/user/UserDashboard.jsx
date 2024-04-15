import React, { useState } from 'react';
import AvatarForm from './avatar/AvatarForm';
import CardTitle from '../global/CardTitle';
import AvatarItem from './avatar/AvatarItem';
import ColorItem from './avatar/ColorItem';
import { useProfile } from '../../utils/profile/ProfileContext';
import AvatarColor from './avatar/AvatarColor';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useUser } from '../../utils/user/UserContext';

export default function UserDashboard() {
  const { isDarkMode, toggleDarkMode } = useUser();
  const { userProfiles, profile, profileAvatar, profileColor, avatars, colors, handleUpdateProfile, switchProfile } = useProfile();
  const [isAvatarFormDisplayed, setIsAvatarFormDisplayed] = useState(false);

  const changeAvatar = (avatar) => {
    const updatedProfile = { ...profile, avatar_id: avatar.id }
    handleUpdateProfile(updatedProfile)
  }

  const changeColor = (color) => {
    const updatedProfile = { ...profile, color_id: color.id }
    handleUpdateProfile(updatedProfile)
  } 

  const getAvatarById = (avatarId) => {
    const avatar = avatars.find(avatar => avatar.id === avatarId);
    return avatar
  }

  const getColorById = (colorId) => {
    const color = colors.find(color => color.id === colorId);
    return color
  }

  return (
    <div className="p-5">     
      <div className="grid grid-cols-2 gap-5">
        <div className="flex justify-center gap-5">
          <div className='w-1/3 bg-primary rounded-3xl p-4'>
            <CardTitle text="Profiles" />
            {userProfiles && userProfiles.map((profile) => (
              <div key={profile.id} className="flex items-center gap-5 py-5 border-b last:border-b-0 border-lightPrimary cursor-pointer" onClick={() => switchProfile(profile)}>
                <AvatarColor avatar={getAvatarById(profile.avatar_id)} color={getColorById(profile.color_id)} colorSize={"md"} avatarSize={"xs"} />
                <p className='text-xl font-bold'>{profile.pseudo}</p>
              </div>
            ))}
          </div>  
          <div className='w-2/3 flex flex-col items-center gap-10 bg-primary rounded-3xl p-4'>
            <CardTitle text="Current Profile"/>
            <AvatarColor avatar={profileAvatar} color={profileColor} colorSize={"3xl"} avatarSize={"xl"} />
            <p className='text-3xl font-bold'>{profile.pseudo}</p>
            <DarkModeSwitch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              size={50}
            />
          </div>                  
        </div>
        <div className='w-full flex flex-col gap-20'>
          <div className='flex flex-wrap gap-10'>
            {avatars && avatars.map((avatar) => (
              <AvatarItem key={avatar.id} avatar={avatar} clicked={() => changeAvatar(avatar)} size={'lg'} />
            ))}
          </div>
          <div className='flex flex-wrap gap-10'>
            {colors && colors.map((color) => (
              <ColorItem key={color.id} color={color} clicked={() => changeColor(color)} size={'lg'} />
            ))}
          </div>
        </div>
      </div>
      
      {isAvatarFormDisplayed && (
        <AvatarForm close={() => setIsAvatarFormDisplayed(false)}/>
      )}
    </div>
  )
}
