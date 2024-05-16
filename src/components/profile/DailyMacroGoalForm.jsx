import React from 'react'
import { useProfile } from '../../utils/profile/ProfileContext'
import MacroItem from '../nutrition/global/MacroItem';
import { useUser } from '../../utils/user/UserContext';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function DailyMacroGoalForm(close) {
  const { isDarkMode } = useUser();
  const { profile, handleUpdateProfile } = useProfile();

  return (
    <div className='h-screen w-full fixed top-0 left-0 flex bg-opacity-70 bg-black justify-center items-center sm:items-start p-5 sm:pt-20 z-50'>
      <div className={`w-full max-w-xl px-3 py-5 sm:p-10 relative rounded-2xl ${isDarkMode ? 'bg-primary' : 'bg-lightPrimary'}`}>
        <Icon icon="maki:cross" className="absolute top-5 right-5 sm:right-10 sm:top-10 text-red cursor-pointer size-[20px] sm:size-[25px]" onClick={close} />
        <h3 className='text-center font-bold mb-5 sm:mb-10'>Edit Daily Macro Goals</h3>
        <div className='grid grid-cols-2 justify-center gap-5'>
          <MacroItem macro="kcal" value={profile.dailyKcal} />
          <MacroItem macro="prot" value={profile.dailyProt} />
          <MacroItem macro="fat" value={profile.dailyFat} />
          <MacroItem macro="carb" value={profile.dailyCarb} />
        </div>
      </div>
    </div>
  )
}