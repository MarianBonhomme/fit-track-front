import React, { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useAvatar } from '../../utils/settings/AvatarContext';
import { useTheme } from '../../utils/global/ThemeContext';
import AddButton from '../nutrition/global/AddButton';
import AvatarCard from './avatars/AvatarCard';
import AvatarForm from './avatars/AvatarForm';

export default function SettingsDashboard() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { avatars } = useAvatar();
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