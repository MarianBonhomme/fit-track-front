import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { useNutrition } from '../utils/nutrition/NutritionContext';
import AddButton from '../components/global/AddButton';
import FoodCard from '../components/nutrition/foods/FoodCard';
import FoodForm from '../components/nutrition/foods/FoodForm';
import RankingCard from '../components/nutrition/foods/RankingCard';
import { sortFoodsByFavoritesAndInactives } from '../utils/nutrition/NutritionService';
import Card from '../components/global/Card';


export default function NutritionFoodsTab() {
  const { foodsWithTotalQuantity } = useNutrition();
  const [sortedFoods, setSortedFoods] = useState();
  const [isFoodFormDisplayed, setIsFoodFormDisplayed] = useState(false)
  const [foodToUpdate, setFoodToUpdate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFoods, setFilteredFoods] = useState();

  useEffect(() => {
    const sortedFoods = sortFoodsByFavoritesAndInactives(foodsWithTotalQuantity);
    setSortedFoods(sortedFoods);
    setFilteredFoods(sortedFoods);
  }, [foodsWithTotalQuantity])

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
        <Card css={'flex justify-between items-center'}>
          <AddButton clicked={() => openFoodForm(null)} css="h-10 w-10 p-3" />
          <div className='flex items-center gap-3'>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-lightPrimary text-secondary rounded-xl px-4 py-2 "
            />
            <Icon icon="maki:cross" width={15} height={15} className={`text-secondary cursor-pointer transition ${searchQuery ? '' : 'opacity-0'}`} onClick={() => setSearchQuery('')} />
          </div>
        </Card>
        <div className='flex flex-wrap max-sm:justify-center gap-x-2 sm:gap-x-5'>
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