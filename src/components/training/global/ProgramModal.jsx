import { useEffect, useState } from 'react'
import { useTraining } from '../../../utils/training/TrainingContext'
import { Icon } from '@iconify/react/dist/iconify.js';
import CardTitle from '../../global/CardTitle';
import Modal from '../../global/Modal';

export default function ProgramModal() {
  const { handleAddProgram, handleDeleteProgram, closeProgramModal, programFormData } = useTraining();
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
	  closeProgramModal();
	};

  const deleteProgram = () => {
    const confirm = window.confirm("Are you sure ?");
    if (confirm) {
      handleDeleteProgram(formData)
      closeProgramModal()
    }
  }

  const handlePatternClick = (clickedPattern) => {
    setFormData({...formData, pattern: clickedPattern})
  }

  return (
    <Modal close={closeProgramModal}>
      <Icon icon="solar:star-bold" className={`absolute top-5 left-5 size-[20px] text-${formData.is_favorite ? 'yellow' : 'gray'} cursor-pointer`} onClick={toggleIsFavorite} />   
      <CardTitle text={'Program'} />
      <form onSubmit={handleSubmit}>
        <div className='grid gap-3'>   
          <div className='flex items-center gap-5 bg-lightPrimary px-5 py-3'>
            <CardTitle text={'Name*'} alignLeft={true} />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
						  onChange={handleChange}
              className='bg-transparent text-secondary w-full p-3'
              required
            />
          </div> 
          <div className='bg-lightPrimary p-5'>
            <CardTitle text={'Description'} alignLeft={true} />
            <textarea
              id="description"
              name="description"
              value={formData.description}
						  onChange={handleChange}
              rows="2"
              className='bg-transparent text-secondary w-full mt-3'
            />
          </div> 
          <div className='bg-lightPrimary p-5'>
            <CardTitle text={'Type'} alignLeft={true} />
            <Patterns programPattern={formData.pattern} clicked={handlePatternClick} />
          </div>
        </div>
        <div className='flex items-center justify-center gap-5 mt-5'>
          {programFormData.name && (<button type='button' className={`font-bold bg-red text-primary px-5 py-3 rounded-3xl`} onClick={deleteProgram}>Delete</button>)}
          <button type="submit" disabled={!isFormValid} className={`font-bold bg-blue text-primary px-5 py-3 rounded-3xl ${!isFormValid && 'brightness-75'}`}>Confirm</button>
        </div>
      </form>
    </Modal>
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
    <div className='flex items-center justify-between mt-3'>
      {patterns.map((pattern, index) => (
        <div key={index} onClick={() => clicked(pattern)} className={`w-16 sm:w-20 text-center py-2 rounded-lg capitalize ${programPattern === pattern ? `${getBackgroundByPattern(pattern)} cursor-default text-primary font-semibold` : 'bg-primary text-secondary cursor-pointer'}`}>{pattern}</div>
      ))}
    </div>
  )
}