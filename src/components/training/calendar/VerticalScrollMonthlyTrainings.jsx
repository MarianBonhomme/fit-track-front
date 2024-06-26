import React, { useEffect, useRef } from 'react';
import { useTraining } from '../../../utils/training/TrainingContext';
import { formatDate, getDayAndNumber, isToday } from '../../../utils/global/DateService';
import AddButton from '../../global/AddButton';
import TrainingCard from '../programs/TrainingCard';
import FlipMove from 'react-flip-move';

export default function VerticalScrollMonthlyTrainings({ onDateClick }) {
  const { currentMonth, openTrainingModal, getTrainingsByDate, currentDate } = useTraining();
  const verticalScrollRef = useRef(null);

  useEffect(() => {
    const element = document.getElementById(`vertical-day-${formatDate(currentDate)}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentDate]);

  return (
    <div className='px-3' ref={verticalScrollRef}>
      {currentMonth && currentMonth.map((day, index) => {
        const date = new Date(day);
        const dailyTrainings = getTrainingsByDate(date);
        return (
          <div 
            className='py-3 border-b border-primary last:border-none grid gap-3 day-element' 
            key={index} 
            id={`vertical-day-${formatDate(day)}`} 
            data-date={day}
            onClick={() => onDateClick(date)}
          >
            <div className='flex justify-between items-center'>
              <p className={`font-bold cursor-pointer ${isToday(date) && 'text-blue'}`}>
                {getDayAndNumber(date)}
              </p>
              <AddButton css={'size-8 p-2 bg-primary'} clicked={() => openTrainingModal(date, null, null)} />
            </div>           
            {dailyTrainings && dailyTrainings.length > 0 && (
              <FlipMove>
                <div className='flex flex-wrap gap-3'>
                  {dailyTrainings.map((training) => (
                    <div key={training.id} className='flex'>
                      <TrainingCard isOnCalendar={true} training={training} />
                    </div>
                  ))}
                </div>
              </FlipMove> 
            )}
          </div>
        );
      })}
    </div>
  );
}