import React, { useState } from 'react';
import FoodForm from './administration/FoodForm';
import FoodList from './administration/FoodList';
import { Icon } from '@iconify/react';

export default function FoodsDashboard() {
  const [isFoodFormDisplayed, setIsFoodFormDisplayed] = useState(false)
  const [foodToUpdate, setFoodToUpdate] = useState(null);

  const openFoodForm = (food) => {
    food ? setFoodToUpdate(food) : setFoodToUpdate(null);
    setIsFoodFormDisplayed(true);
  }

  return (
    <div className="bg-white rounded-3xl p-5">
      {isFoodFormDisplayed && (
        <FoodForm food={foodToUpdate} close={() => setIsFoodFormDisplayed(false)}/>
      )}
      <div className="max-w-fit flex items-center bg-purple rounded-3xl gap-1 pl-5 pr-8 py-1 mt-1 mb-3 cursor-pointer" onClick={() => openFoodForm(null)} >
        <Icon icon="fluent-emoji-high-contrast:plus" width={20} height={20} style={{color: '#F5F5F5'}} />
        <p className="text-white font-bold">Add</p>
      </div>
      <FoodList editBtnClicked={openFoodForm} />
    </div>
  );
}