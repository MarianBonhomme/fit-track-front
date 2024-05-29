import React, { useEffect, useState } from 'react'
import { useTraining } from '../../../utils/training/TrainingContext'
import TrainingCard from '../programs/TrainingCard';
import FlipMove from 'react-flip-move';

export default function DailyTrainings({date}) {
  const { programs, getTrainingsByDate } = useTraining();
  const [dailyTrainings, setDailyTrainings] = useState([])  

  useEffect(() => {
    const dateTrainings = getTrainingsByDate(date);
    setDailyTrainings(dateTrainings);
  }, [date, programs])

  return (
    dailyTrainings && dailyTrainings.length > 0 && (
      <FlipMove>
        <div className='flex flex-wrap gap-3 justify-center'>
          {dailyTrainings.map((training) => (
            <div key={training.id} className='flex'>
              <TrainingCard isOnCalendar={true} training={training} />
            </div>
          ))}
        </div>
      </FlipMove>
    )
  )
}