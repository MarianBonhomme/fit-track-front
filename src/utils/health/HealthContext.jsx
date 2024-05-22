import React, { createContext, useContext, useEffect, useState } from "react";
import { useProfile } from "../profile/ProfileContext";
import { addWeightMeasurement, deleteWeightMeasurement, getWeightMeasurements, updateWeightMeasurement } from "./HealthService";

const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
  const { profile } = useProfile();
  const [weightMeasurements, setWeightMeasurements] = useState()
  const [healthLoading, setHealthLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      await fetchWeightMeasurements();
      setHealthLoading(false);
    };

    if (profile && profile.id) {
      fetchData();
    }
  }, [profile]);

  const fetchWeightMeasurements = async () => {
    const fetchedWeightMeasurements = await getWeightMeasurements(profile.id);
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
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  return useContext(HealthContext);
};
