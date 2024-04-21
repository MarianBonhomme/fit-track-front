import React, { useEffect, useState } from 'react'
import { getTrainingsByProgramId } from '../../../utils/sport/SportService'
import { Icon } from '@iconify/react/dist/iconify.js'
import TrainingCard from './TrainingCard'

export default function ProgramResume({program}) {
  const [trainings, setTrainings] = useState([])

  useEffect(() => {
    const fetchTrainings = async () => {
      const fetchedTrainings = await getTrainingsByProgramId(program.id)
      setTrainings(fetchedTrainings);
    }

    fetchTrainings();
  }, [])

  return (
    <div className="p-5 border-b border-lightPrimary last:border-b-0">
      <div className='flex items-center gap-5 mb-5'>
        {program.is_finished ? (
          <Icon icon="icon-park-solid:check-one" width="30" height="30" className='text-green' />
        ) : (
          <Icon icon="solar:hourglass-bold" width="30" height="30" className='text-purple' />
        )}
        <p class="text-2xl">{program.name}</p>
      </div>
      <div className='flex flex-wrap items-stretch gap-3'>
        {trainings && trainings.map((training) => (
          <TrainingCard key={training.id} training={training} />
        ))}
      </div>
    </div>
  )
}
