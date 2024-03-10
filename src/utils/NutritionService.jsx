import axios from "axios";

const BASE_URL = "http://localhost:3000";

const getAllUnities = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/unity`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all unities:", error);
    throw error;
  }
};

const getAllFoods = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/food`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all foods:", error);
    throw error;
  }
};

const getFoodById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/food/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching food with id ${id}:`, error);
    throw error;
  }
};

const addFood = async (newFood) => {
  try {
    const response = await axios.post(`${BASE_URL}/food`, newFood);
    return response.data;
  } catch (error) {
    console.error("Error adding new food:", error);
    throw error;
  }
};

const updateFood = async (foodToUpdate) => {
  try {
    const response = await axios.put(`${BASE_URL}/food/${foodToUpdate.id}`, foodToUpdate);
    return response.data;
  } catch (error) {
    console.error(`Error updating food with id ${foodToUpdate.id}:`, error);
    throw error;
  }
};

const deleteFood = async (foodToDelete) => {
  try {
    const response = await axios.delete(`${BASE_URL}/food/${foodToDelete.id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting food with id ${foodToDelete.id}:`, error);
    throw error;
  }
};

const getAllFoodConsumptions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/foodConsumption`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all foods:", error);
    throw error;
  }
};

export { getAllUnities, getAllFoods, getFoodById, addFood, updateFood, deleteFood, getAllFoodConsumptions };
