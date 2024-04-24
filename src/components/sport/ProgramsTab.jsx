import React, { useEffect, useState } from 'react'
import { useSport } from '../../utils/sport/SportContext'
import ProgramJourney from './programs/ProgramJourney';
import CardTitle from './../global/CardTitle';

export default function ProgramsTab() {
  const { programs } = useSport();
  const [sortedPrograms, setSortedPrograms] = useState([])

  useEffect(() => {
    const sortedProgramsByStatus = getSortedProgramsByStatus();
    setSortedPrograms(sortedProgramsByStatus);
  }, [programs])

  const getSortedProgramsByStatus = () => {
    const programsCopy = [...programs];

    programsCopy.sort((a, b) => {
        // Tri par état (favori, en cours, initial, terminé)
        const statusOrder = {
            'ONGOING_FAVORITE': 0,
            'ONGOING_NON_FAVORITE': 1,
            'INITIAL': 2,
            'COMPLETED': 3
        };

        // Fonction pour obtenir le statut du programme
        const getProgramStatus = (program) => {
            if (program.ended_date) {
                return 'COMPLETED';
            } else if (program.starting_date) {
                return program.is_favorite ? 'ONGOING_FAVORITE' : 'ONGOING_NON_FAVORITE';
            } else {
                return 'INITIAL';
            }
        };

        // Comparaison des statuts
        const statusA = getProgramStatus(a);
        const statusB = getProgramStatus(b);

        // Comparaison en fonction de l'ordre défini
        if (statusOrder[statusA] < statusOrder[statusB]) return -1;
        if (statusOrder[statusA] > statusOrder[statusB]) return 1;
        // Si les statuts sont les mêmes, tri par date de début
        const dateA = new Date(a.starting_date);
        const dateB = new Date(b.starting_date);
        return dateA - dateB;
    });
  
    return programsCopy;
};

  return (    
    <div className='flex gap-5'>
      <div className="w-2/3 shadow-custom relative">
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