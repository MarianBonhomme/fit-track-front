import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import TrainingCard from './TrainingCard'
import { useSport } from '../../../utils/sport/SportContext'
import { getShortDate } from '../../../utils/global/DateService';
import TrainingForm from './TrainingForm';

export default function ProgramJourney({program}) {
  const { trainings, handleUpdateProgram } = useSport();
  const [programTrainings, setProgramTrainings] = useState();
  const [isTrainingFormDisplayed, setIsTrainingFormDisplayed] = useState(false)
  const [trainingToUpdate, setTrainingToUpdate] = useState(null)

  useEffect(() => {
    const filteredTrainings = getProgramTrainings();
    setProgramTrainings(filteredTrainings);
  }, [trainings])

  const getProgramTrainings = () => {
    const filteredTrainings = trainings.filter(training => training.program_id === program.id);
    return filteredTrainings;
  }

  const toggleFavorite = () => {
    const programFavorite = { ...program, is_favorite: !program.is_favorite};
    handleUpdateProgram(programFavorite);
  }

  const editTraining = (training) => {
    setTrainingToUpdate(training);
    setIsTrainingFormDisplayed(true);
  }

  return (
    <>
      <div className={`bg-primary text-secondary mb-5 p-5 rounded-3xl rounded-tl-none`}>
        <div className='flex justify-between items-start mb-5'>   
          <div className="flex items-center gap-3">       
            {!program.ended_date && (
              <Icon icon="solar:star-bold" width={30} height={30} className={`${program.is_favorite ? 'text-yellow' : 'text-lightPrimary'} cursor-pointer`} onClick={toggleFavorite} />
            )} 
            <div>
              <p className="text-xl font-bold">{program.name}</p>
              <p className='font-semibold'>{program.description}</p>
            </div>
          </div> 
          {program.ended_date ? (
            <div>
              <div className='flex justify-between items-start gap-5'>
                <p className="text-sm mb-2"><span className='font-semibold'>Date de fin:</span> {getShortDate(new Date(program.ended_date))}</p>
                <div className="w-20 text-sm text-center bg-purple text-primary font-semibold rounded-md">Terminé</div>
              </div>
              {program.ended_reason && (
                <p className="text-sm"><span className='font-semibold'>Commentaire:</span> {program.ended_reason}</p>
              )}
            </div>
          ) : (
            program.starting_date ? (
              <div className="w-20 text-sm text-center bg-orange text-primary font-semibold rounded-md">En cours</div>
            ) : (
              <div className="w-20 text-sm text-center bg-blue text-primary font-semibold rounded-md">À faire</div>
            )
          )}
        </div>          
        <div className='flex flex-wrap items-stretch gap-3'>
          {programTrainings && programTrainings.map((training) => (
            <TrainingCard key={training.id} training={training} edit={() => editTraining(training)} />
          ))}
          {!program.ended_date && (
            <div className='w-40 h-40 flex justify-center items-center cursor-pointer' onClick={() => setIsTrainingFormDisplayed(true)} >
              <Icon icon="icon-park-solid:add-one" width="50" height="50" className='text-blue' />
            </div>
          )}        
        </div>
      </div>
      {isTrainingFormDisplayed && (
        <TrainingForm program={program} training={trainingToUpdate} close={() => setIsTrainingFormDisplayed(false)}/>
      )}
    </>
  )
}
