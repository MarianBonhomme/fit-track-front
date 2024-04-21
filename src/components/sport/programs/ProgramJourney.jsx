import React, { useEffect, useState } from 'react'
import { getTrainingsByProgramId } from '../../../utils/sport/SportService'
import { Icon } from '@iconify/react/dist/iconify.js'
import TrainingCard from './TrainingCard'
import { useSport } from '../../../utils/sport/SportContext'

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
    <div className="p-5 border-b border-lightPrimary last:border-b-0">
      <div className='flex items-center justify-between mb-5'>
        <div className='flex items-center gap-5'>
          <Icon icon="solar:star-bold" width={30} height={30} className={`${program.is_favorite ? 'text-yellow' : 'text-gray'} cursor-pointer`} onClick={toggleFavorite} />
          <p className="text-2xl mr-10">{program.name}</p>
        </div>
        <div className='flex items-center gap-5'>
          <p>{program.finished_reason && program.finished_reason}</p>
          {program.is_finished ? (
            <Icon icon="icon-park-solid:check-one" width="30" height="30" className='text-green' />
          ) : (
            <Icon icon="solar:hourglass-bold" width="30" height="30" className='text-yellow' />
          )}
        </div>
      </div>
      <div className='flex flex-wrap items-stretch gap-3'>
        {trainings && trainings.map((training, index) => (
          <TrainingCard key={training.id} training={training} index={index} />
        ))}
        <div className='w-20 bg-lightPrimary flex justify-center items-center rounded-2xl p-5 cursor-pointer'>
          <Icon icon="ph:plus-bold" width="15" height="15" className='text-secondary' />
        </div>
      </div>
    </div>
  )
}
