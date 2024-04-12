import React, { useState } from 'react';
import AvatarForm from './avatar/AvatarForm';
import CardTitle from '../global/CardTitle';
import AvatarItem from './avatar/AvatarItem';
import ColorItem from './avatar/ColorItem';
import { useProfile } from '../../utils/profile/ProfileContext';
import AvatarColor from './avatar/AvatarColor';

export default function UserDashboard() {
  const { userProfiles, profile, avatars, colors, handleUpdateProfile, switchProfile } = useProfile();
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
        <div className="w-full bg-primary rounded-3xl p-4">
          <CardTitle text="Profiles" />
          {userProfiles && userProfiles.map((profile) => (
            <div key={profile.id} className="flex items-center gap-5 py-5 border-b last:border-b-0 border-lightPrimary cursor-pointer" onClick={() => switchProfile(profile)}>
              <AvatarColor avatar={getAvatarById(profile.avatar_id)} color={getColorById(profile.color_id)} />
              <p className='text-xl font-bold'>{profile.pseudo}</p>
            </div>
          ))}
        </div>
        <div className='w-full flex flex-col gap-20'>
          <div className='flex flex-wrap gap-10'>
            {avatars && avatars.map((avatar) => (
              <AvatarItem key={avatar.id} avatar={avatar} size={'xl'} clicked={() => changeAvatar(avatar)} />
            ))}
          </div>
          <div className='flex flex-wrap gap-10'>
            {colors && colors.map((color) => (
              <ColorItem key={color.id} color={color} clicked={() => changeColor(color)} />
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