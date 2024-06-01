import { useEffect, useState } from 'react'
import { useTraining } from '../../../utils/training/TrainingContext'
import { Icon } from '@iconify/react/dist/iconify.js';
import moment from 'moment';
import CardTitle from '../../global/CardTitle';
import SelectProgramModal from './SelectProgramModal';

export default function TrainingForm() {
  const { programs, handleAddTraining, handleDeleteTraining, closeTrainingForm, trainingFormData, openProgramForm } = useTraining();
  const [difficulty, setDifficulty] = useState(trainingFormData.training ? trainingFormData.training.difficulty : 1);
  const [isValidated, setisValidated] = useState(trainingFormData.training ? trainingFormData.training.is_validated : 1);;
  const [selectedProgram, setSelectedProgram] = useState(trainingFormData.programId && trainingFormData.programId);
  const [isSelectProgramModalVisible, setIsSelectProgramModalVisible] = useState(false);

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
    setIsSelectProgramModalVisible(false);
  }

  return (
    <>
      <div className="h-screen w-full bg-opacity-70 bg-black flex justify-center items-center fixed top-0 left-0 z-30">
        <form onSubmit={handleSubmit} className='max-sm:h-screen w-full sm:max-w-xl sm:rounded-3xl flex flex-col gap-10 bg-primary relative py-5'>
          <Icon icon="maki:cross" className="absolute top-5 right-5 text-red cursor-pointer size-[20px]" onClick={closeTrainingForm} />
          <CardTitle text={'Training'} />
          <div className='grid gap-5'>
            <div className={`flex items-center gap-5 bg-lightPrimary px-5 py-3 relative`}>            
              <CardTitle text={'Program'} alignLeft={true} />
              <div className='w-full flex items-center gap-1 py-3 cursor-pointer' onClick={() => setIsSelectProgramModalVisible(true)}>
                {selectedProgram ? (
                  <div className="flex justify-center items-center relative">
                    {selectedProgram.name}
                  </div>
                ) : (
                  <p>Select program</p>
                )}
                {(!trainingFormData.training && !trainingFormData.programId) && (
                  <Icon icon="ion:chevron-down" width={20} height={20} className='text-secondary'/>
                )}
              </div>
            </div>
            <div className='flex items-center gap-5 bg-lightPrimary px-5 py-3'>
              <CardTitle text={'Date'} alignLeft={true} />
              <input
                type="date"
                id="date"
                name="date"
                step="0.01"
                value={formData.date}
                onChange={handleChange}
                className='bg-transparent text-secondary text-center'
                required
              />
            </div>
            <div className='flex items-center gap-5 bg-lightPrimary px-5 py-3'>
              <CardTitle text={'Weight'} alignLeft={true} />
              <div className='flex'>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  step="0.01"
                  value={formData.weight}
                  onChange={handleChange}
                  className='bg-transparent text-secondary text-center max-w-8'
                  required
                />
                kg
              </div>
            </div> 
            <div className='flex items-center gap-5 bg-lightPrimary px-5 py-3'>
              <CardTitle text={'Validated'} alignLeft={true} />
              <div className='bg-primary rounded-full'>
                <div className="flex border border-primary rounded-full overflow-hidden">
                  <div className={`px-3 py-2 ${!isValidated ? 'bg-lightPrimary' : 'cursor-pointer'}`} onClick={() => setisValidated(0)}>
                    <Icon icon="material-symbols:cancel-rounded" width="20" height="20" className='text-red' />
                  </div>
                  <div className={`px-3 py-2 ${isValidated ? 'bg-lightPrimary' : 'cursor-pointer'}`} onClick={() => setisValidated(1)}>
                    <Icon icon="icon-park-solid:check-one" width="20" height="20" className="text-green" />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-5 bg-lightPrimary px-5 py-3'>
              <CardTitle text={'Difficulty'} alignLeft={true} />
              <div className='flex justify-center gap-2 font-bold bg-primary rounded-full px-2 py-1'>
                <p onClick={() => setDifficulty(1)} className={`flex items-center justify-center h-6 w-6 rounded-full ${difficulty === 1 ? 'bg-green text-primary' : 'text-green cursor-pointer' }`}>1</p>
                <p onClick={() => setDifficulty(2)} className={`flex items-center justify-center h-6 w-6 rounded-full ${difficulty === 2 ? 'bg-green text-primary' : 'text-green cursor-pointer' }`}>2</p>
                <p onClick={() => setDifficulty(3)} className={`flex items-center justify-center h-6 w-6 rounded-full ${difficulty === 3 ? 'bg-yellow text-primary' : 'text-yellow cursor-pointer' }`}>3</p>
                <p onClick={() => setDifficulty(4)} className={`flex items-center justify-center h-6 w-6 rounded-full ${difficulty === 4 ? 'bg-orange text-primary' : 'text-orange cursor-pointer' }`}>4</p>
                <p onClick={() => setDifficulty(5)} className={`flex items-center justify-center h-6 w-6 rounded-full ${difficulty === 5 ? 'bg-red text-primary' : 'text-red cursor-pointer' }`}>5</p>
              </div>
            </div>   
            <div className='bg-lightPrimary p-5'>
              <CardTitle text={'Difficulty'} alignLeft={true} />
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows={2}
                className='bg-transparent text-secondary w-full mt-3'
              />
            </div>       
          </div>   
          <div className='flex justify-center items-center gap-5'>
            {trainingFormData?.training && (<button className={`font-bold bg-red text-primary px-5 py-3 rounded-3xl`} onClick={deleteTraining}>Delete</button>)}
            <button type="submit" disabled={!selectedProgram} className={`font-bold bg-blue text-primary px-5 py-3 rounded-3xl ${selectedProgram ?? 'opacity-80'}`}>Confirm</button>
          </div>
        </form>
      </div>   
      {isSelectProgramModalVisible &&
        <SelectProgramModal close={() => setIsSelectProgramModalVisible(false)} programClicked={selectProgram} />
      }
    </>
  )
}