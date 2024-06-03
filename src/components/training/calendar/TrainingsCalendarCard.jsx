import React, { useEffect, useState } from 'react'
import { useTraining } from '../../../utils/training/TrainingContext';
import { Icon } from '@iconify/react/dist/iconify.js';
import DailyTrainings from './DailyTrainings';
import AddButton from '../../global/AddButton';
import { formatDate, getDayOfWeek } from '../../../utils/global/DateService';
import moment from 'moment';
import Card from '../../global/Card';

export default function TrainingsCalendarCard() {
  const { currentWeek, incrementWeek, decrementWeek, openTrainingModal, currentDate, incrementCurrentDate, decrementCurrentDate, setCurrentDate } = useTraining();
  const [reorderedWeek, setReorderedWeek] = useState();

  useEffect(() => {
    setReorderedWeek(reorderWeek([...currentWeek]))
  }, [currentWeek])

  const reorderWeek = (week) => {
    const sunday = week.shift(); // Retirer le dimanche (index 0)
    week.push(sunday); // Ajouter le dimanche à la fin
    return week;
  }  

  return (
    <Card>
      <div className="max-sm:hidden flex">
        <Icon icon="ic:round-chevron-left" width="25" height="25" className="text-dark cursor-pointer" onClick={decrementWeek} />
        <div className="w-full grid grid-cols-7 divide-x divide-lightPrimary">
          {currentWeek && currentWeek.length === 7 && currentWeek.map((day, index) => (
            <div key={index} className='space-y-3'>
              <p className='text-center'>{getDayOfWeek(new Date(day))} {moment(day).format("DD/MM")}</p>
              <AddButton css={'flex mx-auto size-8 p-2'} clicked={() => openTrainingModal(new Date(day), null, null)} />
              <DailyTrainings date={new Date(day)} />
            </div>
          ))}
        </div>
        <Icon icon="ic:round-chevron-right" width="25" height="25" className="text-dark cursor-pointer" onClick={incrementWeek} />
      </div>
      <div className="sm:hidden">
        <div className="w-full flex justify-between mb-3">
          {reorderedWeek && reorderedWeek.length === 7 && reorderedWeek.map((day, index) => {
            const isCurrent = formatDate(day) == formatDate(currentDate)
            return (
              <div key={index} onClick={() => setCurrentDate(new Date(day))} className={`w-8 h-8 flex items-center justify-center rounded-full ${isCurrent ? 'bg-blue text-primary font-bold' : 'bg-lightPrimary cursor-pointer'}`}>
                {getDayOfWeek(new Date(day)).charAt(0)}
              </div>
            )
          })}
        </div>
        {currentDate && 
          <div className='w-full flex flex-col gap-3'>
            {/* <div className="w-full flex items-center justify-between mb-3 px-2">
              <CardTitle text={`${getDayOfWeek(new Date(currentDate))} ${moment(currentDate).format("DD/MM")}`} />
              <div className='flex gap-1'>
                <Icon icon="ic:round-chevron-left" width="25" height="25" className="bg-lightPrimary rounded-full text-secondary cursor-pointer" onClick={decrementCurrentDate} />
                <Icon icon="ic:round-chevron-right" width="25" height="25" className="bg-lightPrimary rounded-full text-secondary cursor-pointer" onClick={incrementCurrentDate} />
              </div>
            </div> */}
            <AddButton css={'w-full flex mx-auto size-10 p-2'} clicked={() => openTrainingModal(new Date(currentDate), null, null)} />
            <DailyTrainings date={new Date(currentDate)} />
          </div>
        }
      </div>
    </Card>
  )
}