import axios from "axios";
import { environment } from "../../../environment";

const BASE_URL = environment.API_URL || "http://localhost:3000";

const getDays = async (user) => {
  try {
    const response = await axios.get(`${BASE_URL}/day/${user.id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all days:", error);
    throw error;
  }
}

const addDay = async (newDay) => {
  try {
    const response = await axios.post(`${BASE_URL}/day`, newDay);
    return response.data;
  } catch (error) {
    console.error("Error adding new day:", error);
    throw error;
  }
}

const updateDay = async (dayToUpdate) => {
  try {
    const response = await axios.put(`${BASE_URL}/day/${dayToUpdate.id}`, dayToUpdate);
    return response.data;
  } catch (error) {
    console.error(`Error updating day with id ${dayToUpdate.id}:`, error);
    throw error;
  }
}

const deleteDay = async (dayToDelete) => {
  try {
    const response = await axios.delete(`${BASE_URL}/day/${dayToDelete.id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting day with id ${dayToDelete.id}:`, error);
    throw error;
  }
}

const getDayByDateAndUser = async (date, user) => {
  try {
    const response = await axios.get(`${BASE_URL}/day/date/${date}/${user.id}`);
    return response.data;
  } catch (error) {
    console.error("Error adding new day:", error);
    throw error;
  }
}

export { getDays, addDay, updateDay, deleteDay, getDayByDateAndUser } 