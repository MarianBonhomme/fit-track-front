import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import TrainingCard from './TrainingCard'
import { useSport } from '../../../utils/sport/SportContext'
import { getShortDate } from '../../../utils/global/DateService';

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
    <div className={`${program.ended_date ? 'bg-green' : 'bg-blue'} text-primary mb-5 p-5 rounded-3xl rounded-tl-none`}>
      <div className='flex justify-between items-start mb-5'>   
        <div className="flex items-center gap-3">       
          {!program.ended_date && (
            <Icon icon="solar:star-bold" width={30} height={30} className={`${program.is_favorite ? 'text-yellow' : 'text-primary'} cursor-pointer`} onClick={toggleFavorite} />
          )} 
          <div>
            <p className="text-lg font-semibold">{program.name}</p>
            <p className="text-sm">{program.description}</p>
          </div>
        </div> 
        {program.ended_date && (
          <div>
            <p class="text-sm mb-2"><span className='font-semibold'>Date de fin:</span> {getShortDate(new Date(program.ended_date))}</p>
            {program.ended_reason && (
              <p class="text-sm"><span className='font-semibold'>Commentaire:</span> {program.ended_reason}</p>
            )}
          </div>
        )}
      </div>          
      <div className='flex flex-wrap items-stretch gap-3'>
        {programTrainings && programTrainings.map((training) => (
          <TrainingCard key={training.id} training={training} />
        ))}
        {!program.ended_date && (
          <Icon icon="icon-park-solid:add-one" width="40" height="40" className='text-primary my-auto' />
        )}        
      </div>
    </div>
  )
}
