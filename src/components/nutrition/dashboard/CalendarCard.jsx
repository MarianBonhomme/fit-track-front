import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useState } from 'react'
import { useNutrition } from '../../../utils/nutrition/NutritionContext';
import CardTitle from './../../global/CardTitle';
import moment from 'moment';
import Card from '../../global/Card';

export default function CalendarCard() {
  const { currentDate, setCurrentDate, findDayByDate } = useNutrition();
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

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const renderCalendar = () => {
    const days = [];
    const daysCount = daysInMonth(currentDay);
    const firstDay = firstDayOfMonth(currentDay);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    for (let i = 1; i <= daysCount; i++) {
      const date = new Date(currentDay.getFullYear(), currentDay.getMonth(), i);
      const day = findDayByDate(date)
      let cellStyle = `relative p-2 cursor-pointer rounded-lg`;
      if (isCurrentDate(date)) cellStyle += ' bg-lightPrimary';
      let pelletStyle = `p-3 w-4 h-4 flex text-xs items-center justify-center m-auto rounded-full ${isToday(date) && 'bg-blue text-primary font-semibold'}`;
      days.push(
        <div key={i} className={cellStyle} onClick={() => handleDayClick(date)}>
          <div className={pelletStyle}>
            {i}
          </div>
          <div className={`absolute top-0 left-0 ${day && day.count_for_stats ? '' : 'opacity-0'} `}>🔥</div>
        </div>
      );
    }

    return days;
  };

  return (
    <Card css={'flex max-sm:flex-col text-center gap-5 max-sm:rounded-tl-none text-center'}>
      <Streaks />
      <div className='sm:w-3/4'>
        <div className="w-full flex items-center justify-between mb-3 px-2">
          <CardTitle text={moment(currentDay).format("MMMM YYYY")} />
          <div className='flex gap-1'>
            <Icon icon="ic:round-chevron-left" width="25" height="25" className="bg-lightPrimary rounded-full text-secondary cursor-pointer" onClick={() => setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth() - 1))} />
            <Icon icon="ic:round-chevron-right" width="25" height="25" className="bg-lightPrimary rounded-full text-secondary cursor-pointer" onClick={() => setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth() + 1))} />
          </div>
        </div>
        <div className="w-full grid grid-cols-7 mb-3 text-xs">
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
    </Card>
  );
}


function Streaks() {  
  const { days } = useNutrition();
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    if (days && days.length > 0) {
      const streak = calculateCurrentStreak()
      setCurrentStreak(streak);
    }
  }, [days])

  const calculateCurrentStreak = () => {
    const today = moment();
    let streak = 0;
  
    const todayIndex = days.findIndex(nutritionDay => moment(nutritionDay.date).isSame(today, 'day'));
  
    if (todayIndex === -1) {
      return streak;
    }
  
    for (let i = todayIndex; i > 0; i--) {
      const currentNutritionDay = days[i];
      const previousNutritionDay = days[i - 1];
  
      const currentDate = moment(currentNutritionDay.date);
      const previousDate = moment(previousNutritionDay.date);
  
      if (currentDate.diff(previousDate, 'days') === 1) {
        if (currentNutritionDay.count_for_stats) {
          streak++;
        } else {
          break;
        }
      } else {
        streak++
        break;
      }
    }
  
    return streak;
  }

  return (
    currentStreak ? (
      <div className="sm:w-1/4 flex flex-col justify-evenly space-y-1">
        <CardTitle text={'Current Streak'} />
        <div className='text-2xl font-bold'>{currentStreak}🔥</div>
      </div>
    ) : null
  )
}