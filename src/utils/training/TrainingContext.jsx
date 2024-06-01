import React, { createContext, useContext, useEffect, useState } from "react";
import { addProgram, addTraining, deleteTraining, deleteprogram, getPrograms, getSortedTrainingsByDate, getTrainings, updateProgram, updateTraining } from "./TrainingService";
import moment from 'moment';
import { useUser } from "../user/UserContext";

const TrainingContext = createContext();

export const TrainingProvider = ({ children }) => {
  const { user } = useUser();
  const [trainingLoading, setTrainingLoading] = useState(true);
  const [programs, setPrograms] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState([]);
  const [currentWeek, setCurrentWeek] = useState([]);
  const [isTrainingModalDisplayed, setIsTrainingModalDisplayed] = useState(false);
  const [trainingFormData, setTrainingFormData] = useState(null);
  const [isProgramModalDisplayed, setIsProgramModalDisplayed] = useState(false);
  const [programFormData, setProgramFormData] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      await fetchPrograms();
      await fetchTrainings();
      setTrainingLoading(false);
    }
    
    if (user && user.id) {
      fetchData();
    }
  }, [user])

  useEffect(() => {
    setCurrentMonth(initCurrentMonth());
    setCurrentWeek(initCurrentWeek());
  }, [])

  const fetchPrograms = async () => {
    const fetchedPrograms = await getPrograms(user.id);
    setPrograms(fetchedPrograms);
  }

  const fetchTrainings = async () => {
    const fetchedTrainings = await getTrainings(user.id);
    setTrainings(fetchedTrainings);
  }

  const initCurrentMonth = () => {
    const today = moment().startOf('month');
    const startOfMonth = today.clone().startOf('month');
    const endOfMonth = today.clone().endOf('month');
    return Array.from({ length: endOfMonth.diff(startOfMonth, 'days') + 1 }, (_, i) => startOfMonth.clone().add(i, 'day').format());
  };
  
  const incrementMonth = () => {
    setCurrentMonth(prevMonth =>
      prevMonth.map(day => moment(day).add(1, 'month').toDate())
    );
  };
  
  const decrementMonth = () => {
    setCurrentMonth(prevMonth =>
      prevMonth.map(day => moment(day).subtract(1, 'month').toDate())
    );
  };

  const initCurrentWeek = () => {
    const today = moment().startOf('week');
    const startOfWeek = today.clone().startOf('week');
    const endOfWeek = today.clone().endOf('week');
    return Array.from({ length: endOfWeek.diff(startOfWeek, 'days') + 1 }, (_, i) => startOfWeek.clone().add(i, 'day').format());
  };
  
  const incrementWeek = () => {
    setCurrentWeek(prevWeek =>
      prevWeek.map(day => moment(day).add(1, 'week').toDate())
    );
  };
  
  const decrementWeek = () => {
    setCurrentWeek(prevWeek =>
      prevWeek.map(day => moment(day).subtract(1, 'week').toDate())
    );
  };
  
  const incrementCurrentDate = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDay);
  };

  const decrementCurrentDate = () => {
    const prevDay = new Date(currentDate);
    prevDay.setDate(currentDate.getDate() - 1);
    setCurrentDate(prevDay);
  };

  const openTrainingModal = (date, programId, training) => {
    const trainingFormData = {
      date: date,
      programId: programId,
      training: training
    }
    setTrainingFormData(trainingFormData)
    setIsTrainingModalDisplayed(true);
  }

  const closeTrainingModal = () => {
    setTrainingFormData(null);
    setIsTrainingModalDisplayed(false);
  }

  const openProgramModal = (program) => {
    setProgramFormData(program)
    setIsProgramModalDisplayed(true);
  }

  const closeProgramModal = () => {
    setProgramFormData(null)
    setIsProgramModalDisplayed(false);
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
    const existingProgram = programs.find(program => program.id === newProgram.id);
    if (existingProgram) {
      handleUpdateProgram(newProgram);
      return;
    }
    const newProgramWithUser = {...newProgram, user_id: user.id}

    try {
      const addedProgram = await addProgram(newProgramWithUser);
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
    <TrainingContext.Provider
      value={{
        trainingLoading,
        programs,
        trainings,
        handleUpdateProgram,
        handleAddProgram,
        handleDeleteProgram,
        handleUpdateTraining,
        handleAddTraining,
        handleDeleteTraining,
        getTrainingsByDate,
        currentMonth,
        incrementMonth,
        decrementMonth,
        currentWeek,
        incrementWeek,
        decrementWeek,
        currentDate,
        setCurrentDate,
        incrementCurrentDate,
        decrementCurrentDate,
        trainingFormData,
        isTrainingModalDisplayed,
        openTrainingModal,
        closeTrainingModal,
        programFormData,
        isProgramModalDisplayed,
        openProgramModal,
        closeProgramModal,
      }}
    >
      {children}
    </TrainingContext.Provider>
  )
}

export const useTraining = () => {
  return useContext(TrainingContext);
}