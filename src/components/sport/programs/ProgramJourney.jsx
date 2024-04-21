import React, { useEffect, useState } from 'react'
import { getTrainingsByProgramId } from '../../../utils/sport/SportService'
import { Icon } from '@iconify/react/dist/iconify.js'
import TrainingCard from './TrainingCard'
import { useSport } from '../../../utils/sport/SportContext'
import { getShortDate } from '../../../utils/global/DateService'

export default function ProgramJourney({program}) {
  const { handleUpdateProgram } = useSport();
  const [trainings, setTrainings] = useState([])

  useEffect(() => {
    const fetchTrainings = async () => {
      const fetchedTrainings = await getTrainingsByProgramId(program.id)
      setTrainings(fetchedTrainings);
    }

    fetchTrainings();
  }, [])

  const toggleFavorite = () => {
    const programFavorite = { ...program, is_favorite: !program.is_favorite};
    handleUpdateProgram(programFavorite);
  }

  return (
    <div className="flex p-5 border-b border-lightPrimary last:border-b-0">
      <div className="w-5/6">
        <div className='flex items-center gap-3 mb-3'>          
          {!program.is_finished && (
            <Icon icon="solar:star-bold" width={30} height={30} className={`${program.is_favorite ? 'text-yellow' : 'text-gray'} cursor-pointer`} onClick={toggleFavorite} />
          )}   
          <p className="text-2xl font-semibold mr-10">{program.name}</p>
        </div>          
        <div className='flex flex-wrap items-stretch gap-3'>
          {trainings && trainings.map((training, index) => (
            <TrainingCard key={training.id} training={training} index={index} />
          ))}
          {!program.is_finished && (
            <div className='w-20 bg-lightPrimary flex justify-center items-center rounded-2xl p-5 cursor-pointer'>
              <Icon icon="ph:plus-bold" width="15" height="15" className='text-secondary' />
            </div>
          )}        
        </div>
      </div>
      <div className="w-1/6 border-l border-lightPrimary flex flex-col">
        {program.is_finished ? (
          <>
            <p className='bg-blue text-primary rounded-lg w-28 text-center font-bold self-end mb-3'>Terminé</p>
            <div className="p-3">
              <div className='flex justify-between'>
                <p className='font-semibold'>Date de fin:</p>
                <p>{getShortDate(new Date(program.ended_date))}</p>
              </div>
              {program.finished_reason && (
                <>
                  <p className='font-semibold mt-3'>Commentaire:</p>
                  <p>{program.finished_reason}</p>
                </>
              )}
            </div>
          </>
        ) : (
          <p className='bg-orange text-primary rounded-lg w-28 text-center font-bold self-end'>En cours</p>
        )}
      </div>
    </div>
  )
}
