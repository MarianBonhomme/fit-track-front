import React, { useEffect, useState } from 'react'
import { useSport } from '../../../utils/sport/SportContext'
import TrainingCard from '../programs/TrainingCard';
import FlipMove from 'react-flip-move';

export default function DailyTrainings({date}) {
  const { programs, getTrainingsByDate } = useSport();
  const [dailyTrainings, setDailyTrainings] = useState([])  

  useEffect(() => {
    const dateTrainings = getTrainingsByDate(date);
    setDailyTrainings(dateTrainings);
  }, [date, programs])

  return (
    dailyTrainings && dailyTrainings.length > 0 && (
      <FlipMove>
        {dailyTrainings.map((training) => (
          <div key={training.id} className='px-3 pb-3 last:pb-0'>
            <TrainingCard isOnCalendar={true} training={training} />
          </div>
        ))}
      </FlipMove>
    )
  )
}