import React from 'react'
import TrainingCalendarCard from '../components/training/calendar/TrainingCalendarCard';
import TrainingsCalendarCard from '../components/training/calendar/TrainingsCalendarCard';

export default function TrainingCalendarTab() {
  return (
    <div className="flex flex-col gap-3 sm:gap-5">
      <div className='w-full sm:w-1/2'>
        <TrainingCalendarCard />
      </div>
      <div className='w-full'>
        <TrainingsCalendarCard />
      </div>
    </div>
  )
}