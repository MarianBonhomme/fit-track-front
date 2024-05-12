import React, { useEffect, useState } from "react";
import { useSport } from "../utils/sport/SportContext";
import ProgramJourney from "../components/sport/programs/ProgramJourney";
import { getProgramState } from "../utils/sport/SportService";
import FlipMove from 'react-flip-move';

export default function SportProgramsTab() {
  const { programs } = useSport();
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
