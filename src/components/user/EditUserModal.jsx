import React, { useState } from 'react'
import { useUser } from '../../utils/user/UserContext';
import { Icon } from '@iconify/react/dist/iconify.js';
import { getColorByMacro } from '../../utils/global/MacroService';
import CardTitle from './../global/CardTitle';
import { macros } from '../../utils/global/MacroService';

export default function EditUserModal({close}) {
  const { user, handleUpdateUser, isDarkMode } = useUser();

  const [formData, setFormData] = useState({
    dailyKcal: user.dailyKcal,
    dailyProt: user.dailyProt,
    dailyFat: user.dailyFat,
    dailyCarb: user.dailyCarb,
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

    const userToUpdate = {...user, ...formData}
    handleUpdateUser(userToUpdate)

	  close();
	};

  return (
    <form onSubmit={handleSubmit} className={`h-screen w-full fixed flex flex-col justify-between top-0 left-0 py-5 bg-primary z-50`}>
      <Icon icon="maki:cross" className="absolute top-5 right-5 sm:right-10 sm:top-10 text-red cursor-pointer size-[20px] sm:size-[25px]" onClick={close} />
      <CardTitle text={'Edit User'} />
      <div className="bg-lightPrimary p-5">
        <CardTitle text={'Daily Macro Goals'} alignLeft={true} css={'mb-5'} />
        <div className='flex justify-evenly'>
          {macros.map((macro) => {
            const firstLetterUpper = macro.charAt(0).toUpperCase();
            const dailyMacro = `daily${firstLetterUpper}${macro.slice(1)}`;
            return (
              <div className='flex flex-col mx-auto'>
                <input
                  type="number"
                  id={macro}
                  name={dailyMacro}
                  value={formData[dailyMacro]}
                  onChange={handleChange}
                  className={`w-16 h-16 text-center font-bold rounded-full bg-${getColorByMacro(macro)} text-primary font-bold`}
                  required
                  min="0"
                  max="9999"
                />
                <p className='text-center'>{macro}</p>
              </div>
            )
          })}
        </div>
      </div>
      <button type="submit" className={`font-bold bg-blue text-primary px-5 py-3 rounded-3xl flex mx-auto mt-10`}>Confirm</button>
    </form>
  )
}