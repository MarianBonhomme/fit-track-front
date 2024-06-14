import React, { useEffect, useRef } from 'react';
import { useTraining } from '../../../utils/training/TrainingContext';
import { formatDate, formatMonth, getDayOfWeek } from '../../../utils/global/DateService';
import { useDraggable } from 'react-use-draggable-scroll';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function HorizontalScrollMonthlyDays({ onDateClick, verticalScrollRef }) {
  const { currentMonth, currentDate, incrementMonth, decrementMonth } = useTraining();
  const daysContainerRef = useRef(null);
  const { events } = useDraggable(daysContainerRef);

  const handleClick = (date) => {
    onDateClick(date);
    const element = document.getElementById(`vertical-day-${formatDate(date)}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const element = document.getElementById(`horizontal-day-${formatDate(currentDate)}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentDate]);

  return (    
    <div>
      <div className='flex justify-center items-center gap-3 mb-2'>
        <Icon icon="ic:round-chevron-left" width="25" height="25" className="text-gray rounded-full cursor-pointer" onClick={decrementMonth} />
        <p className='text-gray font-bold'>{formatMonth(currentMonth[0])}</p>
        <Icon icon="ic:round-chevron-right" width="25" height="25" className="text-gray rounded-full cursor-pointer" onClick={incrementMonth} />
      </div>
      <div className="flex items-center gap-2 overflow-x-scroll hide-scrollbar px-3" {...events} ref={daysContainerRef}>
        {currentMonth &&
          currentMonth.map((day, index) => {
            const isCurrent = formatDate(day) === formatDate(currentDate);
            const isToday = formatDate(day) === formatDate(new Date());
            return (
              <div
                key={index}
                onClick={() => handleClick(new Date(day))}
                className={`min-w-10 py-3 gap-1 flex flex-col items-center justify-center rounded-full text-xs border-2 ${
                  isToday ? 'border-blue' : 'border-primary'
                } ${isCurrent ? 'bg-blue font-bold text-primary' : 'bg-primary cursor-pointer'}`}
                id={`horizontal-day-${formatDate(day)}`}
              >
                <p className={`font-bold ${isCurrent ? '' : 'text-gray'}`}>{getDayOfWeek(new Date(day)).charAt(0)}</p>
                <p>{new Date(day).getDate()}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}