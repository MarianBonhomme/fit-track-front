import axios from "axios";
import { environment } from "../../../environment";

const BASE_URL = environment.API_URL || "http://localhost:3000";

const getColors = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/color`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all colors: ', error);
    throw error
  }
}

const getColorById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/color/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching color with id ${id}: `, error);
    throw error
  }
}

const addColor = async (newColor) => {
  try {
    const response = await axios.post(`${BASE_URL}/color`, newColor, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching color with id ${id}: `, error);
    throw error
  }
}

export { getColors, getColorById, addColor };