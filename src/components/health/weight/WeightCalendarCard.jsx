import React, { useEffect, useState } from 'react'
import { useHealth } from '../../../utils/health/HealthContext';
import { Icon } from '@iconify/react/dist/iconify.js';
import CardTitle from '../../global/CardTitle';
import moment from 'moment';
import { formatDate, isToday } from '../../../utils/global/DateService';

export default function WeightCalendarCard() {
  const { currentDate, setCurrentDate, weightMeasurements } = useHealth();
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
      const isMeasurement = weightMeasurements.find((measurement) => formatDate(measurement.date) == formatDate(date));
      let cellStyle = `relative p-2 cursor-pointer rounded-lg`;
      if (isCurrentDate(date)) cellStyle += ' bg-lightPrimary';
      let pelletStyle = `p-3 w-4 h-4 flex text-xs items-center justify-center m-auto rounded-full ${isToday(date) && 'bg-blue text-primary font-semibold'}`;
      days.push(
        <div key={i} className={cellStyle} onClick={() => handleDayClick(date)}>
          <div className={pelletStyle}>
            {i}
          </div>
          <div className={`absolute top-0 left-0 ${!isMeasurement && 'opacity-0'}`}>🔥</div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="flex max-sm:flex-col bg-primary px-5 py-3 rounded-3xl max-sm:rounded-ss-none text-center gap-5">
      <div className="sm:w-1/4 flex flex-col justify-evenly">
        <Streaks />
      </div>
      <div className='sm:w-3/4'>
        <div className="w-full flex items-center justify-between mb-5">
          <Icon icon="ic:round-chevron-left" width="25" height="25" className="text-dark cursor-pointer" onClick={() => setCurrentCalendarDate(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() - 1))} />
          <CardTitle text={moment(currentCalendarDate).format("MMMM YYYY")} />
          <Icon icon="ic:round-chevron-right" width="25" height="25" className="text-dark cursor-pointer" onClick={() => setCurrentCalendarDate(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() + 1))} />
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
    </div>
  );
}


function Streaks() {  
  const { weightMeasurements } = useHealth();
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    if (weightMeasurements && weightMeasurements.length > 0) {
      const streak = calculateCurrentStreak()
      setCurrentStreak(streak);
    }
  }, [weightMeasurements])

  const calculateCurrentStreak = () => {
    const today = new Date();
    let streak = 0;
  
    const todayIndex = weightMeasurements.findIndex(measurement => 
      formatDate(measurement.date) === formatDate(today)
    );
  
    if (todayIndex === -1) {
      return streak;
    }
  
    streak++;
  
    for (let i = todayIndex; i > 0; i--) {
      const currentWeightMeasurement = weightMeasurements[i];
      const previousWeightMeasurement = weightMeasurements[i - 1];
  
      const currentDate = moment(currentWeightMeasurement.date);
      const previousDate = moment(previousWeightMeasurement.date);

      if (currentDate.diff(previousDate, 'days') === 1) {
        streak++;
      } else {
        break;
      }
    }
  
    return streak;
  }

  return (
    <div className='space-y-3'>
      <CardTitle text={'Current Streak'} />
      <div className='text-2xl font-bold'>{currentStreak}🔥</div>
    </div>
  )
}