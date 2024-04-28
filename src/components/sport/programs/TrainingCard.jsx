import React from 'react'
import { getShortDate } from '../../../utils/global/DateService'
import { Icon } from '@iconify/react/dist/iconify.js'
import DifficultyScale from './../global/DifficultyScale';
import { useSport } from '../../../utils/sport/SportContext';

export default function TrainingCard({training, hideDate}) {
  const { openTrainingForm } = useSport()

  return (
    <div className="bg-lightPrimary min-w-40 min-h-40 p-2 flex flex-col items-center justify-evenly rounded-xl shadow text-secondary relative cursor-pointer" onClick={() => openTrainingForm(new Date(training.date), training.program_id, training)}>
      {!hideDate && <p className='text-xs px-2 rounded-full bg-blue text-primary font-semibold'>{getShortDate(new Date(training.date))}</p>}
      <div className='flex flex-col items-center'>
        {training.weight > 0 ? (
          <p className='text-3xl font-bold'>
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
      <DifficultyScale difficulty={training.difficulty} />
    </div>
  )
}