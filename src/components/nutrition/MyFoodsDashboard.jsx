import React, { useState } from 'react';
import FoodForm from './myfoods/FoodForm';
import FoodList from './myfoods/FoodList';
import { Icon } from '@iconify/react';

export default function MyFoodsDashboard() {
  const [isFoodFormDisplayed, setIsFoodFormDisplayed] = useState(false)
  const [foodToUpdate, setFoodToUpdate] = useState(null);

  const openFoodForm = (food) => {
    food ? setFoodToUpdate(food) : setFoodToUpdate(null);
    setIsFoodFormDisplayed(true);
  }

  return (
    <>
      {isFoodFormDisplayed && (
        <FoodForm food={foodToUpdate} close={() => setIsFoodFormDisplayed(false)}/>
      )}
      <div className='w-full bg-white p-5 rounded-3xl'>
        <div className="max-w-fit flex items-center bg-blue rounded-full gap-1 pl-4 pr-5 py-2 cursor-pointer" onClick={() => openFoodForm(null)} >
          <Icon icon="fluent-emoji-high-contrast:plus" width={20} height={20} style={{color: '#F5F5F5'}} />
          <p className="text-white font-bold">Add</p>
        </div>
      </div>
      <FoodList editBtnClicked={openFoodForm} />
    </>
  );
}