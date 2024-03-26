import { Icon } from '@iconify/react';
import React from 'react';
import { useNutrition } from '../../../utils/NutritionContext';
import FoodImage from '../global/FoodImage';
import MacroQuantity from '../global/MacroQuantity';

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
    <div className={`bg-white relative w-[250px] mt-[50px] pt-[80px] flex flex-col justify-between text-center shadow-custom rounded-2xl p-3 ${!food.is_active && 'opacity-60'}`}>
      <div className="absolute -top-[25px] left-0 w-full flex justify-between items-center px-3">
        {food.is_favorite ? (         
          <Icon icon="solar:star-bold" width={30} height={30} style={{color: '#F5BE40', cursor: 'pointer'}} onClick={() => removeFromFavorite(food)} />         
        ) : (
          <Icon icon="solar:star-bold" width={30} height={30} style={{color: '#25252F', cursor: 'pointer'}} onClick={() => addToFavorite(food)} />         
        )}
        <FoodImage image={food.image} size="xl" />
        <div className='pt-8'>
          <Icon icon="mage:settings-fill" width={30} height={30} style={{color: '#3BCBEA', cursor: `${food.is_active ? 'pointer' : 'default'}`}} onClick={editBtnClicked} />
          {food.is_active ? (         
            <Icon icon="ic:round-delete" width={30} height={30} style={{color: '#F46F97', cursor: 'pointer'}} onClick={() => setInactive(food)} />        
          ) : (
            <Icon icon="mingcute:arrow-up-fill" width={30} height={30} style={{color: '#AA6AE6', cursor: 'pointer'}} onClick={() => setActive(food)} />      
          )}
        </div>
      </div>
      <h3 className="text-xl font-bold my-3">{food.name}</h3>	
      <MacroQuantity macros={food} />
    </div>
  )
}

export default FoodCard