import React, { useEffect, useState } from 'react'
import { useSport } from '../../../utils/sport/SportContext'
import TrainingCard from '../programs/TrainingCard';
import TrainingForm from './../global/TrainingForm';

export default function DailyTrainings({date}) {
  const { programs, getTrainingsByDate } = useSport();
  const [dailyTrainings, setDailyTrainings] = useState([])  
  const [isTrainingFormDisplayed, setIsTrainingFormDisplayed] = useState(false);
  const [trainingToUpdate, setTrainingToUpdate] = useState(null);

  useEffect(() => {
    const dateTrainings = getTrainingsByDate(date);
    setDailyTrainings(dateTrainings);
  }, [date])

  const getProgramNameById = (programId) => {
    const program = programs.find(program => program.id === programId);
    return program.name && program.name;
  }

  const openTrainingForm = (training) => {
    training ? setTrainingToUpdate(training) : setTrainingToUpdate(null);
    setIsTrainingFormDisplayed(true);
  }

  return (
    <>
      {dailyTrainings && dailyTrainings.length > 0 && (
        dailyTrainings.map((training) => (
          <div key={training.id} className="border-b last:border-none last:pb-3 border-lightPrimary p-5">
            <p className="text-lg font-light text-center mb-3">{getProgramNameById(training.program_id)}</p>
            <TrainingCard hideDate={true} training={training} edit={() => openTrainingForm(training)}  />
          </div>
        ))
      )}    
      {isTrainingFormDisplayed && (
        <TrainingForm programId={trainingToUpdate.program_id} training={trainingToUpdate} close={() => setIsTrainingFormDisplayed(false)}/>
      )}
    </>
  )
}