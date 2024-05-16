import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { useNutrition } from '../../../utils/nutrition/NutritionContext';
import { sortFoodsByFavoritesAndInactives } from '../../../utils/nutrition/NutritionService';
import MacroItem from '../global/MacroItem';
import FoodImage from '../global/FoodImage';
import { useUser } from '../../../utils/user/UserContext';
import { macros } from '../../../utils/global/MacroService';

export default function FoodConsumptionForm({ foodConsumption, close }) {
  const { isDarkMode } = useUser();
  const { foodsWithTotalQuantity, dailyFoodConsumptions, handleAddFoodConsumption, handleUpdateFoodConsumption } = useNutrition();
  const [sortedFoods, setSortedFoods] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFoods, setFilteredFoods] = useState();
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
    const sorted = sortFoodsByFavoritesAndInactives(foodsWithTotalQuantity);
    setSortedFoods(sorted);
    setFilteredFoods(sorted);
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
    <div className='h-screen w-full fixed top-0 left-0 flex bg-opacity-70 bg-black justify-center items-center sm:items-start p-5 sm:pt-20 z-50'>
      <div className={`w-full max-w-xl px-3 py-5 sm:p-10 relative rounded-2xl ${isDarkMode ? 'bg-primary' : 'bg-lightPrimary'}`}>
        <Icon icon="maki:cross" className="absolute top-5 right-5 sm:right-10 sm:top-10 text-red cursor-pointer size-[20px] sm:size-[25px]" onClick={close} />
        <h3 className='text-center font-bold mb-5 sm:mb-10'>{foodConsumption ? 'Update FoodConsumption' : 'Add Consumption'}</h3>
        <div className={`px-5 rounded-xl relative ${isDarkMode ? 'bg-lightPrimary' : 'bg-primary'}`}>
          <div className='w-full flex justify-between items-center gap-5 py-3'>
            {selectedFood ? (
              <div className="grow flex justify-between items-center">
                <div className='flex items-center gap-5'>
                  <FoodImage image={selectedFood.image} size="lg" />
                  <div className='space-y-1'>
                    <p className='font-semibold'>{selectedFood.name}</p>
                    <div className="flex space-x-3">
                      {macros.map((macro) => (
                        <MacroItem key={macro} macro={macro} value={selectedFood[macro]} isRounded={true} showUnity={true} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className='max-sm:hidden flex flex-col items-center gap-3'>
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
              <>
                <Icon icon="ion:chevron-up" width="25" height="25" className={`transition ${isFoodsListVisible ? '' : 'rotate-180'} cursor-pointer max-sm:hidden`}  onClick={() => setIsFoodsListVisible(!isFoodsListVisible)}/>
                <Icon icon="ion:chevron-up" width="25" height="25" className={`transition ${isFoodsListVisible ? '' : 'rotate-180'} cursor-pointer absolute top-3 right-3 sm:hidden`}  onClick={() => setIsFoodsListVisible(!isFoodsListVisible)}/>
              </>
            )}
          </div>          
          {selectedFood && (
            <div className='flex sm:hidden flex-col items-center gap-1 pb-3'>
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
          )}
          {isFoodsListVisible && (
            <div className='w-full relative top-full h-[50dvh] overflow-y-scroll hide-scrollbar'>
              <div className={`flex items-center gap-3 border-t ${isDarkMode ? 'border-primary' : 'border-lightPrimary'} cursor-pointer`}>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-lightPrimary text-secondary rounded-xl px-4 py-2 "
                />
                <Icon icon="maki:cross" width={15} height={15} className={`text-red cursor-pointer transition ${searchQuery ? '' : 'opacity-0'}`} onClick={() => setSearchQuery('')} />
              </div>
              {filteredFoods && filteredFoods.map((food) => {
                return ( food.is_active &&
                  <div key={food.id}>
                    <div className={`max-sm:hidden flex items-center justify-between gap-3 p-3 border-t ${isDarkMode ? 'border-primary' : 'border-lightPrimary'} cursor-pointer`} onClick={() => selectFood(food)}>
                      <div className='flex gap-5 items-center'>
                        <FoodImage image={food.image} size="md" />
                        <p>{food.name}</p>
                      </div>
                      <div className="flex gap-3">
                        {macros.map((macro) => (
                          <MacroItem key={macro} macro={macro} value={food[macro]} isRounded={true} showUnity={true} />
                        ))}
                      </div>
                    </div>
                    <div className={`flex sm:hidden items-center justify-between gap-3 py-3 border-t ${isDarkMode ? 'border-primary' : 'border-lightPrimary'} cursor-pointer`} onClick={() => selectFood(food)}>
                      <FoodImage image={food.image} size="lg" />
                      <div>
                        <p className='mb-1'>{food.name}</p>
                        <div className="flex gap-3">
                          {macros.map((macro) => (
                            <MacroItem key={macro} macro={macro} value={food[macro]} isRounded={true} showUnity={true} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>     
          )}
        </div>
        <button type="submit" disabled={!isFormValid} className={`flex font-bold bg-blue text-primary px-5 py-3 rounded-3xl mt-5 sm:mt-10 mx-auto transition ${!isFormValid && 'brightness-90'}`} onClick={handleSubmit}>Confirm</button>
      </div>
    </div>
  )
}