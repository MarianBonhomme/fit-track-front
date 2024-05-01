import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useState } from 'react'
import { useNutrition } from '../../../utils/nutrition/NutritionContext';
import CardTitle from './../../global/CardTitle';

export default function CalendarCard() {
  const { currentDate, setCurrentDate, getDayByDate } = useNutrition();
  const [currentDay, setCurrentDay] = useState(new Date());

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
    const daysCount = daysInMonth(currentDay);
    const firstDay = firstDayOfMonth(currentDay);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    for (let i = 1; i <= daysCount; i++) {
      const date = new Date(currentDay.getFullYear(), currentDay.getMonth(), i);
      const day = getDayByDate(date);
      let cellStyle = `p-2 cursor-pointer rounded-lg`;
      if (isCurrentDate(date)) cellStyle += ' bg-lightPrimary';
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
        <Icon icon="ic:round-chevron-left" width="25" height="25" className="text-dark cursor-pointer" onClick={() => setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth() - 1))} />
        <CardTitle text={currentDay.toLocaleString('default', { month: 'long', year: 'numeric' })} />
        <Icon icon="ic:round-chevron-right" width="25" height="25" className="text-dark cursor-pointer" onClick={() => setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth() + 1))} />
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