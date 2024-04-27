import React, { createContext, useContext, useEffect, useState } from "react";
import { useProfile } from "../profile/ProfileContext";
import { addProgram, addTraining, deleteTraining, deleteprogram, getPrograms, getSortedTrainingsByDate, getTrainings, updateProgram, updateTraining } from "./SportService";
import moment from 'moment';

const SportContext = createContext();

export const SportProvider = ({ children }) => {
  const { profile } = useProfile();
  const [sportLoading, setSportLoading] = useState(true);
  const [programs, setPrograms] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [currentWeek, setCurrentWeek] = useState([]);
  const [isTrainingFormDisplayed, setIsTrainingFormDisplayed] = useState(false);
  const [trainingFormData, setTrainingFormData] = useState(null);
  const [isProgramFormDisplayed, setIsProgramFormDisplayed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetchPrograms();
      await fetchTrainings();
      setSportLoading(false);
    }
    
    fetchData();
  }, [profile])

  useEffect(() => {
    setCurrentWeek(initCurrentWeek());
  }, [])

  const fetchPrograms = async () => {
    const fetchedPrograms = await getPrograms(profile.id);
    setPrograms(fetchedPrograms);
  }

  const fetchTrainings = async () => {
    const fetchedTrainings = await getTrainings(profile.id);
    setTrainings(fetchedTrainings);
  }

  const initCurrentWeek = () => {
    const today = moment().startOf('day');
    const startOfWeek = today.clone().startOf('isoWeek');
    const endOfWeek = today.clone().endOf('isoWeek');
    return Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day').format());
  }

  const incrementWeek = () => {
    setCurrentWeek(prevWeek =>
      prevWeek.map(day => moment(day).add(1, 'week').toDate())
    );
  }

  const decrementWeek = () => {
    setCurrentWeek(prevWeek =>
      prevWeek.map(day => moment(day).subtract(1, 'week').toDate())
    );
  }

  const openTrainingForm = (date, programId, training) => {
    const trainingFormData = {
      date: date,
      programId: programId,
      training: training
    }
    setTrainingFormData(trainingFormData)
    setIsTrainingFormDisplayed(true);
  }

  const closeTrainingForm = () => {
    setTrainingFormData(null);
    setIsTrainingFormDisplayed(false);
  }

  const openProgramForm = () => {
    // FormData pour update
    setIsProgramFormDisplayed(true);
  }

  const closeProgramForm = () => {
    // setProgramFormData(null)
    setIsProgramFormDisplayed(false);
  }

  const getTrainingsByDate = (date) => {
    const dateTrainings = trainings.filter(training => {
      const trainingDate = new Date(training.date);
      const trainingDay = trainingDate.getDate();
      const trainingMonth = trainingDate.getMonth();
      const trainingYear = trainingDate.getFullYear();
  
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      return trainingDay === day && trainingMonth === month && trainingYear === year;
    });
    return dateTrainings;
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
      
      setTrainings(prevTrainings => prevTrainings.map(training =>
        training.id === updatedTraining.id ? updatedTraining : training
      ));
      handleUpdateProgram(updatedProgram);      
    } catch (error) {
      console.error(`Error updating training with id ${trainingToUpdate.id}:`, error);
    }
  };

  const handleAddTraining = async (newTraining) => {
    try {
      const existingTraining = trainings.find(training => training.id === newTraining.id);
      if (existingTraining) {
        handleUpdateTraining(newTraining);
        return;
      }

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

      setTrainings(prevTrainings => prevTrainings.concat(addedTraining));  
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
      setTrainings(prevTrainings => prevTrainings.filter(training => training.id !== deletedTrainingId));
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
        getTrainingsByDate,
        currentWeek,
        incrementWeek,
        decrementWeek,
        trainingFormData,
        isTrainingFormDisplayed,
        openTrainingForm,
        closeTrainingForm,
        isProgramFormDisplayed,
        openProgramForm,
        closeProgramForm,
      }}
    >
      {children}
    </SportContext.Provider>
  )
}

export const useSport = () => {
  return useContext(SportContext);
}