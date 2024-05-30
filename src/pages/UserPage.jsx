import React, { useState } from 'react';
import { useUser } from '../utils/user/UserContext';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import AvatarColor from '../components/user/AvatarColor';
import { macros } from '../utils/global/MacroService';
import DailyMacroGoal from '../components/user/DailyMacroGoal';
import { Icon } from '@iconify/react/dist/iconify.js';
import EditUserModal from '../components/user/EditUserModal';


export default function UserPage() {
  const { user, handleSignout, userLoading, isDarkMode, toggleDarkMode } = useUser();
  const [isEditUserModalVisible, setIsEditUserModalVisible] = useState(false);
  
  return ( 
    !userLoading && 
      <>
        <div className='grid sm:max-w-xl gap-10 p-3 sm:p-5 relative'>
          <div className='w-full flex flex-col gap-10 sm:bg-primary sm:rounded-3xl sm:p-5'>
            <div className="flex justify-between items-center">
              <Icon icon="majesticons:logout-half-circle" className='text-red size-[30px] cursor-pointer' onClick={handleSignout} />
              <Icon icon="akar-icons:edit" className='size-[30px]' onClick={() => setIsEditUserModalVisible(true)} />
              <DarkModeSwitch
                checked={isDarkMode}
                onChange={toggleDarkMode}
                size={30}
              />
            </div>
            <div className='flex flex-col items-center gap-1'>
              <AvatarColor avatar={user.avatar} color={user.color} colorSize={"4xl"} avatarSize={"xl"} />
              <p className='text-2xl font-bold'>{user.pseudo}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 max-sm:mx-auto gap-5">
            {macros.map((macro) => (
              <DailyMacroGoal key={macro} value={user[`daily${macro.charAt(0).toUpperCase()}${macro.slice(1)}`]} macro={macro} />
            ))}
          </div>
          
        </div>       
        {isEditUserModalVisible &&
          <EditUserModal close={() => setIsEditUserModalVisible(false)} />
        }
      </>
  )
}