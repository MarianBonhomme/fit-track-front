import axios from "axios";

const BASE_URL = "http://localhost:3000";

const getPrograms = async (profileId) => {
  try {
    const response = await axios.get(`${BASE_URL}/program/${profileId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all programs:", error);
    throw error;
  }
};

const getTrainings = async (profileId) => {
  try {
    const response = await axios.get(`${BASE_URL}/training/${profileId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all trainings with profile id:", error);
    throw error;
  }
};

const getTrainingsByProgramId = async (programId) => {
  try {
    const response = await axios.get(`${BASE_URL}/training/program/${programId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all trainings with program id:", error);
    throw error;
  }
};

const updateTraining = async (trainingToUpdate) => {
  try {
    const response = await axios.put(`${BASE_URL}/training/${trainingToUpdate.id}`, trainingToUpdate);
    return response.data;
  } catch (error) {
    console.error(`Error updating training with id ${trainingToUpdate.id}:`, error);
    throw error;
  }
};

const updateProgram = async (programToUpdate) => {
  try {
    const response = await axios.put(`${BASE_URL}/program/${programToUpdate.id}`, programToUpdate);
    return response.data;
  } catch (error) {
    console.error(`Error updating program with id ${programToUpdate.id}:`, error);
    throw error;
  }
};

const addTraining = async (newTraining) => {
  try {
    const response = await axios.post(`${BASE_URL}/training`, newTraining)
    return response.data;
  } catch (error) {
    console.error("Error adding new training:", error);
    throw error;
  }
};

const deleteTraining = async (trainingToDelete) => {
  try {
    const response = await axios.delete(`${BASE_URL}/training/${trainingToDelete.id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting training with id ${trainingToDelete.id}:`, error);
    throw error;
  }
};

const addProgram = async (newProgram) => {
  try {
    const response = await axios.post(`${BASE_URL}/program`, newProgram)
    return response.data;
  } catch (error) {
    console.error("Error adding new program:", error);
    throw error;
  }
};

const getLastTrainingWeightOrComment = (program) => {
  if (!program || !program.trainings || program.trainings.length === 0) {
    return null;
  }

  const sortedTrainings = [...program.trainings];

  sortedTrainings.forEach(training => {
    training.date = new Date(training.date);
  });

  sortedTrainings.sort((a, b) => b.date - a.date);

  for (const training of sortedTrainings) {
    if (training.weight !== 0) {
      return `${training.weight} kg`;
    } else {
      return training.comment;
    }
  }
}

const getFirstTrainingWeightOrComment = (program) => {
  if (!program || !program.trainings || program.trainings.length === 0) {
    return null;
  }

  const sortedTrainings = [...program.trainings];

  sortedTrainings.forEach(training => {
    training.date = new Date(training.date);
  });

  sortedTrainings.sort((a, b) => a.date - b.date);

  for (const training of sortedTrainings) {
    if (training.weight !== 0) {
      return `${training.weight} kg`;
    } else {
      return training.comment;
    }
  }
}

export { getPrograms, getTrainings, getTrainingsByProgramId, updateTraining, updateProgram, addTraining, deleteTraining, addProgram, getLastTrainingWeightOrComment, getFirstTrainingWeightOrComment };
