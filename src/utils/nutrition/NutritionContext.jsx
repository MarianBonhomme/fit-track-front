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
  getFoodsWithTotalQuantityOnlyValidated,
} from "./NutritionService";
import { useProfile } from "../profile/ProfileContext";
import { addDay, deleteDay, getDayByDateAndProfile, getDays, updateDay } from "../global/DayService";
import moment from 'moment';

const NutritionContext = createContext();

export const NutritionProvider = ({ children }) => {
  const { profile } = useProfile();
  const [nutritionLoading, setNutritionLoading] = useState(true);
  const [foods, setFoods] = useState([]);
  const [foodsWithTotalQuantity, setFoodsWithTotalQuantity] = useState([]);
  const [foodsWithTotalQuantityValidated, setFoodsWithTotalQuantityValidated] = useState([]);
  const [foodConsumptions, setFoodConsumptions] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dailyFoodConsumptions, setDailyFoodConsumptions] = useState([]);
  const [days, setDays] = useState();
  const [daysIndicatedCount, setDaysIndicatedCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await fetchFoods();
      await fetchFoodConsumptions();
      await fetchDays();
      setNutritionLoading(false);
    };

    fetchData();
  }, [profile]);

  useEffect(() => {
    fetchFoodsWithTotalQuantity();
    fetchFoodsWithTotalQuantityValidated();
    fetchDaysIndicatedCount();
  }, [foods, foodConsumptions, days]);

  useEffect(() => {
    const fetch = async () => {
      const filteredFoodConsumptions = filterFoodConsumptionsByDate(currentDate);
      setDailyFoodConsumptions(filteredFoodConsumptions);
    }

    fetch()
  }, [foodConsumptions, currentDate]);

  const fetchFoods = async () => {
    const fetchedFoods = await getFoods();
    setFoods(fetchedFoods);
  };

  const fetchFoodConsumptions = async () => {
    const fetchedFoodConsumptions = await getFoodConsumptions(profile.id);
    setFoodConsumptions(fetchedFoodConsumptions);
  };

  const fetchDays = async () => {
    const fetchedDays = await getDays(profile);
    setDays(fetchedDays);
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

  const fetchFoodsWithTotalQuantityValidated = async () => {
    const fetchedFoodsWithTotalQuantityValidated = await getFoodsWithTotalQuantityOnlyValidated(
      profile.id
    );
    setFoodsWithTotalQuantityValidated(fetchedFoodsWithTotalQuantityValidated);
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
      const createdDay = await addOrGetDay(currentDate);
      const newFoodConsumptionWithProfileAndDay = {
        ...newFoodConsumption,
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
      setFoodConsumptions((prevFoodConsumptions) => {
        const updatedFoodConsumptions = prevFoodConsumptions.filter(
          (consumption) => consumption.id !== foodConsumptionToDelete.id
        );
  
        const hasOtherConsumptionWithSameDayId = updatedFoodConsumptions.some(
          (consumption) => consumption.day_id === foodConsumptionToDelete.day_id
        );
  
        if (!hasOtherConsumptionWithSameDayId) {
          handleDeleteDay(foodConsumptionToDelete.day);
        }
  
        return updatedFoodConsumptions;
      });
    } catch (error) {
      console.error(
        `Error deleting foodConsumption with id ${foodConsumptionToDelete.id}:`,
        error
      );
    }
  };

  const handleDeleteDay = async (dayToDelete) => {
    try {
      await deleteDay(dayToDelete);
      setDays((prevDays) =>
        prevDays.filter(
          (day) => day.id !== dayToDelete.id
        )
      );
    } catch (error) {
      console.error(
        `Error deleting day with id ${dayToDelete.id}:`,
        error
      );
    }
  }

  const incrementCurrentDate = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDay);
  };

  const decrementCurrentDate = () => {
    const prevDay = new Date(currentDate);
    prevDay.setDate(currentDate.getDate() - 1);
    setCurrentDate(prevDay);
  };

  const toggleValidateDay = async () => {
    const day = findDayByDate(currentDate);
    const dayToUpdate = {...day, is_validate: !day.is_validate};
    const updatedDay = await updateDay(dayToUpdate);
    setDays((prevDays) =>
      prevDays.map((day) =>
        day.id === updatedDay.id
          ? updatedDay
          : day
      )
    );
  }
  
  const addOrGetDay = async (date) => {
    const day = await getDayByDateAndProfile(date, profile);
    if (day) {
      return day
    } else {
      const createdDay = await addDay({date: date, profile_id: profile.id});
      const updatedDays = [...days, createdDay];
      // Trier le tableau days en fonction des dates
      updatedDays.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      setDays(updatedDays);      
      return createdDay
    }
  }

  const findDayByDate = (date) => {
    const formattedDate = moment(date);
    const foundDay = days.find(day => moment(day.date).isSame(formattedDate, 'day') && day.profile_id === profile.id);
    return foundDay;
  } 

  return (
    <NutritionContext.Provider
      value={{
        nutritionLoading,
        foods,
        foodsWithTotalQuantity,
        foodsWithTotalQuantityValidated,
        foodConsumptions,
        currentDate,
        days,
        dailyFoodConsumptions,
        daysIndicatedCount,
        handleAddFood,
        handleUpdateFood,
        handleDeleteFood,
        handleAddFoodConsumption,
        handleUpdateFoodConsumption,
        handleDeleteFoodConsumption,
        setCurrentDate,
        incrementCurrentDate,
        decrementCurrentDate,
        toggleValidateDay,
        findDayByDate,
      }}
    >
      {children}
    </NutritionContext.Provider>
  );
};

export const useNutrition = () => {
  return useContext(NutritionContext);
};
