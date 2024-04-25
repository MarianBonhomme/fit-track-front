import React, { createContext, useContext, useEffect, useState } from "react";
import { useProfile } from "../profile/ProfileContext";
import { addProgram, addTraining, deleteTraining, deleteprogram, getPrograms, getSortedTrainingsByDate, getTrainings, updateProgram, updateTraining } from "./SportService";

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
      const sortedUpdatedProgram = getSortedTrainingsByDate(updatedProgram);
      setPrograms((prevPrograms) =>
        prevPrograms.map((consumption) => (consumption.id === sortedUpdatedProgram.id ? sortedUpdatedProgram : consumption))
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
  
  const handleDeleteProgram = async (programToDelete) => {
    try {
      await deleteprogram(programToDelete);
      setPrograms((prevPrograms) => prevPrograms.filter((program) => program.id !== programToDelete.id));
    } catch (error) {
      console.error(`Error deleting program with id ${programToDelete.id}:`, error);
    }
  };

  const handleUpdateTraining = async (trainingToUpdate) => {
    try {
      const updatedTraining = await updateTraining(trainingToUpdate);
      const programToUpdate = programs.find(program => program.id === updatedTraining.program_id);
      if (!programToUpdate) {
        console.error(`Program with id ${updatedTraining.program_id} not found.`);
        return;
      }

      const updatedTrainings = programToUpdate.trainings.map(training =>
        training.id === updatedTraining.id ? updatedTraining : training
      );
  
      const updatedProgram = {
        ...programToUpdate,
        trainings: updatedTrainings
      };
      handleUpdateProgram(updatedProgram);      
    } catch (error) {
      console.error(`Error updating training with id ${trainingToUpdate.id}:`, error);
    }
  };

  const handleAddTraining = async (newTraining) => {
    try {
      const addedTraining = await addTraining(newTraining);
      const programToUpdate = programs.find(program => program.id === addedTraining.program_id);
      if (!programToUpdate) {
        console.error(`Program with id ${addedTraining.program_id} not found.`);
        return;
      }
  
      const updatedTrainings = programToUpdate.trainings ? [...programToUpdate.trainings, addedTraining] : [addedTraining];
      const updatedProgram = {
        ...programToUpdate,
        trainings: updatedTrainings
      };
  
      handleUpdateProgram(updatedProgram);
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
        handleDeleteProgram,
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