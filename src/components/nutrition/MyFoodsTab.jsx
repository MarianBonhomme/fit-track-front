import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { useNutrition } from '../../utils/nutrition/NutritionContext';
import { sortFoodsByFavoritesAndInactives } from '../../utils/nutrition/NutritionService';
import FoodCard from './myfoods/FoodCard';
import FoodForm from './myfoods/FoodForm';
import AddButton from '../global/AddButton';
import RankingCard from './myfoods/RankingCard';

export default function MyFoodsTab() {
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
    <div className='w-full flex max-sm:flex-col gap-5'>
      <div className='w-full sm:w-3/4'>
        <div className='w-full flex justify-between items-center bg-primary p-5 rounded-3xl'>
          <AddButton clicked={() => openFoodForm(null)} css="h-10 w-10 p-3" />
          <div className='flex items-center gap-3'>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-lightPrimary text-secondary rounded-xl px-4 py-2 "
            />
            <Icon icon="maki:cross" width={15} height={15} className={`text-red cursor-pointer transition ${searchQuery ? '' : 'opacity-0'}`} onClick={() => setSearchQuery('')} />
          </div>
        </div>
        <div className='flex flex-wrap max-sm:justify-center gap-x-5'>
          {filteredFoods && (
            filteredFoods.map((food) => (
              <FoodCard food={food} key={food.id} editBtnClicked={() => openFoodForm(food)} />
            ))
          )}
        </div>
        {isFoodFormDisplayed && (
          <FoodForm food={foodToUpdate} close={() => setIsFoodFormDisplayed(false)}/>
        )}
      </div>
      <div className="w-full sm:w-1/4">
        <RankingCard />
      </div>
    </div>
  );
}