import React, { useState } from 'react'
import { useProfile } from '../../utils/profile/ProfileContext'
import { useUser } from '../../utils/user/UserContext';
import { Icon } from '@iconify/react/dist/iconify.js';
import { getColorByMacro } from '../../utils/global/MacroService';

export default function DailyMacroGoalForm({close}) {
  const { isDarkMode } = useUser();
  const { profile, handleUpdateProfile } = useProfile();

  const [formData, setFormData] = useState({
    dailyKcal: profile.dailyKcal,
    dailyProt: profile.dailyProt,
    dailyFat: profile.dailyFat,
    dailyCarb: profile.dailyCarb,
  })

  const handleChange = (e) => {
	  const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })
	};

  const handleSubmit = (e) => {
	  e.preventDefault();

    const profileToUpdate = {...profile, ...formData}
    handleUpdateProfile(profileToUpdate)

	  close();
	};

  return (
    <div className='h-screen w-full fixed top-0 left-0 flex bg-opacity-70 bg-black justify-center items-center sm:items-start p-5 sm:pt-20 z-50'>
      <form onSubmit={handleSubmit} className={`w-full max-w-xl px-3 py-5 sm:p-10 relative rounded-2xl ${isDarkMode ? 'bg-primary' : 'bg-lightPrimary'}`}>
        <Icon icon="maki:cross" className="absolute top-5 right-5 sm:right-10 sm:top-10 text-red cursor-pointer size-[20px] sm:size-[25px]" onClick={close} />
        <h3 className='text-center font-bold mb-5 sm:mb-10'>Edit Daily Macro Goals</h3>
        <div className="grid grid-cols-2 gap-y-5">
          <div className='flex flex-col mx-auto'>
            <label htmlFor="kcal">Kcals</label>
            <input
              type="number"
              id="kcal"
              name="dailyKcal"
              value={formData.dailyKcal}
              onChange={handleChange}
              className={`max-w-20 px-3 py-1 rounded-md bg-${getColorByMacro('kcal')} text-primary font-bold`}
              required
              min="0"
            />
          </div>
          <div className='flex flex-col mx-auto'>
            <label htmlFor="prot">Proteins</label>
            <input
              type="number"
              id="prot"
              name="dailyProt"
              value={formData.dailyProt}
              onChange={handleChange}
              className={`max-w-20 px-3 py-1 rounded-md bg-${getColorByMacro('prot')} text-primary font-bold`}
              required
              min="0"
            />
          </div>
          <div className='flex flex-col mx-auto'>
            <label htmlFor="fat">Fats</label>
            <input
              type="number"
              id="fat"
              name="dailyFat"
              value={formData.dailyFat}
              onChange={handleChange}
              className={`max-w-20 px-3 py-1 rounded-md bg-${getColorByMacro('fat')} text-primary font-bold`}
              required
              min="0"
            />
          </div>
          <div className='flex flex-col mx-auto'>
            <label htmlFor="carb">Carbs</label>
            <input
              type="number"
              id="carb"
              name="DailyCarb"
              value={formData.dailyCarb}
              onChange={handleChange}
              className={`max-w-20 px-3 py-1 rounded-md bg-${getColorByMacro('carb')} text-primary font-bold`}
              required
              min="0"
            />
          </div>
        </div>
        <button type="submit" className={`font-bold bg-blue text-primary px-5 py-3 rounded-3xl flex mx-auto mt-10`}>Confirm</button>
      </form>
    </div>
  )
}