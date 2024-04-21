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

const getTrainingsByProgramId = async (programId) => {
  try {
    const response = await axios.get(`${BASE_URL}/training/${programId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all trainings with program id:", error);
    throw error;
  }
};

export { getPrograms, getTrainingsByProgramId };
