import React, { createContext, useContext, useEffect, useState } from "react";
import { getFoods, addFood, updateFood, getFoodConsumptions, getFoodsWithTotalQuantity, addFoodConsumption, updateFoodConsumption, deleteFoodConsumption, getDatesCount } from './NutritionService';

const NutritionContext = createContext();

export const NutritionProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [foodsWithTotalQuantity, setFoodsWithTotalQuantity] = useState([]);
  const [foodConsumptions, setFoodConsumptions] = useState([]);
  const [currentDay, setCurrentDay] = useState()
  const [dailyFoodConsumptions, setDailyFoodConsumptions] = useState([]);
  const [daysIndicatedCount, setDaysIndicatedCount] = useState(0);

  useEffect(() => {
    fetchFoods();
  }, [])

  useEffect(() => {
    fetchFoodConsumptions();
  }, [])

  useEffect(() => {
    fetchFoodsWithTotalQuantity();
  }, [foodConsumptions])

  useEffect(() => {
    fetchDaysIndicatedCount();
  }, [foodConsumptions])

  useEffect(() => {
    const today = new Date();
    setCurrentDay(today);
  }, [])

  useEffect(() => {
    const filteredFoodConsumptions = filterFoodConsumptionsByDate(currentDay);
    setDailyFoodConsumptions(filteredFoodConsumptions);
  }, [foodConsumptions, currentDay])

  const fetchFoods = async () => {
    const fetchedFoods = await getFoods();
    setFoods(fetchedFoods);
  }

  const fetchFoodConsumptions = async () => {
    const fetchedFoodConsumptions = await getFoodConsumptions();
    setFoodConsumptions(fetchedFoodConsumptions);
  }

  const fetchDaysIndicatedCount = async () => {
    const fetchedDaysIndicatedCount = await getDatesCount();
    setDaysIndicatedCount(fetchedDaysIndicatedCount);
  }

  const fetchFoodsWithTotalQuantity = async () => {
    const fetchedFoodsWithTotalQuantity = await getFoodsWithTotalQuantity();
    setFoodsWithTotalQuantity(fetchedFoodsWithTotalQuantity);
  }

  const filterFoodConsumptionsByDate = (date) => {
    const consumptions = foodConsumptions.filter(consumption => {
      const consumptionDate = new Date(consumption.date);
      const consumptionDay = consumptionDate.getDate();
      const consumptionMonth = consumptionDate.getMonth();
      const consumptionYear = consumptionDate.getFullYear();
  
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
  
      return consumptionDay === day && consumptionMonth === month && consumptionYear === year;
    });
    return consumptions;
  }

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

  const incrementCurrentDay = () => {
    const nextDay = new Date(currentDay);
    nextDay.setDate(currentDay.getDate() + 1);
    setCurrentDay(nextDay);
  };

  const decrementCurrentDay = () => {
    const prevDay = new Date(currentDay);
    prevDay.setDate(currentDay.getDate() - 1);
    setCurrentDay(prevDay);
  };

  return (
    <NutritionContext.Provider
      value={{
        foods,
        foodsWithTotalQuantity,
        foodConsumptions,
        currentDay,
        dailyFoodConsumptions,
        daysIndicatedCount,
        handleAddFood,
        handleUpdateFood,
        handleAddFoodConsumption,
        handleUpdateFoodConsumption,
        handleDeleteFoodConsumption,
        setCurrentDay,
        incrementCurrentDay,
        decrementCurrentDay,
      }}
    >
      {children}
    </NutritionContext.Provider>
  )
}

export const useNutrition = () => {
  return useContext(NutritionContext);
}