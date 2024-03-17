import { useNutrition } from '../../../utils/NutritionContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { Icon } from '@iconify/react';

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
                <td className="flex justify-center">
                  {food.is_favorite ? (         
                    <Icon icon="solar:star-bold" width={30} height={30} style={{color: '#F5BE40', cursor: 'pointer'}} onClick={() => removeFromFavorite(food)} />         
                  ) : (
                    <Icon icon="solar:star-bold" width={30} height={30} style={{color: '#25252F', cursor: 'pointer'}} onClick={() => addToFavorite(food)} />         
                  )}
                </td>
                <td>{food.name}</td>
                <td>{food.kcal}</td>
                <td>{food.prot}</td>
                <td>{food.carb}</td>
                <td>{food.fat}</td>
                <td>{food.unity}</td>
                <td className='flex'>
                  <Icon icon="mdi:note-edit" width={30} height={30} style={{color: '#F5BE40', cursor: 'pointer'}} onClick={() => editBtnClicked(food)} />
                  <Icon icon="ic:round-delete" width={30} height={30} style={{color: '#F46F97', cursor: 'pointer'}} onClick={() => setInactive(food)} />
                </td>
              </tr>
            ) : (
              <tr key={food.id} className="border-t opacity-50">
                <td className="flex justify-center">            
                  <Icon icon="solar:star-bold" width={30} height={30} style={{color: '#25252F'}} />
                </td>
                <td>{food.name}</td>
                <td>{food.kcal}</td>
                <td>{food.prot}</td>
                <td>{food.carb}</td>
                <td>{food.fat}</td>
                <td>{food.unity}</td>
                <td className='flex'>
                  <Icon icon="mdi:note-edit" width={30} height={30} style={{color: '#F5BE40', cursor: 'pointer'}} onClick={() => editBtnClicked(food)} />
                  <Icon icon="mingcute:arrow-up-fill" width={30} height={30} style={{color: '#AA6AE6', cursor: 'pointer'}} onClick={() => setActive(food)} />
                </td>
              </tr>
            )
          })
        )}
      </tbody>
    </table>
  )
}