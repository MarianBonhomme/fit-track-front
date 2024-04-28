import React, { useEffect, useState } from 'react'
import { getShortDate } from '../../../utils/global/DateService'
import { Icon } from '@iconify/react/dist/iconify.js'
import DifficultyScale from './../global/DifficultyScale';
import { useSport } from '../../../utils/sport/SportContext';

export default function TrainingCard({training, isOnCalendar}) {
  const { openTrainingForm, programs } = useSport()
  const [program, setProgram] = useState();

  useEffect(() => {
    const foundProgram = programs.find(program => program.id === training.program_id);
    console.log(foundProgram.pattern)
    setProgram(foundProgram)
  }, [programs, training])

  return (
    <div className="bg-lightPrimary min-w-40 min-h-40 px-2 py-4 flex flex-col items-center justify-between rounded-xl shadow text-secondary relative cursor-pointer" onClick={() => openTrainingForm(new Date(training.date), training.program_id, training)}>
      {isOnCalendar && program && program.pattern ? (        
        <>
          <ProgramPatternIndicator pattern={program.pattern} />
          <p className='text-center'>{program.name}</p>
        </>
      ) : (
        <p className='text-xs px-2 rounded-full bg-blue text-primary font-semibold'>{getShortDate(new Date(training.date))}</p>
      )}
      <div>
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
          <p className="text-sm text-center line-clamp-1">{training.comment}</p>
        )}
      </div>
      <DifficultyScale difficulty={training.difficulty} />
    </div>
  )
}

function ProgramPatternIndicator({pattern}) {
  const getBackgroundByPattern = () => {
    if (pattern === "push") {
      return 'bg-red'
    } else if (pattern === "pull") {
      return 'bg-green'
    } else if (pattern === "legs") {
      return 'bg-purple'
    } else if (pattern === "abs") {
      return 'bg-yellow'
    } else {
      return 'bg-blue'
    }
  };
  const background = getBackgroundByPattern()

  return (
    <div className={`absolute top-0 left-0 w-3 h-full rounded-full ${background}`}></div>
  )
}