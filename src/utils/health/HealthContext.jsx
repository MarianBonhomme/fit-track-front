import React, { createContext, useContext, useEffect, useState } from "react";
import { useProfile } from "../profile/ProfileContext";
import { getWeightMeasurements } from "./HealthService";

const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
  const { profile } = useProfile();
  const [weightMeasurements, setWeightMeasurements] = useState()
  const [healthLoading, setHealthLoading] = useState(true);

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

  return (
    <HealthContext.Provider
      value={{
        healthLoading,
        weightMeasurements,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  return useContext(HealthContext);
};
