import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getFoods,
  addFood,
  updateFood,
  getFoodConsumptions,
  getFoodsWithTotalQuantity,
  addFoodConsumption,
  updateFoodConsumption,
  deleteFoodConsumption,
  getDatesCount,
  deleteFood,
} from "./NutritionService";
import { useProfile } from "../profile/ProfileContext";
import { addOrGetDay, getDayByDate, updateDay } from "../global/DayService";

const NutritionContext = createContext();

export const NutritionProvider = ({ children }) => {
  const { profile } = useProfile();
  const [nutritionLoading, setNutritionLoading] = useState(true);
  const [foods, setFoods] = useState([]);
  const [foodsWithTotalQuantity, setFoodsWithTotalQuantity] = useState([]);
  const [foodConsumptions, setFoodConsumptions] = useState([]);
  const [currentDay, setCurrentDay] = useState(new Date());
  const [dailyFoodConsumptions, setDailyFoodConsumptions] = useState([]);
  const [day, setDay] = useState();
  const [daysIndicatedCount, setDaysIndicatedCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await fetchFoods();
      await fetchFoodConsumptions();
      setNutritionLoading(false);
    };

    fetchData();
  }, [profile]);

  useEffect(() => {
    fetchFoodsWithTotalQuantity();
    fetchDaysIndicatedCount();
  }, [foodConsumptions]);

  useEffect(() => {
    const fetch = async () => {
      const filteredFoodConsumptions = filterFoodConsumptionsByDate(currentDay);
      setDailyFoodConsumptions(filteredFoodConsumptions);
      const fetchedDay = await getDayByDate(currentDay);
      setDay(fetchedDay);
    }

    fetch()
  }, [foodConsumptions, currentDay]);

  const fetchFoods = async () => {
    const fetchedFoods = await getFoods();
    setFoods(fetchedFoods);
  };

  const fetchFoodConsumptions = async () => {
    const fetchedFoodConsumptions = await getFoodConsumptions(profile.id);
    setFoodConsumptions(fetchedFoodConsumptions);
  };

  const fetchDaysIndicatedCount = async () => {
    const fetchedDaysIndicatedCount = await getDatesCount(profile.id);
    setDaysIndicatedCount(fetchedDaysIndicatedCount);
  };

  const fetchFoodsWithTotalQuantity = async () => {
    const fetchedFoodsWithTotalQuantity = await getFoodsWithTotalQuantity(
      profile.id
    );
    setFoodsWithTotalQuantity(fetchedFoodsWithTotalQuantity);
  };

  const filterFoodConsumptionsByDate = (date) => {
    const consumptions = foodConsumptions.filter((consumption) => {
      const consumptionDate = new Date(consumption.day.date);
      const consumptionDay = consumptionDate.getDate();
      const consumptionMonth = consumptionDate.getMonth();
      const consumptionYear = consumptionDate.getFullYear();

      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      return (
        consumptionDay === day &&
        consumptionMonth === month &&
        consumptionYear === year
      );
    });
    return consumptions;
  };

  const handleAddFood = async (newFood) => {
    try {
      const addedFood = await addFood(newFood);
      setFoods((prevFoods) => [...prevFoods, addedFood]);
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };

  const handleUpdateFood = async (foodToUpdate) => {
    try {
      const updatedFood = await updateFood(foodToUpdate);
      setFoods((prevFoods) =>
        prevFoods.map((food) =>
          food.id === updatedFood.id ? updatedFood : food
        )
      );
    } catch (error) {
      console.error(`Error updating food with id ${foodToUpdate.id}:`, error);
    }
  };

  const handleDeleteFood = async (foodToDelete) => {
    try {
      await deleteFood(foodToDelete);
      setFoods((prevFoods) =>
        prevFoods.filter((food) => food.id !== foodToDelete.id)
      );
    } catch (error) {
      console.error(
        `Error deleting foodConsumption with id ${foodToDelete.id}:`,
        error
      );
    }
  };

  const handleAddFoodConsumption = async (newFoodConsumption) => {
    try {
      const createdDay = await addOrGetDay(currentDay);
      const newFoodConsumptionWithProfileAndDay = {
        ...newFoodConsumption,
        profile_id: profile.id,
        day_id: createdDay.id,
      };
      try {
        const addedFoodConsumption = await addFoodConsumption(
          newFoodConsumptionWithProfileAndDay
        );
        setFoodConsumptions((prevFoodsConsumptions) => [
          ...prevFoodsConsumptions,
          addedFoodConsumption,
        ]);
      } catch (error) {
        console.error("Error adding foodConsumption:", error);
      }
    } catch (error) {
      console.error("Error adding foodConsumption:", error);
    }
  };

  const handleUpdateFoodConsumption = async (foodConsumptionToUpdate) => {
    try {
      const updatedFoodConsumption = await updateFoodConsumption(
        foodConsumptionToUpdate
      );
      setFoodConsumptions((prevFoodConsumptions) =>
        prevFoodConsumptions.map((consumption) =>
          consumption.id === updatedFoodConsumption.id
            ? updatedFoodConsumption
            : consumption
        )
      );
    } catch (error) {
      console.error(
        `Error updating foodConsumption with id ${foodConsumptionToUpdate.id}:`,
        error
      );
    }
  };

  const handleDeleteFoodConsumption = async (foodConsumptionToDelete) => {
    try {
      await deleteFoodConsumption(foodConsumptionToDelete);
      setFoodConsumptions((prevFoodConsumptions) =>
        prevFoodConsumptions.filter(
          (consumption) => consumption.id !== foodConsumptionToDelete.id
        )
      );
    } catch (error) {
      console.error(
        `Error deleting foodConsumption with id ${foodConsumptionToDelete.id}:`,
        error
      );
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

  const toggleValidateDay = async () => {
    const dayToUpdate = {...day, is_validate: !day.is_validate};
    const updatedDay = await updateDay(dayToUpdate);
    setDay(updatedDay);
  }

  return (
    <NutritionContext.Provider
      value={{
        nutritionLoading,
        foods,
        foodsWithTotalQuantity,
        foodConsumptions,
        currentDay,
        day,
        dailyFoodConsumptions,
        daysIndicatedCount,
        handleAddFood,
        handleUpdateFood,
        handleDeleteFood,
        handleAddFoodConsumption,
        handleUpdateFoodConsumption,
        handleDeleteFoodConsumption,
        setCurrentDay,
        incrementCurrentDay,
        decrementCurrentDay,
        toggleValidateDay,
      }}
    >
      {children}
    </NutritionContext.Provider>
  );
};

export const useNutrition = () => {
  return useContext(NutritionContext);
};
