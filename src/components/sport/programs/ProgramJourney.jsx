import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import TrainingCard from './TrainingCard'
import { useSport } from '../../../utils/sport/SportContext'
import { getShortDate } from '../../../utils/global/DateService'

export default function ProgramJourney({program}) {
  const { trainings, handleUpdateProgram } = useSport();
  const [programTrainings, setProgramTrainings] = useState();

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

  return (
    <div className="p-5 border-b border-lightPrimary last:border-b-0">
      <div className='w-1/2 flex justify-between items-start mb-5'>   
        <div class="flex items-center gap-3">       
          {!program.ended_date && (
            <Icon icon="solar:star-bold" width={30} height={30} className={`${program.is_favorite ? 'text-yellow' : 'text-gray'} cursor-pointer`} onClick={toggleFavorite} />
          )} 
          <div>
            <p className="text-lg font-semibold">{program.name}</p>
            <p className="text-sm">{program.description}</p>
          </div>
        </div> 
        {program.ended_date ? (
          <div className='flex flex-col items-end'>
            <p className='bg-blue text-primary rounded-lg w-28 text-center font-bold mb-1'>Terminé</p>
            <p class="text-sm">Date de fin: <span className='font-semibold'>{getShortDate(new Date(program.ended_date))}</span></p>
          </div>
        ) : (
          <p className='bg-orange text-primary rounded-lg w-28 text-center font-bold'>En cours</p>
        )} 
      </div>          
      <div className='flex flex-wrap items-stretch gap-3'>
        {programTrainings && programTrainings.map((training) => (
          <TrainingCard key={training.id} training={training} />
        ))}
        {!program.ended_date && (
          <div className='w-20 min-h-20 bg-lightPrimary flex justify-center items-center rounded-2xl p-5 cursor-pointer'>
            <Icon icon="ph:plus-bold" width="15" height="15" className='text-secondary' />
          </div>
        )}        
      </div>
    </div>
  )
}
