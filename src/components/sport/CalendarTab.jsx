import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import CardTitle from '../global/CardTitle'
import moment from 'moment';
import { getDayOfWeek } from '../../utils/global/DateService';
import DailyTrainings from './calendar/DailyTrainings';
import AddButton from './../global/AddButton';
import { useSport } from '../../utils/sport/SportContext';

export default function CalendarTab() {
  const { currentWeek, incrementWeek, decrementWeek, openTrainingForm } = useSport();

  return (
    <div className='bg-primary p-4 rounded-3xl rounded-ss-none relative'>
      <div className="flex justify-between items-center mb-3">
        <div className='flex justify-center items-center'>
          <Icon icon="ic:round-chevron-left" width="50" height="50" className="text-dark cursor-pointer" onClick={decrementWeek} />
          <Icon icon="ic:round-chevron-right" width="50" height="50" className="text-dark cursor-pointer" onClick={incrementWeek} />
        </div>
        <CardTitle text={'Week'} />
      </div>
      <div className="grid grid-cols-7">
        {currentWeek && currentWeek.length === 7 && currentWeek.map((day, index) => (
          <div key={index} className="border-r last:border-none border-lightPrimary">
            <p className='text-center'>{getDayOfWeek(new Date(day))} {moment(day).format("DD/MM")}</p>
            <AddButton css={'h-20 m-5'} clicked={() => openTrainingForm(new Date(day), null, null)} />
            <DailyTrainings date={new Date(day)} />
          </div>
        ))}
      </div>
    </div>
  )
}