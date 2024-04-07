import React, { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import AddButton from '../nutrition/global/AddButton';
import AvatarCard from './avatars/AvatarCard';
import AvatarForm from './avatars/AvatarForm';
import { useUser } from '../../utils/user/UserContext';

export default function SettingsDashboard() {
  const { avatars, isDarkMode, toggleDarkMode } = useUser();
  const [isAvatarFormDisplayed, setIsAvatarFormDisplayed] = useState(false);

  return (
    <div className="p-5">      
      <div className='w-full flex justify-between items-center'>
        <AddButton btnClicked={() => setIsAvatarFormDisplayed(true)}/>
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={50}
        />
      </div>
      <div className='flex flex-wrap gap-x-5'>
        {avatars && avatars.map((avatar) => (
          <AvatarCard avatar={avatar} key={avatar.id} />
        ))}
      </div>
      {isAvatarFormDisplayed && (
        <AvatarForm close={() => setIsAvatarFormDisplayed(false)}/>
      )}
    </div>
  )
}