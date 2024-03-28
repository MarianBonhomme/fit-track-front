import axios from "axios";

const BASE_URL = "http://localhost:3000";

const getFoods = async () => {
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
    const response = await axios.post(`${BASE_URL}/food`, newFood, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding new food:", error);
    throw error;
  }
};

const updateFood = async (foodToUpdate) => {
  try {
    let id;

    if (foodToUpdate instanceof FormData) {
      id = foodToUpdate.get('id');
    } else {
      id = foodToUpdate.id;
    }

    const response = await axios.put(`${BASE_URL}/food/${id}}`, foodToUpdate, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating food with id ${id}:`, error);
    throw error;
  }
};

const getFoodConsumptions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/foodConsumption`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all foodConsumptions:", error);
    throw error;
  }
};

const addFoodConsumption = async (newFoodConsumption) => {
  try {
    const response = await axios.post(`${BASE_URL}/foodConsumption`, newFoodConsumption);
    return response.data;
  } catch (error) {
    console.error("Error adding new foodConsumption:", error);
    throw error;
  }
};

const updateFoodConsumption = async (foodConsumptionToUpdate) => {
  try {
    const response = await axios.put(`${BASE_URL}/foodConsumption/${foodConsumptionToUpdate.id}`, foodConsumptionToUpdate);
    return response.data;
  } catch (error) {
    console.error(`Error updating food with id ${foodConsumptionToUpdate.id}:`, error);
    throw error;
  }
};

const deleteFoodConsumption = async (foodConsumptionToDelete) => {
  try {
    const response = await axios.delete(`${BASE_URL}/foodConsumption/${foodConsumptionToDelete.id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting foodConsumption with id ${foodConsumptionToDelete.id}:`, error);
    throw error;
  }
};

const getDatesCount = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/foodConsumption/datesCount`);
    return response.data
  } catch (error) {
    console.error('Error fetching dates count');
    throw error;
  }
}

const getFoodsWithTotalQuantity = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/food/totalQuantity`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all foods with totalQuantity:", error);
    throw error;
  }
}

const calculateMacros = (consumption) => {
  return {
    kcal: (consumption.quantity * consumption.food.proportion * consumption.food.kcal) / 100,
    prot: (consumption.quantity * consumption.food.proportion * consumption.food.prot) / 100,
    carb: (consumption.quantity * consumption.food.proportion * consumption.food.carb) / 100,
    fat: (consumption.quantity * consumption.food.proportion * consumption.food.fat) / 100,
  }
}

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
}

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
}

export { getFoods, getFoodById, addFood, updateFood, getFoodConsumptions, addFoodConsumption, updateFoodConsumption, deleteFoodConsumption, getDatesCount, getFoodsWithTotalQuantity, calculateMacros, sortFoodsByFavoritesAndInactives, sortFoodConsumptionsByFavorites };
