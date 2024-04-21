import React, { useEffect, useState } from 'react'
import { getShortDate } from '../../../utils/global/DateService'

export default function TrainingCard({training, index}) {
  const [cardBackground, setCardBackground] = useState();

  useEffect(() => {
    if (training.is_last && training.is_validate) {
      setCardBackground('bg-blue')
    } else if (training.is_last && !training.is_validate) {
      setCardBackground('bg-red')
    } else if (!training.is_last && training.is_validate) {
      setCardBackground('bg-green')
    } else {
      setCardBackground('bg-yellow')
    }
  }, [])

  return (
    <div className={`min-w-28 flex flex-col p-2 rounded-2xl relative ${cardBackground} text-primary text-center font-medium`}>
      <div className="w-full flex justify-between">
        <p className='w-5 h-5 flex items-center justify-center rounded-full bg-lightPrimary text-secondary text-xs'>{index + 1}</p>
        <p className="text-sm">{getShortDate(new Date(training.date))}</p>
      </div>
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