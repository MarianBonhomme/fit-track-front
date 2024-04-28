import React from 'react'
import { getShortDate } from '../../../utils/global/DateService'
import { Icon } from '@iconify/react/dist/iconify.js'
import DifficultyScale from './../global/DifficultyScale';
import { useSport } from '../../../utils/sport/SportContext';

export default function TrainingCard({training, isOnCalendar}) {
  const { openTrainingForm, programs } = useSport()
  
  const getProgramNameById = (programId) => {
    const program = programs.find(program => program.id === programId);
    return program && program.name && program.name;
  }

  return (
    <div className="bg-lightPrimary min-w-40 min-h-40 px-2 py-4 flex flex-col items-center justify-between rounded-xl shadow text-secondary relative cursor-pointer" onClick={() => openTrainingForm(new Date(training.date), training.program_id, training)}>
      {isOnCalendar ? (
        <p>{getProgramNameById(training.program_id)}</p>
      ) : (
        <p className='text-xs px-2 rounded-full bg-blue text-primary font-semibold'>{getShortDate(new Date(training.date))}</p>
      )}
      <div className='flex flex-col items-center'>
        <div className='flex items-center justify-center gap-2'>
          {training.weight > 0 ? (
            <p className='text-3xl font-bold'>
              {training.weight}
              <span className="text-sm font-normal">kg</span>
            </p>
          ) : (
            <p className="text-xl font-bold text-nowrap">BW</p>
          )}
          {training.is_validate ? (
            <Icon icon="icon-park-solid:check-one" width="25" height="25" className="text-green" />
          ) : (
            <Icon icon="material-symbols:cancel-rounded" width="25" height="25" className='text-red' />
          )}
        </div>
        {training.comment && (
          <p className="text-sm text-nowrap">{training.comment}</p>
        )}
      </div>
      <DifficultyScale difficulty={training.difficulty} />
    </div>
  )
}