import React, { useEffect, useState } from "react";
import { useTraining } from "../utils/training/TrainingContext";
import ProgramJourney from "../components/training/programs/ProgramJourney";
import { getProgramState } from "../utils/training/TrainingService";
import FlipMove from 'react-flip-move';

export default function TrainingProgramsTab() {
  const { programs } = useTraining();
  const [sortedPrograms, setSortedPrograms] = useState([]);

  useEffect(() => {
    sortProgramsByState();
  }, [programs]);

  const sortProgramsByState = () => {
    const sorted = [];

    programs.forEach((program) => {
      program.state = getProgramState(program);
      sorted.push(program);
    });

    sorted.sort((a, b) => {
      const stateOrder = { ONGOING: 1, INITIAL: 2, COMPLETED: 3 };
      return stateOrder[a.state] - stateOrder[b.state];
    });

    setSortedPrograms(sorted);
  };

  return (
    <FlipMove enterAnimation={{
      from: {},
      to: {},
    }} className="flex flex-col gap-3 sm:gap-5">
      {sortedPrograms.map((program) => (
        <div key={program.id} className="flex flex-col gap-5">
          <ProgramJourney program={program} />
        </div>
      ))}
    </FlipMove>
  );
}
