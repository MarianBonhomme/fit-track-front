import React, { useEffect, useState } from 'react'
import { useSport } from '../../../utils/sport/SportContext'
import TrainingCard from '../programs/TrainingCard';

export default function DailyTrainings({date}) {
  const { programs, getTrainingsByDate } = useSport();
  const [dailyTrainings, setDailyTrainings] = useState([])  

  useEffect(() => {
    const dateTrainings = getTrainingsByDate(date);
    setDailyTrainings(dateTrainings);
  }, [date, programs])

  const getProgramNameById = (programId) => {
    const program = programs.find(program => program.id === programId);
    return program && program.name && program.name;
  }

  return (
    dailyTrainings && dailyTrainings.length > 0 && (
      dailyTrainings.map((training) => (
        <div key={training.id} className="border-b last:border-none last:pb-3 border-lightPrimary p-5">
          <p className="text-lg font-light text-center mb-3">{getProgramNameById(training.program_id)}</p>
          <TrainingCard hideDate={true} training={training} />
        </div>
      ))
    )
  )
}