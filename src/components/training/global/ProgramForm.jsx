import { useEffect, useState } from 'react'
import { useTraining } from '../../../utils/training/TrainingContext'
import { Icon } from '@iconify/react/dist/iconify.js';

export default function ProgramForm() {
  const { handleAddProgram, handleDeleteProgram, closeProgramForm, programFormData } = useTraining();
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
    <div className='h-screen w-full fixed top-0 left-0 flex bg-opacity-70 bg-black justify-center items-center sm:items-start p-5 sm:pt-20 z-50'>
      <form onSubmit={handleSubmit} className='w-full max-w-xl flex flex-col items-center bg-primary px-3 py-5 sm:p-10 relative rounded-2xl'>
        <Icon icon="maki:cross" className="absolute top-5 right-5 sm:right-10 sm:top-10 text-red cursor-pointer size-[20px] sm:size-[25px]" onClick={closeProgramForm} />
        <Icon icon="solar:star-bold" className={`absolute top-5 left-5 sm:right-10 sm:top-10 size-[20px] sm:size-[25px] text-${formData.is_favorite ? 'yellow' : 'gray'} cursor-pointer`} onClick={toggleIsFavorite} />   
        <h3 className='font-bold mb-5 sm:mb-10'>Create New Program</h3>
        <div className='w-full flex flex-col items-center relative gap-5'>   
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
        <div className='flex items-center justify-center gap-5 mt-5 sm:mt-10'>
          {programFormData.name && (<button type='button' className={`font-bold bg-red text-primary px-5 py-3 rounded-3xl`} onClick={deleteProgram}>Delete</button>)}
          <button type="submit" disabled={!isFormValid} className={`font-bold bg-blue text-primary px-5 py-3 rounded-3xl ${!isFormValid && 'brightness-75'}`}>Confirm</button>
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
    <div className='flex max-sm:flex-wrap items-center justify-center gap-3'>
      {patterns.map((pattern, index) => (
        <div key={index} onClick={() => clicked(pattern)} className={`px-5 py-2 rounded-lg capitalize ${programPattern === pattern ? `${getBackgroundByPattern(pattern)} cursor-default text-primary font-semibold` : 'bg-lightPrimary text-secondary cursor-pointer'}`}>{pattern}</div>
      ))}
    </div>
  )
}