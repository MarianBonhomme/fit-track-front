import React from 'react'
import { getShortDate } from '../../../utils/global/DateService'

export default function TrainingCard({training}) {
  return (
    <div className={`min-w-28 min-h-20 flex flex-col justify-center items-center px-2 rounded-2xl relative ${training.is_validate ? 'bg-green' : 'bg-orange'} text-primary text-center font-medium`}>
      <p className="absolute top-0 left-0 text-xs bg-lightPrimary text-secondary rounded-ee-lg px-2">{getShortDate(new Date(training.date))}</p>
      <p className='text-center text-2xl font-semibold'>
        {training.weight > 0 ? (
          <>
            {training.weight}
            <span className="text-sm font-normal">kg</span>
          </>
        ) : (
          <span>BW</span>
        )}
      </p>
      <p className="text-sm">{training.comment}</p>
    </div>
  )
}