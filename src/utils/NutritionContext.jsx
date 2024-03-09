import React, { createContext, useContext, useEffect, useState } from "react";
import foodData from '../data.json';

const NutritionContext = createContext();

export const NutritionProvider = ({ children }) => {
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    const data = foodData;
    setFoodList(data);
  }, [])

  const incrementCoffeeCount = () => {
    const incrementedCoffeeCount = coffeeCount + 1;
    setCoffeeCount(incrementedCoffeeCount);
  }

  const updateFoodList = (food) => {
    const updatedFoodList = foodList.map(item => (item.uniqid === food.uniqid ? food : item));  
    if (!foodList.some(item => item.uniqid === food.uniqid)) {
      updatedFoodList.push(food);
    }
    setFoodList(updatedFoodList);
  }

  const deleteFromFoodList = (food) => {
    const updatedFoodList = foodList.filter(item => item !== food);
    console.log(updatedFoodList);
    setFoodList(updatedFoodList);
  }

  return (
    <NutritionContext.Provider
      value={{
        coffeeCount,
        incrementCoffeeCount,
        foodList,
        updateFoodList,
        deleteFromFoodList,
      }}
    >
      {children}
    </NutritionContext.Provider>
  )
}

export const useNutrition = () => {
  return useContext(NutritionContext);
}