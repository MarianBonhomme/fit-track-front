import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useState } from 'react'
import { useNutrition } from '../../../utils/nutrition/NutritionContext';

export default function CalendarCard() {
  const { currentDay, setCurrentDay, getDayByDate } = useNutrition();
  const [currentDate, setCurrentDate] = useState(new Date());

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
    setCurrentDay(new Date(dateClicked))
  };

  const isCurrentDay = (date) => {
    if (!currentDay) return false;
    return (
      date.getDate() === currentDay.getDate() &&
      date.getMonth() === currentDay.getMonth() &&
      date.getFullYear() === currentDay.getFullYear()
    );
  };

  const getPelletStyle = (day) => {
    if (!day) {
      return ''
    } else if (day.is_validate) {
      return 'text-primary font-semibold bg-blue'
    } else {
      return 'text-primary font-semibold bg-red'
    }
  } 

  const renderCalendar = () => {
    const days = [];
    const daysCount = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    for (let i = 1; i <= daysCount; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const day = getDayByDate(date);
      let cellStyle = `p-2 cursor-pointer rounded-lg`;
      if (isCurrentDay(date)) cellStyle += ' bg-lightPrimary';
      let pelletStyle = `p-4 w-5 h-5 flex items-center justify-center m-auto rounded-full ${getPelletStyle(day)}`;
      days.push(
        <div key={i} className={cellStyle} onClick={() => handleDayClick(date)}>
          <div className={pelletStyle}>
            {i}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="flex flex-col items-center bg-primary px-5 py-3 rounded-3xl text-center">
      <div className="w-full flex items-center justify-between mb-5">
        <Icon icon="ic:round-chevron-left" width="30" height="30" className="text-dark cursor-pointer" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))} />
        <p className='text-xl'>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
        <Icon icon="ic:round-chevron-right" width="30" height="30" className="text-dark cursor-pointer" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))} />
      </div>
      <div className="w-full grid grid-cols-7 mb-3">
        <div className="day-label">Mon</div>
        <div className="day-label">Tue</div>
        <div className="day-label">Wed</div>
        <div className="day-label">Thu</div>
        <div className="day-label">Fri</div>
        <div className="day-label">Sat</div>
        <div className="day-label">Sun</div>
      </div>
      <div className='w-full grid grid-cols-7'>{renderCalendar()}</div>
    </div>
  );
}