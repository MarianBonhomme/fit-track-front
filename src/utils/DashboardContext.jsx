import React, { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [activeDashboard, setActiveDashboard] = useState('nutrition')

  return (
    <DashboardContext.Provider 
      value={{ 
        activeDashboard,
        setActiveDashboard,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);