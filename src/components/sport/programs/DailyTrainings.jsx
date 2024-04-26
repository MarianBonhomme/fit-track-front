import React, { useEffect, useState } from 'react'
import { useSport } from '../../../utils/sport/SportContext'
import { Icon } from '@iconify/react/dist/iconify.js';

export default function DailyTrainings({date}) {
  const { programs, getTrainingsByDate } = useSport();
  const [dailyTrainings, setDailyTrainings] = useState([])

  useEffect(() => {
    const dateTrainings = getTrainingsByDate(date);
    setDailyTrainings(dateTrainings);
  }, [date])

  const getProgramNameById = (programId) => {
    const program = programs.find(program => program.id === programId);
    return program.name && program.name;
  }

  return (
    dailyTrainings && dailyTrainings.length > 0 && (
      dailyTrainings.map((training) => (
        <div key={training.id} className="border-b last:border-none last:pb-3 border-lightPrimary p-5">
          <p className="text-center mb-3">{getProgramNameById(training.program_id)}</p>
          <div className='flex flex-col items-center gap-3'>
            <div className='flex items-center gap-3'>
              {training.weight > 0 ? (
                <p className='text-2xl font-bold'>
                  {training.weight}
                  <span className="text-sm font-normal">kg</span>
                </p>
              ) : (
                <p className="text-xl font-bold text-nowrap">{training.comment}</p>
              )}
              {training.is_validate ? (
                <Icon icon="icon-park-solid:check-one" width="25" height="25" className="text-green" />
              ) : (
                <Icon icon="material-symbols:cancel-rounded" width="25" height="25" className='text-red' />
              )}
            </div>
            <div className='flex justify-center gap-1 text-sm font-bold bg-lightPrimary rounded-full mx-auto px-2 py-1'>
              <p className={`flex items-center justify-center h-5 w-5 rounded-full ${training.difficulty === 1 ? 'bg-green text-primary' : 'text-green' }`}>1</p>
              <p className={`flex items-center justify-center h-5 w-5 rounded-full ${training.difficulty === 2 ? 'bg-green text-primary' : 'text-green' }`}>2</p>
              <p className={`flex items-center justify-center h-5 w-5 rounded-full ${training.difficulty === 3 ? 'bg-yellow text-primary' : 'text-yellow' }`}>3</p>
              <p className={`flex items-center justify-center h-5 w-5 rounded-full ${training.difficulty === 4 ? 'bg-orange text-primary' : 'text-orange' }`}>4</p>
              <p className={`flex items-center justify-center h-5 w-5 rounded-full ${training.difficulty === 5 ? 'bg-red text-primary' : 'text-red' }`}>5</p>
            </div>
          </div>
        </div>
      ))
    )
  )
}