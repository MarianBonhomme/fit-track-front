import axios from "axios";
import { environment } from "../../../environment";

const BASE_URL = environment.API_URL || "http://localhost:3000";


const getFoodsWithTotalQuantity = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/food/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all foods with totalQuantity:", error);
    throw error;
  }
};

const addFood = async (newFood) => {
  try {
    const response = await axios.post(`${BASE_URL}/food`, newFood, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding new food:", error);
    throw error;
  }
};

const updateFood = async (foodToUpdate, userId) => {
  try {
    let id;

    if (foodToUpdate instanceof FormData) {
      id = foodToUpdate.get("id");
    } else {
      id = foodToUpdate.id;
    }

    const response = await axios.put(`${BASE_URL}/food/${id}/${userId}`, foodToUpdate, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating food with id ${id}:`, error);
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

const getFoodConsumptions = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/foodConsumption/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all foodConsumptions:", error);
    throw error;
  }
};

const addFoodConsumption = async (newFoodConsumption) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/foodConsumption`,
      newFoodConsumption
    );
    return response.data;
  } catch (error) {
    console.error("Error adding new foodConsumption:", error);
    throw error;
  }
};

const updateFoodConsumption = async (foodConsumptionToUpdate) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/foodConsumption/${foodConsumptionToUpdate.id}`,
      foodConsumptionToUpdate
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating foodConsumption with id ${foodConsumptionToUpdate.id}:`,
      error
    );
    throw error;
  }
};

const deleteFoodConsumption = async (foodConsumptionToDelete) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/foodConsumption/${foodConsumptionToDelete.id}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting foodConsumption with id ${foodConsumptionToDelete.id}:`,
      error
    );
    throw error;
  }
};

const getDatesCount = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/foodConsumption/datesCount/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching dates count");
    throw error;
  }
};

const calculateMacros = (food, quantity) => {
  return {
    kcal: (quantity * food.proportion * food.kcal) / 100,
    prot: (quantity * food.proportion * food.prot) / 100,
    carb: (quantity * food.proportion * food.carb) / 100,
    fat: (quantity * food.proportion * food.fat) / 100,
  };
};

const sortFoodsByFavoritesAndInactives = (foods) => {
  const sortedFoods = [...foods];

  sortedFoods.sort((a, b) => {
    if (a.is_favorite && !b.is_favorite) {
      return -1;
    } else if (!a.is_favorite && b.is_favorite) {
      return 1;
    } else if (a.is_active && !b.is_active) {
      return -1;
    } else if (!a.is_active && b.is_active) {
      return 1;
    } else {
      return 0;
    }
  });

  return sortedFoods;
};

const sortFoodConsumptionsByFavorites = (foodConsumptions) => {
  const sortedFoodConsumptions = [...foodConsumptions];

  sortedFoodConsumptions.sort((a, b) => {
    if (a.food.is_favorite && !b.food.is_favorite) {
      return -1;
    } else if (!a.food.is_favorite && b.food.is_favorite) {
      return 1;
    } else {
      return 0;
    }
  });

  return sortedFoodConsumptions;
};

export {
  addFood,
  updateFood,
  deleteFood,
  getFoodConsumptions,
  addFoodConsumption,
  updateFoodConsumption,
  deleteFoodConsumption,
  getDatesCount,
  getFoodsWithTotalQuantity,
  calculateMacros,
  sortFoodsByFavoritesAndInactives,
  sortFoodConsumptionsByFavorites,
};
