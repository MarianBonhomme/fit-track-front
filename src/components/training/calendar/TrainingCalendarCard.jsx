import React, { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';
import CardTitle from '../../global/CardTitle';
import moment from 'moment';
import { formatDate, isToday } from '../../../utils/global/DateService';
import { useTraining } from '../../../utils/training/TrainingContext';
import Card from '../../global/Card';

export default function TrainingCalendarCard() {
  const { currentDate, setCurrentDate, trainings } = useTraining();
  const [currentCalendarDate, setCurrentCalendarDate] = useState(currentDate);

  const daysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; 
  };

  const handleDayClick = (dateClicked) => {
    setCurrentDate(new Date(dateClicked))
  };

  const isCurrentDate = (date) => {
    if (!currentDate) return false;
    return (
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    );
  };

  const renderCalendar = () => {
    const days = [];
    const daysCount = daysInMonth(currentCalendarDate);
    const firstDay = firstDayOfMonth(currentCalendarDate);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    for (let i = 1; i <= daysCount; i++) {
      const date = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), i);
      const isTraining = trainings.find((training) => formatDate(training.date) == formatDate(date));
      let cellStyle = `relative p-2 border-t border-lightPrimary cursor-pointer`;
      if (isCurrentDate(date)) cellStyle += ' bg-lightPrimary';
      let pelletStyle = `p-3 w-4 h-4 flex text-xs text-gray font-bold items-center justify-center m-auto rounded-full ${isToday(date) && 'bg-blue text-primary font-semibold'}`;
      days.push(
        <div key={i} className={cellStyle} onClick={() => handleDayClick(date)}>
          <div className={pelletStyle}>
            {i}
          </div>
          <div className='w-full h-4 text-xs text-center mt-1'>{isTraining && '🏋️'}</div>
        </div>
      );
    }

    return days;
  };

  return (
    <Card css={'flex max-sm:flex-col rounded-ss-none text-center gap-3'}>
      <div className="w-full flex items-center justify-between px-2">
        <CardTitle text={moment(currentCalendarDate).format("MMMM YYYY")} />
        <div className='flex gap-1'>
          <Icon icon="ic:round-chevron-left" width="25" height="25" className="bg-lightPrimary rounded-full text-secondary cursor-pointer" onClick={() => setCurrentCalendarDate(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() - 1))} />
          <Icon icon="ic:round-chevron-right" width="25" height="25" className="bg-lightPrimary rounded-full text-secondary cursor-pointer" onClick={() => setCurrentCalendarDate(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() + 1))} />
        </div>
      </div>
      <div className="w-full grid grid-cols-7 text-xs">
        <div className="day-label">Mon</div>
        <div className="day-label">Tue</div>
        <div className="day-label">Wed</div>
        <div className="day-label">Thu</div>
        <div className="day-label">Fri</div>
        <div className="day-label">Sat</div>
        <div className="day-label">Sun</div>
      </div>
      <div className='w-full grid grid-cols-7'>{renderCalendar()}</div>
    </Card>
  );
}