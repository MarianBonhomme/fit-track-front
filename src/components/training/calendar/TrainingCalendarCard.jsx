import React, { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';
import CardTitle from '../../global/CardTitle';
import moment from 'moment';
import { formatDate, isToday } from '../../../utils/global/DateService';
import { useTraining } from '../../../utils/training/TrainingContext';

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
      let cellStyle = `relative p-2 cursor-pointer rounded-lg`;
      if (isCurrentDate(date)) cellStyle += ' bg-lightPrimary';
      let pelletStyle = `p-3 w-4 h-4 flex text-xs items-center justify-center m-auto rounded-full ${isToday(date) && 'bg-blue text-primary font-semibold'}`;
      days.push(
        <div key={i} className={cellStyle} onClick={() => handleDayClick(date)}>
          <div className={pelletStyle}>
            {i}
          </div>
          <div className={`absolute top-0 left-0 ${!isTraining && 'opacity-0'}`}>🏋️</div>
        </div>
      );
    }

    return days;
  };

  const getTrainingStats = () => {
    const daysCount = daysInMonth(currentCalendarDate);
    const trainingDays = new Set(
      trainings
        .filter(training => {
          const trainingDate = new Date(training.date);
          return (
            trainingDate.getFullYear() === currentCalendarDate.getFullYear() &&
            trainingDate.getMonth() === currentCalendarDate.getMonth()
          );
        })
        .map(training => formatDate(training.date))
    ).size;
    const restDays = daysCount - trainingDays;
    return { trainingDays, restDays };
  };

  const { trainingDays, restDays } = getTrainingStats();

  return (
    <div className="flex max-sm:flex-col bg-primary px-4 py-3 rounded-3xl rounded-ss-none text-center gap-5">
      <div className="sm:w-1/4 flex sm:flex-col justify-evenly">
        <div className='space-y-3'>
          <CardTitle text={'Training Days'} />
          <div className='text-2xl font-bold'>{trainingDays}🏋️</div>
        </div>
        <div className='space-y-3'>
          <CardTitle text={'Rest Days'} />
          <div className='text-2xl font-bold'>{restDays}🧘</div>
        </div>
      </div>
      <div className='sm:w-3/4'>
        <div className="w-full flex items-center justify-between mb-3 px-2">
          <CardTitle text={moment(currentCalendarDate).format("MMMM YYYY")} />
          <div className='flex gap-1'>
            <Icon icon="ic:round-chevron-left" width="25" height="25" className="bg-lightPrimary rounded-full text-secondary cursor-pointer" onClick={() => setCurrentCalendarDate(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() - 1))} />
            <Icon icon="ic:round-chevron-right" width="25" height="25" className="bg-lightPrimary rounded-full text-secondary cursor-pointer" onClick={() => setCurrentCalendarDate(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() + 1))} />
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
    </div>
  );
}