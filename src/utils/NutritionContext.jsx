import React, { createContext, useContext, useEffect, useState } from "react";
import { getFoods, addFood, updateFood, getFoodConsumptions, getFoodsWithTotalQuantity, addFoodConsumption, updateFoodConsumption, deleteFoodConsumption } from './NutritionService';

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
      console.error(`Error updating food with id ${foodToUpdate.id}:`, error);
    }
  };

  const handleAddFoodConsumption = async (newFoodConsumption) => {
    try {
      const addedFoodConsumption = await addFoodConsumption(newFoodConsumption);
      setFoodConsumptions((prevFoodsConsumptions) => [...prevFoodsConsumptions, addedFoodConsumption]);

    } catch (error) {
      console.error('Error adding foodConsumption:', error);
    }
  };

  const handleUpdateFoodConsumption = async (foodConsumptionToUpdate) => {
    try {
      const updatedFoodConsumption = await updateFoodConsumption(foodConsumptionToUpdate);
      setFoodConsumptions((prevFoodConsumptions) =>
        prevFoodConsumptions.map((consumption) => (consumption.id === updatedFoodConsumption.id ? updatedFoodConsumption : consumption))
      );
    } catch (error) {
      console.error(`Error updating foodConsumption with id ${foodConsumptionToUpdate.id}:`, error);
    }
  };

  const handleDeleteFoodConsumption = async (foodConsumptionToDelete) => {
    try {
      await deleteFoodConsumption(foodConsumptionToDelete);
      setFoodConsumptions((prevFoodConsumptions) => prevFoodConsumptions.filter((consumption) => consumption.id !== foodConsumptionToDelete.id));
    } catch (error) {
      console.error(`Error deleting foodConsumption with id ${foodConsumptionToDelete.id}:`, error);
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
        handleAddFoodConsumption,
        handleUpdateFoodConsumption,
        handleDeleteFoodConsumption,
      }}
    >
      {children}
    </NutritionContext.Provider>
  )
}

export const useNutrition = () => {
  return useContext(NutritionContext);
}