import React, { useEffect, useState } from 'react';
import { useNutrition } from '../../utils/NutritionContext';
import { sortFoodsByFavoritesAndInactives } from '../../utils/NutritionService';
import AddButton from './global/AddButton';
import FoodCard from './myfoods/FoodCard';
import FoodForm from './myfoods/FoodForm';

export default function MyFoodsDashboard() {
  const { foods } = useNutrition();
  const [sortedFoods, setSortedFoods] = useState();
  const [isFoodFormDisplayed, setIsFoodFormDisplayed] = useState(false)
  const [foodToUpdate, setFoodToUpdate] = useState(null);

  useEffect(() => {
    const sortedFoods = sortFoodsByFavoritesAndInactives(foods);
    setSortedFoods(sortedFoods);
  }, [foods])

  const openFoodForm = (food) => {
    food ? setFoodToUpdate(food) : setFoodToUpdate(null);
    setIsFoodFormDisplayed(true);
  }

  return (
    <>
      <div className='w-full bg-white p-5 rounded-3xl'>
        <AddButton btnClicked={() => openFoodForm(null)}/>
      </div>
      <div className='flex flex-wrap gap-x-5'>
        {sortedFoods && (
          sortedFoods.map((food) => (
            <FoodCard food={food} key={food.id} editBtnClicked={() => openFoodForm(food)} />
          ))
        )}
      </div>
      {isFoodFormDisplayed && (
        <FoodForm food={foodToUpdate} close={() => setIsFoodFormDisplayed(false)}/>
      )}
    </>
  );
}