import React, { useState } from 'react';
import { useUser } from '../utils/user/UserContext';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import AvatarColor from '../components/user/AvatarColor';
import AvatarItem from '../components/user/AvatarItem';
import ColorItem from '../components/user/ColorItem';
import CardTitle from '../components/global/CardTitle';
import { macros } from '../utils/global/MacroService';
import DailyMacroGoal from '../components/user/DailyMacroGoal';
import DailyMacroGoalForm from '../components/user/DailyMacroGoalForm';
import { Icon } from '@iconify/react/dist/iconify.js';


export default function UserPage() {
  const { user, avatars, colors, handleSignout, handleUpdateUser, userLoading, isDarkMode, toggleDarkMode } = useUser();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const changeAvatar = (avatar) => {
    const updatedUser = { ...user, avatar_id: avatar.id }
    handleUpdateUser(updatedUser)
  }

  const changeColor = (color) => {
    const updatedUser = { ...user, color_id: color.id }
    handleUpdateUser(updatedUser)
  } 
  
  return ( 
    !userLoading && 
      <>
        <div className='grid sm:grid-cols-3 gap-3 sm:gap-5 p-3 sm:p-5'>
          <div className='flex flex-col items-center max-sm:gap-5 justify-center bg-primary rounded-3xl p-5 relative'>
            <div className='flex flex-col items-center gap-1'>
              <AvatarColor avatar={user.avatar} color={user.color} colorSize={"xl"} avatarSize={"lg"} />
              <p className='text-xl font-bold'>{user.pseudo}</p>
            </div>
            <div className="absolute top-5 left-5">
              <Icon icon="majesticons:logout-half-circle" className='text-red size-[30px] cursor-pointer' onClick={handleSignout} />
            </div>
            <div className="absolute top-5 right-5">
              <DarkModeSwitch
                checked={isDarkMode}
                onChange={toggleDarkMode}
                size={30}
              />
            </div>
          </div>
          <div className="flex flex-col items-center bg-primary rounded-3xl p-5 relative">
            <CardTitle text={"Daily Macros Goals"} />
            <div className='grid grid-cols-2 gap-5 mt-5'>
              {macros.map((macro) => (
                <DailyMacroGoal key={macro} value={user[`daily${macro.charAt(0).toUpperCase()}${macro.slice(1)}`]} macro={macro} />
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