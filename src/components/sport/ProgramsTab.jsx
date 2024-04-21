import React, { useEffect, useState } from 'react'
import { useSport } from '../../utils/sport/SportContext'
import ProgramJourney from './programs/ProgramJourney';
import CardTitle from './../global/CardTitle';

export default function ProgramsTab() {
  const { programs } = useSport();
  const [sortedPrograms, setSortedPrograms] = useState([])

  useEffect(() => {
    const sortedProgramsByDate = getSortedProgramsByDate();
    setSortedPrograms(sortedProgramsByDate);
  }, [programs])

  const getSortedProgramsByDate = () => {
    const programsCopy = [...programs];

    programsCopy.sort((a, b) => {
      if (a.is_favorite !== b.is_favorite) {
        return a.is_favorite ? -1 : 1;
      }
      if (a.is_finished !== b.is_finished) {
        return a.is_finished ? 1 : -1;
      }
      const dateA = new Date(a.starting_date);
      const dateB = new Date(b.starting_date);
      return dateA - dateB;
    });
  
    return programsCopy;
  } 

  return (    
    <div className='flex gap-5'>
      <div className="w-2/3 bg-primary px-4 py-3 shadow-custom rounded-3xl rounded-tl-none relative">
        {sortedPrograms && sortedPrograms.map((program) => (
          <ProgramJourney key={program.id} program={program} />
        ))}
      </div>
      <div className="w-1/3 bg-primary p-4 shadow-custom rounded-3xl relative">
        <CardTitle text={"Last Trainings"} />
      </div>
    </div>
  )
}