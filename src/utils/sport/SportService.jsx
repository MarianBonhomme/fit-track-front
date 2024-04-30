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
    const response = await axios.get(
      `${BASE_URL}/training/program/${programId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all trainings with program id:", error);
    throw error;
  }
};

const updateTraining = async (trainingToUpdate) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/training/${trainingToUpdate.id}`,
      trainingToUpdate
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating training with id ${trainingToUpdate.id}:`,
      error
    );
    throw error;
  }
};

const updateProgram = async (programToUpdate) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/program/${programToUpdate.id}`,
      programToUpdate
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating program with id ${programToUpdate.id}:`,
      error
    );
    throw error;
  }
};

const addTraining = async (newTraining) => {
  try {
    const response = await axios.post(`${BASE_URL}/training`, newTraining);
    return response.data;
  } catch (error) {
    console.error("Error adding new training:", error);
    throw error;
  }
};

const deleteprogram = async (programToDelete) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/program/${programToDelete.id}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting program with id ${programToDelete.id}:`,
      error
    );
    throw error;
  }
};

const deleteTraining = async (trainingToDelete) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/training/${trainingToDelete.id}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting training with id ${trainingToDelete.id}:`,
      error
    );
    throw error;
  }
};

const addProgram = async (newProgram) => {
  try {
    const response = await axios.post(`${BASE_URL}/program`, newProgram);
    return response.data;
  } catch (error) {
    console.error("Error adding new program:", error);
    throw error;
  }
};

const getLastTraining = (trainings) => {
  if (!trainings || trainings.length === 0) {
    return null;
  }

  const sortedTrainings = [...trainings];

  sortedTrainings.forEach((training) => {
    training.date = new Date(training.date);
  });

  sortedTrainings.sort((a, b) => b.date - a.date);

  return sortedTrainings[0];
};

const getFirstTrainingOfProgram = (program) => {
  if (!program || !program.trainings || program.trainings.length === 0) {
    return null;
  }

  const sortedTrainings = [...program.trainings];

  sortedTrainings.forEach((training) => {
    training.date = new Date(training.date);
  });

  sortedTrainings.sort((a, b) => a.date - b.date);

  for (const training of sortedTrainings) {
    return training;
  }
};

const getBestTrainingPerformanceOfProgram = (program) => {
  if (!program || !program.trainings || program.trainings.length === 0) {
    return null;
  }

  // Filtrer les entraînements validés
  const validatedTrainings = program.trainings.filter(training => training.is_validate);

  // Si aucun entraînement validé n'existe
  if (validatedTrainings.length === 0) {
    return "Aucun entraînement validé trouvé";
  }

  // Filtrer les entraînements avec des poids non nuls
  const nonZeroWeights = validatedTrainings.filter(training => training.weight !== 0);

  // Si tous les poids sont à zéro pour les entraînements validés
  if (nonZeroWeights.length === 0) {
    // Récupérer le commentaire du dernier entraînement validé
    const lastValidatedTraining = getLastTraining(validatedTrainings);
    return lastValidatedTraining.comment;
  }

  // Trouver le poids le plus élevé parmi les poids non nuls des entraînements validés
  const maxWeight = Math.max(...nonZeroWeights.map(training => training.weight));

  return `${maxWeight}kg`;
};

const getProgramState = (program) => {
  if (program.is_completed) {
    return 'COMPLETED';
  } else if (program.trainings && program.trainings.length > 0) {
    return 'ONGOING';
  } else {
    return 'INITIAL';
  }
};

const getSortedTrainingsByDate = (program) => {
  if (!program.trainings || program.trainings.length === 0) {
    return { ...program, trainings: [] };
  }
  const sortedTrainings = [...program.trainings].sort((a, b) => new Date(a.date) - new Date(b.date));
  return { ...program, trainings: sortedTrainings };
}

export {
  getPrograms,
  getTrainings,
  getTrainingsByProgramId,
  updateTraining,
  updateProgram,
  addTraining,
  deleteprogram,
  deleteTraining,
  addProgram,
  getLastTraining,
  getFirstTrainingOfProgram,
  getProgramState,
  getSortedTrainingsByDate,
  getBestTrainingPerformanceOfProgram,
};
