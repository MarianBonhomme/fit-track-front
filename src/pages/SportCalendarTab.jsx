import React from 'react'
import SportCalendarCard from '../components/sport/calendar/SportCalendarCard';
import TrainingsCalendarCard from '../components/sport/calendar/TrainingsCalendarCard';

export default function SportCalendarTab() {
  return (
    <div className="flex flex-col gap-3 sm:gap-5">
      <div className='w-full sm:w-1/2'>
        <SportCalendarCard />
      </div>
      <div className='w-full'>
        <TrainingsCalendarCard />
      </div>
    </div>
  )
}