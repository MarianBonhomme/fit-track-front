import React, { createContext, useContext, useEffect, useState } from "react";
import { addWeightMeasurement, deleteWeightMeasurement, getWeightMeasurements, updateWeightMeasurement } from "./HealthService";
import moment from 'moment';
import { useUser } from "../user/UserContext";

const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
  const { user } = useUser();
  const [weightMeasurements, setWeightMeasurements] = useState()
  const [healthLoading, setHealthLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState([]);
  const [currentWeek, setCurrentWeek] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchWeightMeasurements();
      setHealthLoading(false);
    };

    if (user && user.id) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    setCurrentMonth(initCurrentMonth());
    setCurrentWeek(initCurrentWeek());
  }, [])

  const fetchWeightMeasurements = async () => {
    const fetchedWeightMeasurements = await getWeightMeasurements(user.id);
    setWeightMeasurements(fetchedWeightMeasurements);
  };

  const handleAddWeightMeasurement = async (newWeightMeasurement) => {
    try {
      const addedWeightMeasurement = await addWeightMeasurement(newWeightMeasurement);
      setWeightMeasurements((prevWeightMeasurements) => {
        const updatedMeasurements = [...prevWeightMeasurements, addedWeightMeasurement];
        updatedMeasurements.sort((a, b) => new Date(a.date) - new Date(b.date));
        return updatedMeasurements;
      });
    } catch (error) {
      console.error("Error adding WeightMeasurement:", error);
    }
  };

  const handleUpdateWeightMeasurement = async (weightMeasurementToUpdate) => {
    try {
      const updatedWeightMeasurement = await updateWeightMeasurement(weightMeasurementToUpdate);
      setWeightMeasurements((prevWeightMeasurements) =>
        prevWeightMeasurements.map((consumption) =>
          consumption.id === updatedWeightMeasurement.id
            ? updatedWeightMeasurement
            : consumption
        )
      );
    } catch (error) {
      console.error(
        `Error updating weightMeasurement with id ${weightMeasurementToUpdate.id}:`,
        error
      );
    }
  };

  const handleDeleteWeightMeasurement = async (weightMeasurementToDelete) => {
    try {
      await deleteWeightMeasurement(weightMeasurementToDelete);
      setFoodsWithTotalQuantity((prevFoods) =>
        prevFoods.filter((food) => food.id !== foodToDelete.id)
      );
    } catch (error) {
      console.error(
        `Error deleting weightMeasurement with id ${weightMeasurementToDelete.id}:`,
        error
      );
    }
  };

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

  const initCurrentMonth = () => {
    const today = moment().startOf('month');
    const startOfMonth = today.clone().startOf('month');
    const endOfMonth = today.clone().endOf('month');
    return Array.from({ length: endOfMonth.diff(startOfMonth, 'days') + 1 }, (_, i) => startOfMonth.clone().add(i, 'day').format());
  };
  
  const incrementMonth = () => {
    setCurrentMonth(prevMonth =>
      prevMonth.map(day => moment(day).add(1, 'month').toDate())
    );
  };
  
  const decrementMonth = () => {
    setCurrentMonth(prevMonth =>
      prevMonth.map(day => moment(day).subtract(1, 'month').toDate())
    );
  };

  const initCurrentWeek = () => {
    const today = moment().startOf('week');
    const startOfWeek = today.clone().startOf('week');
    const endOfWeek = today.clone().endOf('week');
    return Array.from({ length: endOfWeek.diff(startOfWeek, 'days') + 1 }, (_, i) => startOfWeek.clone().add(i, 'day').format());
  };
  
  const incrementWeek = () => {
    setCurrentWeek(prevWeek =>
      prevWeek.map(day => moment(day).add(1, 'week').toDate())
    );
  };
  
  const decrementWeek = () => {
    setCurrentWeek(prevWeek =>
      prevWeek.map(day => moment(day).subtract(1, 'week').toDate())
    );
  };

  return (
    <HealthContext.Provider
      value={{
        healthLoading,
        weightMeasurements,
        handleAddWeightMeasurement,
        handleUpdateWeightMeasurement,
        handleDeleteWeightMeasurement,
        currentDate,
        incrementCurrentDate,
        decrementCurrentDate,
        setCurrentDate,       
        currentMonth,
        incrementMonth,
        decrementMonth,       
        currentWeek,
        incrementWeek,
        decrementWeek,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  return useContext(HealthContext);
};
