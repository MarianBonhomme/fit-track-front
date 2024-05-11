import axios from "axios";
import { environment } from "../../../environment";

const BASE_URL = environment.API_URL || "http://localhost:3000";

const getProfilesByUserId = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/profile/all/${userId}`)
    return response.data
  } catch (error) {
    console.error(`Error getting profiles with user_id ${userId}:`, error)
    throw error;
  }
}

const getProfileById = async (profileId) => {
  try {
    const response = await axios.get(`${BASE_URL}/profile/${profileId}`)
    return response.data
  } catch (error) {
    console.error(`Error getting profile with id ${profileId}:`, error)
    throw error;
  }
}

const updateProfile = async (profileToUpdate) => {
  try {
    const response = await axios.put(`${BASE_URL}/profile/${profileToUpdate.id}`, profileToUpdate);
    return response.data;
  } catch (error) {
    console.error(`Error updating profile with id ${profileToUpdate.id}:`, error);
    throw error;
  }
};

export { getProfilesByUserId, getProfileById, updateProfile }