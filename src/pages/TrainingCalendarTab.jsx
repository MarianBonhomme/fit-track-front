import React, { useRef } from 'react';
import HorizontalScrollMonthlyDays from './../components/training/calendar/HorizontalScrollMonthlyDays';
import VerticalScrollMonthlyTrainings from './../components/training/calendar/VerticalScrollMonthlyTrainings';
import { useTraining } from '../utils/training/TrainingContext';
import { formatDate } from '../utils/global/DateService';

export default function TrainingCalendarTab() {
  const verticalScrollRef = useRef(null);
  const horizontalScrollRef = useRef(null);
  const { currentDate, setCurrentDate } = useTraining();

  const handleDateClick = (date) => {
    setCurrentDate(date);
    const verticalElement = document.getElementById(`vertical-day-${formatDate(date)}`);
    if (verticalElement) {
      verticalElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const horizontalElement = document.getElementById(`horizontal-day-${formatDate(date)}`);
    if (horizontalElement) {
      horizontalElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="flex flex-col gap-3 h-screen overflow-hidden pb-[60px]">
      <p className='text-xl font-medium p-3 pb-0'>Training</p>
      <div className="flex-none">
        <HorizontalScrollMonthlyDays onDateClick={handleDateClick} verticalScrollRef={verticalScrollRef} />
      </div>
      <div className="flex-grow overflow-y-scroll hide-scrollbar" ref={verticalScrollRef}>
        <VerticalScrollMonthlyTrainings onDateClick={handleDateClick} />
      </div>
    </div>
  );
}