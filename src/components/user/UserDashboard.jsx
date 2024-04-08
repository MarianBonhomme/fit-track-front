import React, { useState } from 'react';
import AvatarForm from './avatar/AvatarForm';
import { useUser } from '../../utils/user/UserContext';
import CardTitle from '../global/CardTitle';
import AvatarItem from './avatar/AvatarItem';
import ColorItem from './avatar/ColorItem';

export default function UserDashboard() {
  const { user, avatars, colors, handleUpdateUser } = useUser();
  const [isAvatarFormDisplayed, setIsAvatarFormDisplayed] = useState(false);

  const changeAvatar = (avatar) => {
    const updatedUser = { ...user, avatar_id: avatar.id }
    handleUpdateUser(updatedUser)
  }

  const changeColor = (color) => {
    const updatedUser = { ...user, color_id: color.id }
    handleUpdateUser(updatedUser)
  } 

  return (
    <div className="p-5">     
      <div className="grid grid-cols-2 gap-5">
        <div className="w-full bg-primary rounded-3xl p-4">
          <CardTitle text="Profile" />
          <p>Avatar</p>
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