import axios from "axios";
import { environment } from "../../../environment";

const BASE_URL = environment.API_URL || "http://localhost:3000";

const getAvatars = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/avatar`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all avatars: ', error);
    throw error
  }
}

const getAvatarById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/avatar/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching avatar with id ${id}: `, error);
    throw error
  }
}

const addAvatar = async (newAvatar) => {
  try {
    const response = await axios.post(`${BASE_URL}/avatar`, newAvatar, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching avatar with id ${id}: `, error);
    throw error
  }
}

export { getAvatars, getAvatarById, addAvatar };