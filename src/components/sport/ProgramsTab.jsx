import React from 'react'
import { useSport } from '../../utils/sport/SportContext'
import ProgramResume from './programs/ProgramResume';

export default function ProgramsTab() {
  const { programs } = useSport();

  return (    
    <div className="bg-primary px-4 py-3 shadow-custom rounded-3xl rounded-tl-none relative">
      {programs && programs.map((program) => (
        <ProgramResume key={program.id} program={program} />
      ))}
    </div>
  )
}