import React, { useState } from 'react'
import { useAvatar } from '../../../utils/settings/AvatarContext'
import { Icon } from '@iconify/react/dist/iconify.js';

export default function AvatarForm({ close }) {
  const { handleAddAvatar } = useAvatar();
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFormData = new FormData();

    if (file) {
      newFormData.append('image', file);
    } else {
      newFormData.append('image', null);
    }
    newFormData.append('name', name);

    handleAddAvatar(newFormData);
    close();
  }

  return (
    <div className='h-screen w-full fixed top-0 left-0 flex bg-opacity-70 bg-black justify-center items-center z-50'>
      <form onSubmit={handleSubmit} className='w-full max-w-3xl flex flex-col items-center bg-primary p-10 relative rounded-2xl'>
        <Icon icon="maki:cross" width={35} height={35} className="absolute right-10 top-10 text-red cursor-pointer" onClick={close} />
        <h3 className='font-bold text-3xl mb-10'>Create Avatar</h3>
        <div className='w-full flex flex-col items-center relative gap-10'>     
          <div className='flex flex-col relative'>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              name="image"
						  onChange={e => setFile(e.target.files[0])}
              accept="image/*"
            />
          </div>     
          <div className='flex flex-col relative'>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
						  onChange={() => setName(event.target.value)}
              className='max-w-100 px-3 py-1 rounded-md bg-lightPrimary text-secondary font-bold'
              required
            />
          </div>
        </div>
        {/* <button type="submit" disabled={!isFormValid} className={`font-bold bg-blue text-primary px-10 py-3 rounded-3xl mt-10 ${!isFormValid && 'brightness-90'}`}>Confirm</button> */}
        <button type="submit" className={`font-bold bg-blue text-primary px-10 py-3 rounded-3xl mt-10`}>Confirm</button>
      </form>
    </div>
  )
}