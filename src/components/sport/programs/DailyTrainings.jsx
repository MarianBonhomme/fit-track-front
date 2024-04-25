import React from 'react'
import { useSport } from '../../../utils/sport/SportContext'
import CardTitle from '../../global/CardTitle';
import { getFullDate } from '../../../utils/global/DateService';
import { Icon } from '@iconify/react/dist/iconify.js';
import AddButton from '../../nutrition/global/AddButton';

export default function DailyTrainings() {
  const { programs, currentDay, setCurrentDay, dailyTrainings, incrementCurrentDay, decrementCurrentDay } = useSport();

  const getProgramById = (programId) => {
    const program = programs.find(program => program.id === programId);
    return program;
  }

  return (
    <div className='w-1/3 bg-primary p-4 shadow-custom rounded-3xl rounded-ss-none relative'>
      <div className="flex justify-between items-center mb-3">
        <div className='flex justify-center items-center'>
          <Icon icon="ic:round-chevron-left" width="50" height="50" className="text-dark cursor-pointer" onClick={decrementCurrentDay} />
          <Icon icon="ic:round-chevron-right" width="50" height="50" className="text-dark cursor-pointer" onClick={incrementCurrentDay} />
        </div>
        <CardTitle text={currentDay && getFullDate(currentDay)} />
        <p className={`bg-red text-primary font-bold px-3 py-2 rounded-full ${currentDay && getFullDate(currentDay) === 'Today' ? 'opacity-0' : 'cursor-pointer'}`} onClick={() => setCurrentDay(new Date())}>Today</p>
      </div>
      {dailyTrainings && dailyTrainings.length > 0 ? (
        dailyTrainings.map((training) => (
          <div key={training.id} className="flex items-center justify-between border-t border-lightPrimary p-5">
            <p className="text-xl">{getProgramById(training.program_id).name}</p>
            <p className="text-xl">{training.weight}</p>
          </div>
        ))
      ) : (
        <AddButton clicked={() => openFoodConsumptionForm()} css='w-full mt-10 h-20 mx-auto'/>
      )}
    </div>
  )
}