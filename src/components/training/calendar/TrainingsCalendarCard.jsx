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

  const formatWeek = (startDate, endDate) => {
    return `${moment(startDate).format("DD")} - ${moment(endDate).format("DD MMM YYYY")}`;
  };

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
        <div className='text-center mb-3 text-gray font-bold'>
          
            {formatWeek(currentWeek[0], currentWeek[currentWeek.length - 1])}
        </div>
        <div className="w-full flex justify-between mb-3">
          {reorderedWeek && reorderedWeek.length === 7 && reorderedWeek.map((day, index) => {
            const isCurrent = formatDate(day) == formatDate(currentDate)
            return (
              <div key={index} onClick={() => setCurrentDate(new Date(day))} className={`w-10 py-3 gap-1 flex flex-col items-center justify-center rounded-2xl text-xs ${isCurrent ? 'bg-blue text-primary font-bold' : 'bg-lightPrimary cursor-pointer'}`}>
                <p className={`font-bold ${isCurrent ? '' : 'text-gray'}`}>{getDayOfWeek(new Date(day)).charAt(0)}</p>
                <p>{new Date(day).getDate()}</p>
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