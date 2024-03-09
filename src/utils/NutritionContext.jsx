import React, { createContext, useContext, useState } from "react";

const NutritionContext = createContext();

export const NutritionProvider = ({ children }) => {
  const [coffeeCount, setCoffeeCount] = useState(0);

  const incrementCoffeeCount = () => {
    const incrementedCoffeeCount = coffeeCount + 1;
    setCoffeeCount(incrementedCoffeeCount);
  }

  return (
    <NutritionContext.Provider
      value={{
        coffeeCount,
        incrementCoffeeCount,
      }}
    >
      {children}
    </NutritionContext.Provider>
  )
}

export const useNutrition = () => {
  return useContext(NutritionContext);
}