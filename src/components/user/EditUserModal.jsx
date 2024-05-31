import React, { useState } from 'react'
import { useUser } from '../../utils/user/UserContext';
import { Icon } from '@iconify/react/dist/iconify.js';
import { getColorByMacro } from '../../utils/global/MacroService';
import CardTitle from './../global/CardTitle';
import { macros } from '../../utils/global/MacroService';
import AvatarModal from './AvatarModal';
import AvatarColor from './AvatarColor';

export default function EditUserModal({close}) {
  const { user, handleUpdateUser } = useUser();
  const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);

  const [formData, setFormData] = useState({
    pseudo: user.pseudo,
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
    <div className='h-screen w-full bg-opacity-70 bg-black flex justify-center items-center fixed top-0 left-0 z-40'>
      <form onSubmit={handleSubmit} className={`max-sm:h-screen w-full sm:max-w-xl sm:rounded-3xl flex flex-col justify-between py-5 bg-primary relative`}>
        <Icon icon="maki:cross" className="absolute top-5 right-5 text-red cursor-pointer size-[20px] sm:size-[25px]" onClick={close} />
        <CardTitle text={'Edit User'} />
        <div className='grid gap-5 mt-10'>
          <div className="bg-lightPrimary p-5">
            <CardTitle text={'Avatar'} alignLeft={true} />
            <div className='flex flex-col items-center gap-1'>
              <AvatarColor avatar={user.avatar} color={user.color} colorSize={"xl"} avatarSize={"lg"} clicked={() => setIsAvatarModalVisible(true)} />
              <input
                type="text"
                id="pseudo"
                name="pseudo"
                value={formData.pseudo}
                onChange={handleChange}
                className={`text-lg bg-transparent text-secondary text-center font-bold`}
                required
              />
            </div>
          </div>
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
        </div>
        <button type="submit" className={`font-bold bg-blue text-primary px-5 py-3 rounded-3xl flex mx-auto mt-10`}>Confirm</button>
      </form>    
      {isAvatarModalVisible &&
        <AvatarModal close={() => setIsAvatarModalVisible(false)} />
      }
    </div>
  )
}