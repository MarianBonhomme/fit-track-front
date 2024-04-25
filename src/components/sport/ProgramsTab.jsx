import React, { useEffect, useState } from "react";
import { useSport } from "../../utils/sport/SportContext";
import ProgramJourney from "./programs/ProgramJourney";
import CardTitle from "./../global/CardTitle";
import { getProgramState } from "../../utils/sport/SportService";

export default function ProgramsTab() {
  const { programs } = useSport();
  const [completedPrograms, setCompletedPrograms] = useState([]);
  const [ongoingPrograms, setOngoingPrograms] = useState([]);
  const [initialPrograms, setInitialPrograms] = useState([]);

  useEffect(() => {
    sortProgramsByStatus();
  }, [programs]);

  const sortProgramsByStatus = () => {
    const ongoing = [];
    const completed = [];
    const initial = [];

    programs.forEach((program) => {
      program.status = getProgramState(program);
      switch (program.status) {
        case "ONGOING":
          ongoing.push(program);
          break;
        case "COMPLETED":
          completed.push(program);
          break;
        case "INITIAL":
          initial.push(program);
          break;
        default:
          break;
      }
    });

    setOngoingPrograms(ongoing);
    setCompletedPrograms(completed);
    setInitialPrograms(initial);
  };

  return (
    <div className="flex gap-5">
      <div className="w-2/3 shadow-custom relative flex flex-col gap-5">
        {ongoingPrograms.length > 0 && (
          <div className="bg-purple rounded-3xl rounded-ss-none p-5">
            <CardTitle text={"ONGOING"} css="text-primary mb-3" />
            {ongoingPrograms.map((program) => (
              <ProgramJourney key={program.id} program={program} />
            ))}
          </div>
        )}
        {initialPrograms.length > 0 && (
          <div className="bg-blue rounded-3xl rounded-ss-none p-5">
            <CardTitle text={"INITIAL"} css="text-primary mb-3" />
            {initialPrograms.map((program) => (
              <ProgramJourney key={program.id} program={program} />
            ))}
          </div>
        )}
        {completedPrograms.length > 0 && (
          <div className="bg-green rounded-3xl rounded-ss-none p-5">
            <CardTitle text={"COMPLETED"} css="text-primary mb-3" />
            {completedPrograms.map((program) => (
              <ProgramJourney key={program.id} program={program} />
            ))}
          </div>
        )}
      </div>
      <div className="w-1/3 bg-primary p-4 shadow-custom rounded-3xl relative">
        <CardTitle text={"Last Trainings"} />
      </div>
    </div>
  );
}
