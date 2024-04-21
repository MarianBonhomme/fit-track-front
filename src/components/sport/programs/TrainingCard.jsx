import React, { useEffect, useState } from 'react'
import { getShortDate } from '../../../utils/global/DateService'

export default function TrainingCard({training}) {
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
    <div className={`min-w-20 px-4 py-3 rounded-xl relative ${cardBackground} text-primary text-center`}>
      <p className="text-sm">{getShortDate(new Date(training.date))}</p>
      {training.weight > 0 ? (
        <p className='text-center text-xl font-semibold'>
          {training.weight}
          <span className="text-sm font-normal">kg</span>
        </p>
      ) : (
        <p className='text-center text-xl font-semibold'>BW</p>
      )}
      <p className="text-sm">{training.comment}</p>
    </div>
  )
}