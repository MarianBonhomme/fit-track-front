import React, { createContext, useContext, useEffect, useState } from "react";
import { useProfile } from "../profile/ProfileContext";
import { addProgram, addTraining, deleteTraining, getPrograms, getTrainings, updateProgram, updateTraining } from "./SportService";

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
    console.log(programToUpdate);
    try {
      const updatedProgram = await updateProgram(programToUpdate);
      setPrograms((prevPrograms) =>
        prevPrograms.map((consumption) => (consumption.id === updatedProgram.id ? updatedProgram : consumption))
      );
    } catch (error) {
      console.error(`Error updating program with id ${programToUpdate.id}:`, error);
    }
  };

  const handleAddProgram = async (newProgram) => {
    const newProgramWithProfile = {...newProgram, profile_id: profile.id}
    try {
      const addedProgram = await addProgram(newProgramWithProfile);
      setPrograms((prevPrograms) => [...prevPrograms, addedProgram]);
    } catch (error) {
      console.error('Error adding program:', error);
    }
  };

  const handleUpdateTraining = async (trainingToUpdate) => {
    try {
      const updatedTraining = await updateTraining(trainingToUpdate);
      const updatedTrainingId = updatedTraining.id;
      const updatedPrograms = programs.map(program => ({
        ...program,
        trainings: program.trainings.map(training =>
          training.id === updatedTrainingId ? updatedTraining : training
        )
      }));
      setPrograms(updatedPrograms);
    } catch (error) {
      console.error(`Error updating training with id ${trainingToUpdate.id}:`, error);
    }
  };

  const handleAddTraining = async (newTraining) => {
    try {
      const addedTraining = await addTraining(newTraining);
      const addedProgramId = addedTraining.program_id;
      const updatedPrograms = programs.map(program =>
        program.id === addedProgramId
          ? { ...program, trainings: [...program.trainings, addedTraining] }
          : program
      );
      setPrograms(updatedPrograms);
    } catch (error) {
      console.error('Error adding training:', error);
    }
  };

  const handleDeleteTraining = async (trainingToDelete) => {
    try {
      await deleteTraining(trainingToDelete);
      const deletedTrainingId = trainingToDelete.id;
      const updatedPrograms = programs.map(program => ({
        ...program,
        trainings: program.trainings.filter(training => training.id !== deletedTrainingId)
      }));
      setPrograms(updatedPrograms);
    } catch (error) {
      console.error(`Error deleting training with id ${trainingToDelete.id}:`, error);
    }
  };

  return (
    <SportContext.Provider
      value={{
        sportLoading,
        programs,
        handleUpdateProgram,
        handleAddProgram,
        handleUpdateTraining,
        handleAddTraining,
        handleDeleteTraining,
      }}
    >
      {children}
    </SportContext.Provider>
  )
}

export const useSport = () => {
  return useContext(SportContext);
}