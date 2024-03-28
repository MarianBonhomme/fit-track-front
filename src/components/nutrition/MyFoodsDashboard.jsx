import React, { useEffect, useState } from 'react';
import { useNutrition } from '../../utils/NutritionContext';
import { sortFoodsByFavoritesAndInactives } from '../../utils/NutritionService';
import AddButton from './global/AddButton';
import FoodCard from './myfoods/FoodCard';
import FoodForm from './myfoods/FoodForm';
import { Icon } from '@iconify/react';

export default function MyFoodsDashboard() {
  const { foods } = useNutrition();
  const [sortedFoods, setSortedFoods] = useState();
  const [isFoodFormDisplayed, setIsFoodFormDisplayed] = useState(false)
  const [foodToUpdate, setFoodToUpdate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFoods, setFilteredFoods] = useState();

  useEffect(() => {
    const sortedFoods = sortFoodsByFavoritesAndInactives(foods);
    setSortedFoods(sortedFoods);
    setFilteredFoods(sortedFoods);
  }, [foods])

  useEffect(() => {
    if (sortedFoods) {
      const filteredFoods = getFilteredFoods(); 
      setFilteredFoods(filteredFoods);
    }
  }, [searchQuery, sortedFoods])

  const getFilteredFoods = () => {
    return sortedFoods.filter(food =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }  

  const openFoodForm = (food) => {
    food ? setFoodToUpdate(food) : setFoodToUpdate(null);
    setIsFoodFormDisplayed(true);
  }

  return (
    <>
      <div className='w-full flex justify-between items-center bg-primary p-5 rounded-3xl'>
        <AddButton btnClicked={() => openFoodForm(null)}/>
        <div className='flex items-center gap-3'>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-lightPrimary text-secondary rounded-xl px-4 py-2 "
          />
          <Icon icon="maki:cross" width={20} height={20} className={`text-red cursor-pointer transition ${searchQuery ? '' : 'opacity-0'}`} onClick={() => setSearchQuery('')} />
        </div>
      </div>
      <div className='flex flex-wrap gap-x-5'>
        {filteredFoods && (
          filteredFoods.map((food) => (
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