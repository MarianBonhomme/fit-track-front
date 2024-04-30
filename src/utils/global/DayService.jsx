import axios from "axios";

const BASE_URL = "http://localhost:3000";

const getDays = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/day`);
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

const getDayByDate = async (date) => {
  try {
    const response = await axios.get(`${BASE_URL}/day/date/${date}`);
    return response.data;
  } catch (error) {
    console.error("Error adding new day:", error);
    throw error;
  }
}

export { getDays, addDay, updateDay, deleteDay, getDayByDate } 