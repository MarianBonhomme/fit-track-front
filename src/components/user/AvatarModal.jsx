import React from 'react'
import CardTitle from './../global/CardTitle';
import AvatarItem from './AvatarItem';
import ColorItem from './ColorItem';
import { useUser } from '../../utils/user/UserContext';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function AvatarModal({close}) {
  const { user, avatars, colors, handleUpdateUser } = useUser();
  
  const changeAvatar = (avatar) => {
    const updatedUser = { ...user, avatar_id: avatar.id }
    handleUpdateUser(updatedUser)
    close()
  }

  const changeColor = (color) => {
    const updatedUser = { ...user, color_id: color.id }
    handleUpdateUser(updatedUser)
    close()
  } 

  return (
    <div className='h-screen w-full fixed top-0 left-0 flex justify-center items-center bg-opacity-70 bg-black p-5 z-50'>
      <div className='w-full max-w-xs flex flex-col items-center gap-5 bg-primary px-3 py-5 relative rounded-2xl'>
        <Icon icon="maki:cross" className="absolute top-5 right-5 text-secondary cursor-pointer size-[20px]" onClick={close} />
        <CardTitle text={"Choose Avatar"} />
        <div className='flex flex-wrap justify-center gap-3'>
          {avatars && avatars.map((avatar) => (
            <AvatarItem key={avatar.id} avatar={avatar} clicked={() => changeAvatar(avatar)} size={'md'} />
          ))}
        </div>
        <div className='flex flex-wrap justify-center gap-3'>
          {colors && colors.map((color) => (
            <ColorItem key={color.id} color={color} clicked={() => changeColor(color)} size={'md'} />
          ))}
        </div>
      </div>
    </div>
  )
}