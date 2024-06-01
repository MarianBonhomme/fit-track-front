import React, { useState } from 'react'
import { useUser } from '../../utils/user/UserContext';
import { Icon } from '@iconify/react/dist/iconify.js';
import { getColorByMacro } from '../../utils/global/MacroService';
import CardTitle from './../global/CardTitle';
import { macros } from '../../utils/global/MacroService';
import AvatarModal from './AvatarModal';
import AvatarColor from './AvatarColor';
import Modal from '../global/Modal';

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
    <Modal close={close}>
      <CardTitle text={'Edit User'} />
      <form onSubmit={handleSubmit}>
        <div className='grid gap-3'>
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
            <CardTitle text={'Daily Macro Goals'} alignLeft={true} />
            <div className='flex justify-evenly mt-5'>
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
        <button type="submit" className={`font-bold bg-blue text-primary px-5 py-3 rounded-3xl flex mx-auto mt-5`}>Confirm</button>
      </form>    
      {isAvatarModalVisible &&
        <AvatarModal close={() => setIsAvatarModalVisible(false)} />
      }
    </Modal>
  )
}