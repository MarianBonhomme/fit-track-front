import { useNutrition } from '../../../utils/NutritionContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { getimagePathFormatted } from '../../../utils/ImageService';

export default function FoodList({ editBtnClicked }) {
  const { foods, handleUpdateFood } = useNutrition();
  const [sortedFoods, setSortedFoods] = useState();

  useEffect(() => {
    const sortedFoods = sortFoodsByFavoritesAndInactives();
    setSortedFoods(sortedFoods);
  }, [foods])

  const sortFoodsByFavoritesAndInactives = () => {
    const sortedFoods = [...foods];

    sortedFoods.sort((a, b) => {
      if (a.is_favorite && !b.is_favorite) {
        return -1;
      } else if (!a.is_favorite && b.is_favorite) {
        return 1;
      } else if (a.is_active && !b.is_active) {
        return -1;
      } else if (!a.is_active && b.is_active) {
        return 1;
      } else {
        return 0;
      }
    });

    return sortedFoods;
  }

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
    <div className='flex flex-wrap gap-x-5'>
      {sortedFoods && (
        sortedFoods.map((food) => (
          <div key={food.id} className={`bg-white relative w-[250px] mt-[50px] pt-[80px] flex flex-col justify-between text-center shadow-custom rounded-2xl p-3 ${!food.is_active && 'opacity-60'}`}>
            <div className="absolute -top-[25px] left-0 w-full flex justify-between items-center px-3">
              {food.is_favorite ? (         
                <Icon icon="solar:star-bold" width={30} height={30} style={{color: '#F5BE40', cursor: 'pointer'}} onClick={() => removeFromFavorite(food)} />         
              ) : (
                <Icon icon="solar:star-bold" width={30} height={30} style={{color: '#25252F', cursor: 'pointer'}} onClick={() => addToFavorite(food)} />         
              )}
              {food.image && (<img src={`http://localhost:3000/${getimagePathFormatted(food.image)}`} className="w-[100px] h-[100px] rounded-full" />)}
              <div className='pt-8'>
                <Icon icon="mage:settings-fill" width={30} height={30} style={{color: '#3BCBEA', cursor: `${food.is_active ? 'pointer' : 'default'}`}} onClick={() => {food.is_active && editBtnClicked(food)}} />
                {food.is_active ? (         
                  <Icon icon="ic:round-delete" width={30} height={30} style={{color: '#F46F97', cursor: 'pointer'}} onClick={() => setInactive(food)} />        
                ) : (
                  <Icon icon="mingcute:arrow-up-fill" width={30} height={30} style={{color: '#AA6AE6', cursor: 'pointer'}} onClick={() => setActive(food)} />      
                )}
              </div>
            </div>
            <h3 className="text-xl font-bold my-3">{food.name}</h3>	
            <div className="w-full grid grid-cols-2">
              <div>
                <p><span className='font-bold'>{food.kcal}</span> kcal</p>
                <p className='text-green'><span className='font-bold'>{food.prot}</span> prot</p>
              </div>
              <div>
                <p className='text-purple'><span className='font-bold'>{food.fat}</span> fat</p>
                <p className='text-yellow'><span className='font-bold'>{food.carb}</span> carb</p>
              </div>
            </div>	
          </div>
        ))
      )}
    </div>
  )
}