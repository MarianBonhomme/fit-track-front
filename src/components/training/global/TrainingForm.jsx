import { useEffect, useState } from 'react'
import { useTraining } from '../../../utils/training/TrainingContext'
import { Icon } from '@iconify/react/dist/iconify.js';
import moment from 'moment';
import AddButton from '../../global/AddButton';
import PatternIndicator from './PatternIndicator';

export default function TrainingForm() {
  const { programs, handleAddTraining, handleDeleteTraining, closeTrainingForm, trainingFormData, openProgramForm } = useTraining();
  const [difficulty, setDifficulty] = useState(trainingFormData.training ? trainingFormData.training.difficulty : 1);
  const [isValidated, setisValidated] = useState(trainingFormData.training ? trainingFormData.training.is_validated : 1);;
  const [selectedProgram, setSelectedProgram] = useState(trainingFormData.programId && trainingFormData.programId);
  const [isProgramsListVisible, setIsProgramsListVisible] = useState();

  const [formData, setFormData] = useState({
    id: trainingFormData.training ? trainingFormData.training.id : null,
    date: trainingFormData.date ? moment(trainingFormData.date).format("YYYY-MM-DD") : new Date(),
    weight: trainingFormData.training ? trainingFormData.training.weight : 0,
    comment: trainingFormData.training ? trainingFormData.training.comment : '',
  })

  useEffect(() => {
    setSelectedProgram(getProgramById(trainingFormData.programId));
  }, [trainingFormData])

  useEffect(() => {
    setFormData({
      ...formData,
      program_id: selectedProgram && selectedProgram.id
    })
  }, [selectedProgram])

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
      is_validated: isValidated,
    }
    handleAddTraining(newTraining)
	  closeTrainingForm();
	};

  const deleteTraining = () => {
    const confirm = window.confirm('Are your sure ?')
    if (confirm) {
      handleDeleteTraining(trainingFormData.training);
      closeTrainingForm();
    }
  }

  const getProgramById = (programId) => {
    return programs.find(program => program.id === programId)
  }

  const selectProgram = (program) => {
    setSelectedProgram(program);
    setIsProgramsListVisible(false);
  }

  return (
    <div className='h-screen w-full fixed top-0 left-0 flex bg-opacity-70 bg-black justify-center items-center sm:items-start p-5 sm:pt-20 z-40'>
      <form onSubmit={handleSubmit} className='w-full max-w-xl flex flex-col items-center bg-primary px-3 py-5 sm:p-10 relative rounded-2xl'>
        <Icon icon="maki:cross" className="absolute top-5 right-5 sm:right-10 sm:top-10 text-red cursor-pointer size-[20px] sm:size-[25px]" onClick={closeTrainingForm} />
        <h3 className='font-bold mb-5 sm:mb-10'>Add Training</h3>
        <div className='flex flex-col items-center relative gap-5'>
          <div className={`min-w-80 px-5 rounded-xl relative bg-lightPrimary`}>
            <div className='w-full flex justify-between items-center gap-5 py-3'>
              {selectedProgram ? (
                <div className="grow flex justify-between items-center relative">
                  {selectedProgram.name}
                </div>
              ) : (
                <p className='text-center text-gray font-bold'>Select program</p>
              )}
              {(!trainingFormData.training && !trainingFormData.programId) && (
                <Icon icon="ion:chevron-up" width={25} height={25} className={`transition ${isProgramsListVisible ? '' : 'rotate-180'} cursor-pointer`}  onClick={() => setIsProgramsListVisible(!isProgramsListVisible)}/>
              )}
            </div>
            {isProgramsListVisible && (
              <div className='w-full max-h-[60dvh] absolute top-full left-0 overflow-y-scroll hide-scrollbar bg-lightPrimary rounded-2xl z-50'>
                <div className='flex justify-center items-center gap-3 cursor-pointer max-sm:py-3' onClick={openProgramForm}>
                  <AddButton css={'sm:h-14'} />
                  <p className='text-gray font-bold'>New Program</p>
                </div>
                {programs && programs.map((program) => {
                  return ( !program.is_completed &&
                    <div key={program.id} className={`pl-5 p-3 sm:p-5 border-t border-primary cursor-pointer relative`} onClick={() => selectProgram(program)}>
                      <PatternIndicator pattern={program.pattern} />
                      {program.name}
                    </div>
                  )
                })}
              </div>     
            )}
          </div>
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
            <div className="flex border border-lightPrimary rounded-full overflow-hidden">
              <div className={`px-5 py-3 ${!isValidated ? 'bg-lightPrimary' : 'cursor-pointer'}`} onClick={() => setisValidated(0)}>
                <Icon icon="material-symbols:cancel-rounded" width="25" height="25" className='text-red' />
              </div>
              <div className={`px-5 py-3 ${isValidated ? 'bg-lightPrimary' : 'cursor-pointer'}`} onClick={() => setisValidated(1)}>
                <Icon icon="icon-park-solid:check-one" width="25" height="25" className="text-green" />
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
        <div className='flex justify-center items-center gap-5 mt-5 sm:mt-10'>
          {trainingFormData?.training && (<button className={`font-bold bg-red text-primary px-5 py-3 rounded-3xl`} onClick={deleteTraining}>Delete</button>)}
          <button type="submit" disabled={!selectedProgram} className={`font-bold bg-blue text-primary px-5 py-3 rounded-3xl ${selectedProgram ?? 'opacity-80'}`}>Confirm</button>
        </div>
      </form>
    </div>
  )
}