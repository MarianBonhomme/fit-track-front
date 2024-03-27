import { Icon } from '@iconify/react';
import React from 'react';
import { useNutrition } from '../../../utils/NutritionContext';
import FoodImage from '../global/FoodImage';
import MacrosQuantities from '../global/MacrosQuantities';

function FoodCard({food, editBtnClicked}) {
  const { handleUpdateFood } = useNutrition();

  const addToFavorite = (food) => {
    const foodFavorite = { ...food, is_favorite: 1, is_active: 1, };
    handleUpdateFood(foodFavorite);
  }

  const removeFromFavorite = (food) => {
    const foodNotFavorite = { ...food, is_favorite: 0 };
    handleUpdateFood(foodNotFavorite);
  }

  const setActive = (food) => {
    const foodActive = { ...food, is_active: 1 };
    handleUpdateFood(foodActive);
  }

  const setInactive = (food) => {
    const foodInactive = { ...food, is_active: 0, is_favorite : 0 };
    handleUpdateFood(foodInactive);
  }
  
  return (
    <div className={`bg-primary relative w-[300px] mt-[50px] pt-[80px] flex flex-col justify-between text-center shadow-custom rounded-2xl p-4 ${!food.is_active && 'opacity-60'}`}>
      <div className="absolute -top-[20px] left-0 w-full flex justify-between items-center px-3">
        {food.is_favorite ? (         
          <Icon icon="solar:star-bold" width={30} height={30} className="text-yellow cursor-pointer" onClick={() => removeFromFavorite(food)} />         
        ) : (
          <Icon icon="solar:star-bold" width={30} height={30} className="text-gray cursor-pointer" onClick={() => addToFavorite(food)} />         
        )}
        <FoodImage image={food.image} size="xl" />
        <div className='pt-8'>
          <Icon icon="mage:settings-fill" width={30} height={30} className="text-blue cursor-pointer" onClick={editBtnClicked} />
          {food.is_active ? (         
            <Icon icon="ic:round-delete" width={30} height={30} className="text-red cursor-pointer" onClick={() => setInactive(food)} />        
          ) : (
            <Icon icon="mingcute:arrow-up-fill" width={30} height={30} className="text-purple cursor-pointer" onClick={() => setActive(food)} />      
          )}
        </div>
      </div>
      <h3 className="text-xl font-bold my-3">{food.name}</h3>	
      <MacrosQuantities macros={food} />
    </div>
  )
}

export default FoodCard