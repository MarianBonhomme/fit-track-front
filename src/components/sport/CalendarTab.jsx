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
    <div className='bg-primary p-5 rounded-3xl rounded-ss-none relative'>
      <div className="flex">
        <Icon icon="ic:round-chevron-left" width="30" height="30" className="text-dark cursor-pointer" onClick={decrementWeek} />
        <div className="w-full grid grid-cols-7 divide-x divide-lightPrimary">
          {currentWeek && currentWeek.length === 7 && currentWeek.map((day, index) => (
            <div key={index} className='space-y-3'>
              <p className='text-center'>{getDayOfWeek(new Date(day))} {moment(day).format("DD/MM")}</p>
              <AddButton css={'flex mx-auto size-8 p-2'} clicked={() => openTrainingForm(new Date(day), null, null)} />
              <DailyTrainings date={new Date(day)} />
            </div>
          ))}
        </div>
        <Icon icon="ic:round-chevron-right" width="30" height="30" className="text-dark cursor-pointer" onClick={incrementWeek} />
      </div>
      
    </div>
  )
}