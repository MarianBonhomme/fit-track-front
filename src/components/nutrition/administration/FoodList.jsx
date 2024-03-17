import { useNutrition } from '../../../utils/NutritionContext';
import { useState } from 'react';
import { useEffect } from 'react';

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
    const foodFavorite = { ...food, is_favorite: 1 };
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
    <table className="w-full text-center">
      <thead>
        <tr>
          <th>Favoris</th>
          <th>Name</th>
          <th>Kcals</th>
          <th>Proteins</th>
          <th>Carbs</th>
          <th>Fats</th>
          <th>Unity</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sortedFoods && (
          sortedFoods.map((food) => {
            return food.is_active ? (
              <tr key={food.id} className="border-t">
                <td>{food.is_favorite ? (                  
                  <img src='/assets/icons/global/star-dynamic-premium.png' alt="favorite" className='w-6 pointer mx-auto' onClick={() => removeFromFavorite(food)}/>
                ) : (
                  <img src='/assets/icons/global/star-dynamic-clay.png' alt="favorite" className='w-6 pointer mx-auto' onClick={() => addToFavorite(food)}/>
                )}</td>
                <td>{food.name}</td>
                <td>{food.kcal}</td>
                <td>{food.prot}</td>
                <td>{food.carb}</td>
                <td>{food.fat}</td>
                <td>{food.unity}</td>
                <td className='flex gap-3'>
                  <img src="/assets/icons/global/setting-dynamic-premium.png" alt="update" className="w-6 py-3 pointer" onClick={() => editBtnClicked(food)}/>
                  <img src="/assets/icons/global/trash-can-dynamic-premium.png" alt="delete" className="w-6 py-3 pointer" onClick={() => setInactive(food)}/>
                </td>
              </tr>
            ) : (
              <tr key={food.id} className="border-t opacity-50">
                <td>            
                  <img src='/assets/icons/global/star-dynamic-clay.png' alt="favorite" className='w-6 pointer mx-auto'/>
                </td>
                <td>{food.name}</td>
                <td>{food.kcal}</td>
                <td>{food.prot}</td>
                <td>{food.carb}</td>
                <td>{food.fat}</td>
                <td>{food.unity}</td>
                <td className='flex gap-3'>
                  <img src="/assets/icons/global/setting-dynamic-premium.png" alt="update" className="w-6 py-3 pointer" onClick={() => editBtnClicked(food)}/>
                  <img src="/assets/icons/global/plus-dynamic-premium.png" alt="delete" className="w-6 py-3 pointer" onClick={() => setActive(food)}/>
                </td>
              </tr>
            )
          })
        )}
      </tbody>
    </table>
  )
}