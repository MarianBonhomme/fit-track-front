import React, { createContext, useContext, useEffect, useState } from "react";
import { getFoods, addFood, updateFood, deleteFood, getFoodConsumptions, getFoodsWithTotalQuantity } from './NutritionService';

const NutritionContext = createContext();

export const NutritionProvider = ({ children }) => {
  const [nutritionLoading, setNutritionLoading] = useState(true);
  const [foods, setFoods] = useState([]);
  const [foodsWithTotalQuantity, setFoodsWithTotalQuantity] = useState([]);
  const [foodConsumptions, setFoodConsumptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedFoods = await getFoods();
        setFoods(fetchedFoods);
        const fetchedFoodsWithTotalQuantity = await getFoodsWithTotalQuantity();
        setFoodsWithTotalQuantity(fetchedFoodsWithTotalQuantity);
        const fetchedFoodConsumptions = await getFoodConsumptions();
        setFoodConsumptions(fetchedFoodConsumptions);

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

  return (
    <NutritionContext.Provider
      value={{
        nutritionLoading,
        foods,
        foodsWithTotalQuantity,
        foodConsumptions,
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