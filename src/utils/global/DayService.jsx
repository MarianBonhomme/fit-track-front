import axios from "axios";

const BASE_URL = "http://localhost:3000";

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

const getDayByDate = async (date) => {
  try {
    const response = await axios.get(`${BASE_URL}/day/date/${date}`);
    return response.data;
  } catch (error) {
    console.error("Error adding new day:", error);
    throw error;
  }
}

const addOrGetDay = async (date) => {
  const day = await getDayByDate(date);
  if (day) {
    return day
  } else {
    const createdDay = await addDay({date: date});
    return createdDay
  }
}

export { addOrGetDay, getDayByDate, updateDay } 