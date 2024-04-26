import { useState } from 'react'
import { useSport } from '../../../utils/sport/SportContext'
import { Icon } from '@iconify/react/dist/iconify.js';

export default function TrainingForm({ programId, training, close }) {
  const { handleAddTraining, handleUpdateTraining, handleDeleteTraining } = useSport();
  const [difficulty, setDifficulty] = useState(training ? training.difficulty : 1);
  const [isValidate, setIsValidate] = useState(training ? training.is_validate : 1);

  const [formData, setFormData] = useState({
    id: training ? training.id : null,
    program_id: programId,
    date: training ? training.date.toISOString().split('T')[0] : new Date(),
    weight: training ? training.weight : 0,
    comment: training ? training.comment : '',
  })

  const handleChange = (e) => {
	  const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
	};

  const handleSubmit = (e) => {
	  e.preventDefault();
    const newTraining = {
      ...formData,
      difficulty: difficulty,
      is_validate: isValidate,
    }
    if (training) {
      handleUpdateTraining(newTraining)
    } else {
      handleAddTraining(newTraining)
    }
	  close();
	};

  const deleteTraining = () => {
    const confirm = window.confirm('Are your sure ?')
    if (confirm) {
      handleDeleteTraining(training);
      close();
    }
  }

  return (
    <div className='h-screen w-full fixed top-0 left-0 flex bg-opacity-70 bg-black justify-center items-center z-50'>
      <form onSubmit={handleSubmit} className='w-full max-w-3xl flex flex-col items-center bg-primary p-10 relative rounded-2xl'>
        <Icon icon="maki:cross" width={35} height={35} className="absolute right-10 top-10 text-red cursor-pointer" onClick={close} />
        <h3 className='font-bold text-3xl mb-10'>{program.name}</h3>
        <div className='w-full flex flex-col items-center relative gap-10'>
          <div className='flex flex-col relative'>
            <label htmlFor="weight">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              step="0.01"
              value={formData.date}
              onChange={handleChange}
              className='max-w-40 px-3 py-1 rounded-md bg-lightPrimary text-secondary font-bold'
              required
            />
          </div>
          <div className='flex flex-col relative'>
            <label htmlFor="weight">Weight</label>
            <div className='flex gap-3'>
              <input
                type="number"
                id="weight"
                name="weight"
                step="0.01"
                value={formData.weight}
  						  onChange={handleChange}
                className='max-w-28 px-3 py-1 rounded-md bg-lightPrimary text-secondary font-bold'
                required
              />
              kg
            </div>
          </div> 
          <div className='flex flex-col relative'>
            <div className="flex border border-lightPrimary rounded-xl overflow-hidden">
              <div className={`px-5 py-3 ${!isValidate ? 'bg-lightPrimary' : 'cursor-pointer'}`} onClick={() => setIsValidate(0)}>
                <Icon icon="material-symbols:cancel-rounded" width="40" height="40" className='text-red' />
              </div>
              <div className={`px-5 py-3 ${isValidate ? 'bg-lightPrimary' : 'cursor-pointer'}`} onClick={() => setIsValidate(1)}>
                <Icon icon="icon-park-solid:check-one" width="40" height="40" className="text-green" />
              </div>
            </div>
          </div>
          <div className='flex flex-col relative'>
            <p>Difficulty</p>
            <div className='flex justify-center gap-5 font-bold bg-lightPrimary rounded-full px-2 py-1'>
              <p onClick={() => setDifficulty(1)} className={`flex items-center justify-center h-8 w-8 rounded-full ${difficulty === 1 ? 'bg-green text-primary' : 'text-green cursor-pointer' }`}>1</p>
              <p onClick={() => setDifficulty(2)} className={`flex items-center justify-center h-8 w-8 rounded-full ${difficulty === 2 ? 'bg-green text-primary' : 'text-green cursor-pointer' }`}>2</p>
              <p onClick={() => setDifficulty(3)} className={`flex items-center justify-center h-8 w-8 rounded-full ${difficulty === 3 ? 'bg-yellow text-primary' : 'text-yellow cursor-pointer' }`}>3</p>
              <p onClick={() => setDifficulty(4)} className={`flex items-center justify-center h-8 w-8 rounded-full ${difficulty === 4 ? 'bg-orange text-primary' : 'text-orange cursor-pointer' }`}>4</p>
              <p onClick={() => setDifficulty(5)} className={`flex items-center justify-center h-8 w-8 rounded-full ${difficulty === 5 ? 'bg-red text-primary' : 'text-red cursor-pointer' }`}>5</p>
            </div>
          </div>   
          <div className='flex flex-col relative'>
            <label htmlFor="comment">Comment</label>
            <input
              type="text"
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              className='max-w-100 px-3 py-1 rounded-md bg-lightPrimary text-secondary font-bold'
            />
          </div>       
        </div>        
        <div className='flex items-center gap-5'>
          {training && (<button className={`font-bold bg-red text-primary px-10 py-3 rounded-3xl mt-10`} onClick={deleteTraining}>Delete</button>)}
          <button type="submit" className={`font-bold bg-blue text-primary px-10 py-3 rounded-3xl mt-10`}>Confirm</button>
        </div>
      </form>
    </div>
  )
}