import React, { useState } from 'react';
import CardTitle from '../global/CardTitle';
import AvatarItem from './avatar/AvatarItem';
import ColorItem from './avatar/ColorItem';
import { useProfile } from '../../utils/profile/ProfileContext';
import AvatarColor from './avatar/AvatarColor';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useUser } from '../../utils/user/UserContext';

export default function UserDashboard() {
  const { isDarkMode, toggleDarkMode } = useUser();
  const { userProfiles, profile, profileAvatar, profileColor, avatars, colors, handleUpdateProfile } = useProfile();

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
    <div className="grid sm:grid-cols-2 gap-3 sm:gap-5 p-3 sm:p-5">
      <div className='grid sm:grid-cols-2 gap-3 sm:gap-5'>
        <div className='flex flex-col items-center max-sm:gap-5 justify-between bg-primary rounded-3xl p-5'>
          <CardTitle text="Current Profile"/>
          <div className='space-y-3 text-center'>
            <AvatarColor avatar={profileAvatar} color={profileColor} colorSize={"3xl"} avatarSize={"xl"} />
            <p className='font-bold'>{profile.pseudo}</p>
          </div>
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={50}
          />
        </div>
        <div className="flex flex-col items-center justify-between bg-primary rounded-3xl p-5">
          <CardTitle text={"Daily Macros Goals"} />
          <div>
            <CardTitle text={"Kcal"} />
            {profile.dailyKcal}
          </div>
          <div>
            <CardTitle text={"Prot"} />
            {profile.dailyProt}
          </div>
          <div>
            <CardTitle text={"Fat"} />
            {profile.dailyFat}
          </div>
          <div>
            <CardTitle text={"Carb"} />
            {profile.dailyCarb}
          </div>
        </div>
      </div> 
      <div className='w-full flex flex-col gap-5 sm:gap-20'>
        <div className='flex flex-wrap gap-5 sm:gap-10'>
          {avatars && avatars.map((avatar) => (
            <AvatarItem key={avatar.id} avatar={avatar} clicked={() => changeAvatar(avatar)} size={'lg'} />
          ))}
        </div>
        <div className='flex flex-wrap gap-5 sm:gap-10'>
          {colors && colors.map((color) => (
            <ColorItem key={color.id} color={color} clicked={() => changeColor(color)} size={'lg'} />
          ))}
        </div>
      </div>
    </div>
  )
}
