import React, { createContext, useContext, useEffect, useState } from "react";
import { useProfile } from "../profile/ProfileContext";
import { getPrograms, updateProgram } from "./SportService";

const SportContext = createContext();

export const SportProvider = ({ children }) => {
  const { profile } = useProfile();
  const [sportLoading, setSportLoading] = useState(true);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchPrograms();
      setSportLoading(false);
    }
    
    fetchData();
  }, [profile])

  const fetchPrograms = async () => {
    const fetchedPrograms = await getPrograms(profile.id);
    setPrograms(fetchedPrograms);
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
        handleUpdateProgram
      }}
    >
      {children}
    </SportContext.Provider>
  )
}

export const useSport = () => {
  return useContext(SportContext);
}