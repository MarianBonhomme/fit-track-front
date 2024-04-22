import React, { createContext, useContext, useEffect, useState } from "react";
import { useProfile } from "../profile/ProfileContext";
import { getPrograms, getTrainings, updateProgram } from "./SportService";

const SportContext = createContext();

export const SportProvider = ({ children }) => {
  const { profile } = useProfile();
  const [sportLoading, setSportLoading] = useState(true);
  const [programs, setPrograms] = useState([]);
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchPrograms();
      await fetchTrainings();
      setSportLoading(false);
    }
    
    fetchData();
  }, [profile])

  const fetchPrograms = async () => {
    const fetchedPrograms = await getPrograms(profile.id);
    setPrograms(fetchedPrograms);
  }

  const fetchTrainings = async () => {
    const fetchedTrainings = await getTrainings(profile.id);
    setTrainings(fetchedTrainings);
  }

  const handleUpdateProgram = async (programToUpdate) => {
    try {
      const updatedProgram = await updateProgram(programToUpdate);
      setPrograms((prevPrograms) =>
        prevPrograms.map((consumption) => (consumption.id === updatedProgram.id ? updatedProgram : consumption))
      );
    } catch (error) {
      console.error(`Error updating program with id ${programToUpdate.id}:`, error);
    }
  };

  return (
    <SportContext.Provider
      value={{
        sportLoading,
        programs,
        trainings,
        handleUpdateProgram,
      }}
    >
      {children}
    </SportContext.Provider>
  )
}

export const useSport = () => {
  return useContext(SportContext);
}