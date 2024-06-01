import React, { useEffect, useState } from 'react'
import { getShortDate } from '../../../utils/global/DateService'
import { Icon } from '@iconify/react/dist/iconify.js'
import DifficultyScale from './../global/DifficultyScale';
import { useTraining } from '../../../utils/training/TrainingContext';
import PatternIndicator from '../global/PatternIndicator';

export default function TrainingCard({training, isOnCalendar}) {
  const { openTrainingForm, programs } = useTraining()
  const [program, setProgram] = useState();

  useEffect(() => {
    const foundProgram = programs.find(program => program.id === training.program_id);
    setProgram(foundProgram)
  }, [programs, training])

  return (
    <div className={`max-w-60 bg-lightPrimary ${isOnCalendar ? 'min-w-40' : 'min-w-32'} min-h-32 p-2 flex flex-col items-center justify-between rounded-xl text-secondary relative cursor-pointer`} onClick={() => openTrainingForm(new Date(training.date), training.program_id, training)}>
      {isOnCalendar && program && program.pattern ? (        
        <>
          <PatternIndicator pattern={program.pattern} />
          <p className='text-xs text-center'>{program.name}</p>
        </>
      ) : (
        <p className='text-xxs/3 px-1 rounded-full bg-blue text-primary font-semibold'>{getShortDate(new Date(training.date))}</p>
      )}
      <div>
        <div className='flex items-center justify-center gap-2'>
          {training.weight > 0 ? (
            <p className='text-lg font-bold'>
              {training.weight}
              <span className="text-xs font-normal">kg</span>
            </p>
          ) : (
            <p className="text-lg font-bold text-nowrap">BW</p>
          )}
          {training.is_validated ? (
            <Icon icon="icon-park-solid:check-one" className="size-[15px] text-green" />
          ) : (
            <Icon icon="material-symbols:cancel-rounded" className='size-[15px] text-red' />
          )}
        </div>
        {training.comment && (
          <p className="text-xs text-center line-clamp-1">{training.comment}</p>
        )}
      </div>
      <DifficultyScale difficulty={training.difficulty} />
    </div>
  )
}