import React, { useState } from 'react';
import FoodForm from './administration/FoodForm';
import FoodList from './administration/FoodList';

export default function FoodsDashboard() {
  const [isFoodFormDisplayed, setIsFoodFormDisplayed] = useState(false)
  const [foodToUpdate, setFoodToUpdate] = useState(null);

  const openFoodForm = (food) => {
    food ? setFoodToUpdate(food) : setFoodToUpdate(null);
    setIsFoodFormDisplayed(true);
  }

  return (
    <div className="bg-dark  rounded-3xl p-5">
      {isFoodFormDisplayed && (
        <FoodForm food={foodToUpdate} close={() => setIsFoodFormDisplayed(false)}/>
      )}
      <div className="w-full">
        <img src="/assets/icons/global/plus-dynamic-premium.png" alt="add" className="w-20 pointer" onClick={() => openFoodForm(null)} />
      </div>
      <FoodList editBtnClicked={openFoodForm} />
    </div>
  );
}