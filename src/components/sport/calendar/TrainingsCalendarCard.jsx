import React from 'react'
import { useSport } from '../../../utils/sport/SportContext';
import { Icon } from '@iconify/react/dist/iconify.js';
import DailyTrainings from './DailyTrainings';
import AddButton from './../../global/AddButton';
import { getDayOfWeek } from '../../../utils/global/DateService';
import moment from 'moment';

export default function TrainingsCalendarCard() {
  const { currentWeek, incrementWeek, decrementWeek, openTrainingForm, currentDate, incrementCurrentDate, decrementCurrentDate } = useSport();

  return (
    <div className='bg-primary sm:p-5 rounded-3xl relative'>
      <div className="max-sm:hidden flex">
        <Icon icon="ic:round-chevron-left" width="25" height="25" className="text-dark cursor-pointer" onClick={decrementWeek} />
        <div className="w-full grid grid-cols-7 divide-x divide-lightPrimary">
          {currentWeek && currentWeek.length === 7 && currentWeek.map((day, index) => (
            <div key={index} className='space-y-3'>
              <p className='text-center'>{getDayOfWeek(new Date(day))} {moment(day).format("DD/MM")}</p>
              <AddButton css={'flex mx-auto size-8 p-2'} clicked={() => openTrainingForm(new Date(day), null, null)} />
              <DailyTrainings date={new Date(day)} />
            </div>
          ))}
        </div>
        <Icon icon="ic:round-chevron-right" width="25" height="25" className="text-dark cursor-pointer" onClick={incrementWeek} />
      </div>
      <div className="sm:hidden flex">
        {currentDate && 
          <div className='w-full flex flex-col gap-3 p-3'>
            <div className='flex items-center justify-between'>
              <Icon icon="ic:round-chevron-left" width="25" height="25" className="text-dark cursor-pointer" onClick={decrementCurrentDate} />
              <p className='text-center'>{getDayOfWeek(new Date(currentDate))} {moment(currentDate).format("DD/MM")}</p>
              <Icon icon="ic:round-chevron-right" width="25" height="25" className="text-dark cursor-pointer" onClick={incrementCurrentDate} />
            </div>
            <AddButton css={'flex mx-auto size-8 p-2'} clicked={() => openTrainingForm(new Date(currentDate), null, null)} />
            <DailyTrainings date={new Date(currentDate)} />
          </div>
        }
      </div>
    </div>
  )
}