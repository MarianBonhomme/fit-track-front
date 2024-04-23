import React, { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import TrainingCard from './TrainingCard'
import { useSport } from '../../../utils/sport/SportContext'
import { getShortDate } from '../../../utils/global/DateService';
import TrainingForm from './TrainingForm';
import { getLastTraining } from '../../../utils/sport/SportService';

export default function ProgramJourney({program}) {
  const { handleUpdateProgram, handleDeleteProgram } = useSport();
  const [isTrainingFormDisplayed, setIsTrainingFormDisplayed] = useState(false)
  const [trainingToUpdate, setTrainingToUpdate] = useState(null)

  const toggleFavorite = () => {
    const programFavorite = { ...program, is_favorite: !program.is_favorite};
    handleUpdateProgram(programFavorite);
  }

  const editTraining = (training) => {
    setTrainingToUpdate(training);
    setIsTrainingFormDisplayed(true);
  }

  const stopProgram = () => {
    const confirm = window.confirm("Are you sure ?");
    if (confirm) {
      const lastTraining = getLastTraining(program);
      const lastTrainingDate = lastTraining.date;
      const programToStop = {...program, ended_date: lastTrainingDate }
      handleUpdateProgram(programToStop)
    }
  }

  const restartProgram = () => {
    const confirm = window.confirm("Are you sure ?");
    if (confirm) {
      const programToRestart = {...program, ended_date: null }
      handleUpdateProgram(programToRestart)
    }
  }

  const deleteProgram = () => {
    const confirm = window.confirm("Are you sure ?");
    if (confirm) {
      handleDeleteProgram(program)
    }
  }

  return (
    <>
      <div className={`bg-primary text-secondary mb-5 p-5 rounded-3xl rounded-tl-none`}>
        <div className='flex justify-between items-start mb-5'>   
          <div className="flex items-center gap-3">       
            <Icon icon="maki:cross" width={35} height={35} className="text-red cursor-pointer" onClick={deleteProgram} />
            {!program.ended_date && (
              <Icon icon="solar:star-bold" width={30} height={30} className={`${program.is_favorite ? 'text-yellow' : 'text-lightPrimary'} cursor-pointer`} onClick={toggleFavorite} />
            )} 
            <div>
              <p className="text-xl font-bold">{program.name}</p>
              <p className='font-semibold'>{program.description}</p>
            </div>
          </div> 
          <div className='flex flex-col gap-1'>
            {program.starting_date && (
              <div className="flex items-center gap-2">
                <div className="w-20 text-sm text-center bg-green text-primary font-semibold rounded-md">Start</div>
                <p>{getShortDate(new Date(program.starting_date))}</p>
              </div>
            )}
            {program.ended_date && (   
              <div className="flex items-center gap-2">
                <div className="w-20 text-sm text-center bg-red text-primary font-semibold rounded-md">End</div>
                <p>{getShortDate(new Date(program.ended_date))}</p>
              </div>
            )}
          </div>
          <div className='flex flex-col gap-1'>
            {/* {program.starting_date && (    
              <>
                <div className="flex items-center gap-2">
                  <div className="w-20 text-sm text-center bg-blue text-primary font-semibold rounded-md">Start</div>
                  <p>{startPerformance}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 text-sm text-center bg-yellow text-primary font-semibold rounded-md">Best</div>
                  <p>{bestPerformance}</p>
                </div>
              </>
            )} */}
          </div>
        </div>          
        <div className='flex flex-wrap items-stretch gap-3'>
          {program.trainings && program.trainings.map((training) => (
            <TrainingCard key={training.id} training={training} edit={() => editTraining(training)} />
          ))}          
          <div className='w-40 h-40 flex justify-center items-center cursor-pointer'>
            {!program.starting_date ? (
              <Icon icon="heroicons-solid:play" width="50" height="50" className='text-blue' onClick={() => setIsTrainingFormDisplayed(true)} />
            ) : (
              !program.ended_date ? (
                <>
                  <Icon icon="icon-park-solid:add-one" width="50" height="50" className='text-blue' onClick={() => setIsTrainingFormDisplayed(true)} />
                  <Icon icon="carbon:stop-filled" width="50" height="50" className='text-red' onClick={stopProgram} />
                </>
              ) : (
                <Icon icon="solar:restart-circle-bold" width="50" height="50" className='text-blue' onClick={restartProgram} />
              )
            )} 
          </div>      
        </div>
      </div>
      {isTrainingFormDisplayed && (
        <TrainingForm program={program} training={trainingToUpdate} close={() => setIsTrainingFormDisplayed(false)}/>
      )}
    </>
  )
}
