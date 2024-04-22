import { useState } from 'react'
import { useSport } from '../../../utils/sport/SportContext'
import { Icon } from '@iconify/react/dist/iconify.js';

export default function CreateProgramForm({ close }) {
  const { handleAddProgram } = useSport();
  const [isFormValid, setIsFormValid] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    is_favorite: false,
  })

  const toggleIsFavorite = () => {
    setFormData({
      ...formData,
      is_favorite: !formData.is_favorite,
    });
  };

  const handleChange = (e) => {
	  const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setIsFormValid(formData.name !== '')
	};

  const handleSubmit = (e) => {
	  e.preventDefault();
    handleAddProgram(formData)
	  close();
	};

  return (
    <div className='h-screen w-full fixed top-0 left-0 flex bg-opacity-70 bg-black justify-center items-center z-50'>
      <form onSubmit={handleSubmit} className='w-full max-w-3xl flex flex-col items-center bg-primary p-10 relative rounded-2xl'>
        <Icon icon="maki:cross" width={35} height={35} className="absolute right-10 top-10 text-red cursor-pointer" onClick={close} />
        <h3 className='font-bold text-3xl mb-10'>Create New Program</h3>
        <div className='w-full flex flex-col items-center relative gap-5'>
          <Icon icon="solar:star-bold" width={40} height={40} className={`text-${formData.is_favorite ? 'yellow' : 'gray'} cursor-pointer`} onClick={toggleIsFavorite} />      
          <div className='flex flex-col relative'>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
						  onChange={handleChange}
              className='max-w-100 px-3 py-1 rounded-md bg-lightPrimary text-secondary font-bold'
              required
            />
          </div> 
          <div className='flex flex-col relative'>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
						  onChange={handleChange}
              className='max-w-100 px-3 py-1 rounded-md bg-lightPrimary text-secondary font-bold'
            />
          </div>          
        </div>
        <button type="submit" disabled={!isFormValid} className={`font-bold bg-blue text-primary px-10 py-3 rounded-3xl mt-10 ${!isFormValid && 'brightness-90'}`}>Confirm</button>
      </form>
    </div>
  )
}