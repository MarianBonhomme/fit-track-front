import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllFoods, addFood, updateFood, deleteFood, getAllUnities, getAllFoodConsumptions } from './NutritionService';

const NutritionContext = createContext();

export const NutritionProvider = ({ children }) => {
  const [nutritionLoading, setNutritionLoading] = useState(true)
;  const [unities, setUnities] = useState([]);
  const [foods, setFoods] = useState([]);
  const [foodConsumptions, setFoodConsumptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUnities = await getAllUnities();
        setUnities(allUnities);
        const allFoods = await getAllFoods();
        setFoods(allFoods);
        const allFoodConsumptions = await getAllFoodConsumptions();
        setFoodConsumptions(allFoodConsumptions);

        setNutritionLoading(false);
      } catch (error) {
        console.error('Error loading data', error);
        setNutritionLoading(false);
      }
    };

    setNutritionLoading(true);
    fetchData();
  }, []);

  const handleAddFood = async (newFood) => {
    try {
      const addedFood = await addFood(newFood);
      console.log(addedFood);
      setFoods((prevFoods) => [...prevFoods, addedFood]);
    } catch (error) {
      console.error('Error adding food:', error);
    }
  };

  const handleUpdateFood = async (foodToUpdate) => {
    try {
      const updatedFood = await updateFood(foodToUpdate);
      setFoods((prevFoods) =>
        prevFoods.map((food) => (food.id === updatedFood.id ? updatedFood : food))
      );
    } catch (error) {
      console.error(`Error updating food with id ${id}:`, error);
    }
  };

  const handleDeleteFood = async (foodToDelete) => {
    try {
      await deleteFood(foodToDelete);
      setFoods((prevFoods) => prevFoods.filter((food) => food.id !== foodToDelete.id));
    } catch (error) {
      console.error(`Error deleting food with id ${id}:`, error);
    }
  };

  const getFoodTotalQuantity = (foodId) => {
    const foodConsumptionsForFood = foodConsumptions.filter(
      (consumption) => consumption.food_id === foodId
    );

    const totalQuantity = foodConsumptionsForFood.reduce(
      (total, consumption) => total + consumption.quantity,
      0
    );

    return {
      food: foodConsumptionsForFood[0].food, // Sélectionne la première consommation pour accéder à l'entité food
      totalQuantity,
    };
  };

  return (
    <NutritionContext.Provider
      value={{
        nutritionLoading,
        unities,
        foods,
        foodConsumptions,
        getFoodTotalQuantity,
        handleAddFood,
        handleUpdateFood,
        handleDeleteFood,
      }}
    >
      {children}
    </NutritionContext.Provider>
  )
}

export const useNutrition = () => {
  return useContext(NutritionContext);
}