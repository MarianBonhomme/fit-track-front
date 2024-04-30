import { useEffect, useState } from 'react'
import { useSport } from '../../../utils/sport/SportContext'
import { Icon } from '@iconify/react/dist/iconify.js';

export default function ProgramForm() {
  const { handleAddProgram, handleDeleteProgram, closeProgramForm, programFormData } = useSport();
  const [isFormValid, setIsFormValid] = useState(false);

  const [formData, setFormData] = useState({
    id: programFormData?.id,
    name: programFormData?.name,
    description: programFormData?.description,
    is_favorite: programFormData?.is_favorite,
    pattern: programFormData?.pattern
  })

  useEffect(() => {
    setIsFormValid(formData.name !== '' && formData.pattern)
  }, [formData])

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
	};

  const handleSubmit = (e) => {
	  e.preventDefault();
    handleAddProgram(formData)
	  closeProgramForm();
	};

  const deleteProgram = () => {
    const confirm = window.confirm("Are you sure ?");
    if (confirm) {
      handleDeleteProgram(formData)
      closeProgramForm()
    }
  }

  const handlePatternClick = (clickedPattern) => {
    setFormData({...formData, pattern: clickedPattern})
  }

  return (
    <div className='h-screen w-full fixed top-0 left-0 flex bg-opacity-70 bg-black justify-center items-center z-50'>
      <form onSubmit={handleSubmit} className='w-full max-w-3xl flex flex-col items-center bg-primary p-10 relative rounded-2xl'>
        <Icon icon="maki:cross" width={35} height={35} className="absolute right-10 top-10 text-red cursor-pointer" onClick={closeProgramForm} />
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
          <Patterns programPattern={formData.pattern} clicked={handlePatternClick} />
        </div>
        <div className='flex items-center justify-center gap-5'>
          {programFormData.name && (<button type='button' className={`font-bold bg-red text-primary px-10 py-3 rounded-3xl mt-10`} onClick={deleteProgram}>Delete</button>)}
          <button type="submit" disabled={!isFormValid} className={`font-bold bg-blue text-primary px-10 py-3 rounded-3xl mt-10 ${!isFormValid && 'brightness-75'}`}>Confirm</button>
        </div>
      </form>
    </div>
  )
}

function Patterns({programPattern, clicked}) {
  const patterns = ['push', 'pull', 'legs', 'abs', 'cardio'];
  const getBackgroundByPattern = (pattern) => {
    if (pattern === "push") {
      return 'bg-red'
    } else if (pattern === "pull") {
      return 'bg-green'
    } else if (pattern === "legs") {
      return 'bg-purple'
    } else if (pattern === "abs") {
      return 'bg-yellow'
    } else {
      return 'bg-blue'
    }
  }

  return (
    <div className='flex items-center justify-center gap-3'>
      {patterns.map((pattern) => (
        <div onClick={() => clicked(pattern)} className={`px-5 py-2 rounded-lg capitalize ${programPattern === pattern ? `${getBackgroundByPattern(pattern)} cursor-default text-primary font-semibold` : 'bg-lightPrimary text-secondary cursor-pointer'}`}>{pattern}</div>
      ))}
    </div>
  )
}