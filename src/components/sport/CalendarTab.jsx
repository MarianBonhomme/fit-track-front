import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import CardTitle from '../global/CardTitle'
import moment from 'moment';
import { getDayOfWeek } from '../../utils/global/DateService';

export default function CalendarTab() {
  const [currentWeek, setCurrentWeek] = useState([])

  useEffect(() => {
    setCurrentWeek(getCurrentWeekDates());
  }, []);

  useEffect(() => {
    console.log(currentWeek)
  }, [currentWeek])

  const getCurrentWeekDates = () => {
    const today = moment().startOf('day');
    const startOfWeek = today.clone().startOf('isoWeek');
    const endOfWeek = today.clone().endOf('isoWeek');
    return Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day').format());
  };

  const incrementWeek = () => {
    setCurrentWeek(prevWeek =>
      prevWeek.map(day => moment(day).add(1, 'week').toDate())
    );
  }

  const decrementWeek = () => {
    setCurrentWeek(prevWeek =>
      prevWeek.map(day => moment(day).subtract(1, 'week').toDate())
    );
  }

  return (
    <div className='bg-primary p-4 shadow-custom rounded-3xl rounded-ss-none relative'>
      <div className="flex justify-between items-center mb-3">
        <div className='flex justify-center items-center'>
          <Icon icon="ic:round-chevron-left" width="50" height="50" className="text-dark cursor-pointer" onClick={decrementWeek} />
          <Icon icon="ic:round-chevron-right" width="50" height="50" className="text-dark cursor-pointer" onClick={incrementWeek} />
        </div>
        <CardTitle text={'Week'} />
      </div>
      <div className="grid grid-cols-7">
      {currentWeek && currentWeek.length === 7 && currentWeek.map((day, index) => (
        <div key={index} className="p-5 rounded-3xl bg-lightPrimary">
          <p className='text-center'>{getDayOfWeek(new Date(day))} {moment(day).format("DD/MM")}</p>
        </div>
      ))}
      </div>
    </div>
  )
}