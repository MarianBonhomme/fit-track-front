import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { useNutrition } from '../../../utils/nutrition/NutritionContext';
import { sortFoodsByFavoritesAndInactives } from '../../../utils/nutrition/NutritionService';
import MacroItem from '../global/MacroItem';
import FoodImage from '../global/FoodImage';
import { useUser } from '../../../utils/user/UserContext';

export default function FoodConsumptionForm({ foodConsumption, close }) {
  const { isDarkMode } = useUser();
  const { foods, dailyFoodConsumptions, handleAddFoodConsumption, handleUpdateFoodConsumption } = useNutrition();
  const [sortedFoods, setSortedFoods] = useState();
  const [selectedFood, setSelectedFood] = useState();
  const [isFoodsListVisible, setIsFoodsListVisible] = useState(!foodConsumption);
  const [quantity, setQuantity] = useState(1);
  const [isFormValid, setIsFormValid] = useState(true);
  const [formData, setFormData] = useState({
    id: foodConsumption ? foodConsumption.id : null,
    food_id: selectedFood ? selectedFood.id : 1,
    quantity: quantity,
  })

  useEffect(() => {
    if (foodConsumption) {
      setSelectedFood(foodConsumption.food)
      setQuantity(foodConsumption.quantity)
    }
  }, [foodConsumption])

  useEffect(() => {
    setFormData({
      id: foodConsumption ? foodConsumption.id : null,
      food_id: selectedFood ? selectedFood.id : 1,
      quantity: quantity,
    })
  }, [selectedFood, quantity])

  const handleChangeQuantity = (event) => {
    if (event.target.value < 1) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }    
    setQuantity(event.target.value);
  };

  useEffect(() => {
    const sorted = sortFoodsByFavoritesAndInactives(foods);
    setSortedFoods(sorted);
  }, [foods])

  const handleSubmit = () => {
    if (foodConsumption) {
      handleUpdateFoodConsumption(formData);
    } else {
      if (isFoodAlreadyInDate(formData.food_id)) {
        const updatedFormData = getFormDataWithTotalQuantity();
        handleUpdateFoodConsumption(updatedFormData);
      } else {
        handleAddFoodConsumption(formData)
      }
    }    
    close();
	};

  const isFoodAlreadyInDate = (foodId) => {
    for (const consumption of dailyFoodConsumptions) {
      if (consumption.food_id == foodId) {
        return true;
      }
    }
    return false;
  }

  const getFormDataWithTotalQuantity = () => {
    const existingIndex = dailyFoodConsumptions.findIndex(consumption => consumption.food_id == formData.food_id);
    const existingQuantity = dailyFoodConsumptions[existingIndex].quantity;
    const existingId = dailyFoodConsumptions[existingIndex].id;
    const totalQuantity = parseInt(existingQuantity, 10) + parseInt(formData.quantity, 10);
    const updatedFormData = { ...formData, id: existingId, quantity: totalQuantity };
    return updatedFormData;
  }
  
  const selectFood = (food) => {
    setSelectedFood(food);
    setIsFoodsListVisible(false);
  }

  return (
    <div className='h-screen w-full fixed top-0 left-0 flex bg-opacity-70 bg-black justify-center items-start pt-20 z-50'>
      <div className={`w-full max-w-3xl p-10 relative rounded-2xl ${isDarkMode ? 'bg-primary' : 'bg-lightPrimary'}`}>
        <Icon icon="maki:cross" width={35} height={35} className="absolute right-10 top-10 text-red cursor-pointer" onClick={close} />
        <h3 className='text-center font-bold text-3xl mb-10'>{foodConsumption ? 'Update FoodConsumption' : 'Create New FoodConsumption'}</h3>
        <div className={`px-5 rounded-xl relative ${isDarkMode ? 'bg-lightPrimary' : 'bg-primary'}`}>
          <div className='w-full flex justify-between items-center gap-5 py-3'>
            {selectedFood ? (
              <div className="grow flex justify-between items-center">
                <div className='flex items-center gap-5'>
                  <FoodImage image={selectedFood.image} size="xl" />
                  <div>
                    <p className='text-lg mb-2'>{selectedFood.name}</p>
                    <div className="flex justify-center items-center gap-3 text-lg">
                      <MacroItem macro={'kcal'} value={selectedFood.kcal} isRounded={true} showUnity={true} />
                      <MacroItem macro={'prot'} value={selectedFood.prot} isRounded={true} showUnity={true} />
                      <MacroItem macro={'fat'} value={selectedFood.fat} isRounded={true} showUnity={true} />
                      <MacroItem macro={'carb'} value={selectedFood.carb} isRounded={true} showUnity={true} />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col items-center gap-3'>
                  <p>Quantity</p>
                  <input 
                    type="number" 
                    className={`max-w-20 px-3 py-1 rounded-md ${isDarkMode ? 'bg-primary' : 'bg-lightPrimary'}`} 
                    value={quantity} 
                    onChange={handleChangeQuantity}   
                    required                 
                    min="1"
                  />
                </div>
              </div>
            ) : (
              <p className='text-center text-gray font-bold'>Select food</p>
            )}
            {!foodConsumption && (
              <Icon icon="ion:chevron-up" width="40" height="40" className={`transition ${isFoodsListVisible ? '' : 'rotate-180'} cursor-pointer`}  onClick={() => setIsFoodsListVisible(!isFoodsListVisible)}/>
            )}
          </div>
          {isFoodsListVisible && (
            <div className='w-full relative top-full h-[50dvh] overflow-y-scroll'>
              {sortedFoods && sortedFoods.map((food) => {
                return ( food.is_active &&
                  <div key={food.id} className={`flex items-center justify-between gap-3 p-3 border-t ${isDarkMode ? 'border-primary' : 'border-lightPrimary'} cursor-pointer`} onClick={() => selectFood(food)}>
                    <FoodImage image={food.image} size="lg" />
                    <p>{food.name}</p>
                    <div className="flex justify-center items-center gap-3 text-lg">
                      <MacroItem macro={'kcal'} value={food.kcal} isRounded={true} showUnity={true} />
                      <MacroItem macro={'prot'} value={food.prot} isRounded={true} showUnity={true} />
                      <MacroItem macro={'fat'} value={food.fat} isRounded={true} showUnity={true} />
                      <MacroItem macro={'carb'} value={food.carb} isRounded={true} showUnity={true} />
                    </div>
                  </div>
                )
              })}
            </div>     
          )}
        </div>
        <button type="submit" disabled={!isFormValid} className={`flex font-bold bg-blue text-primary px-10 py-3 rounded-3xl mt-10 mx-auto transition ${!isFormValid && 'brightness-90'}`} onClick={handleSubmit}>Confirm</button>
      </div>
    </div>
  )
}