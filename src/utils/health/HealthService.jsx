import axios from "axios";
import { environment } from "../../../environment";

const BASE_URL = environment.API_URL || "http://localhost:3000";

const getWeightMeasurements = async (profileId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weightMeasurement/${profileId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all weightMeasurements:", error);
    throw error;
  }
};

const addWeightMeasurement = async (newWeightMeasurement) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/weightMeasurement`,
      newWeightMeasurement
    );
    return response.data;
  } catch (error) {
    console.error("Error adding new WeightMeasurement:", error);
    throw error;
  }
};

const deleteWeightMeasurement = async (weightMeasurementToDelete) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/weightMeasurement/${weightMeasurementToDelete.id}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting weightMeasurement with id ${weightMeasurementToDelete.id}:`,
      error
    );
    throw error;
  }
};

export {
  getWeightMeasurements,
  addWeightMeasurement,
  deleteWeightMeasurement,
};
