import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { useNutrition } from '../../../utils/nutrition/NutritionContext';
import { sortFoodsByFavoritesAndInactives } from '../../../utils/nutrition/NutritionService';
import MacroItem from '../global/MacroItem';
import FoodImage from '../global/FoodImage';
import { useUser } from '../../../utils/user/UserContext';
import { macros } from '../../../utils/global/MacroService';
import CardTitle from '../../global/CardTitle';

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
    setSearchQuery('');
  }

  const onInput = (e) => {
    setIsFoodsListVisible(true);
    setSearchQuery(e);
  }

  return (
    <div className='h-screen w-full bg-opacity-70 bg-black flex justify-center items-center fixed top-0 left-0 z-40'>
      <div className={`max-sm:h-screen w-full sm:max-w-xl sm:rounded-3xl flex flex-col gap-5 bg-primary relative py-5`}>
        <Icon icon="maki:cross" className="absolute top-5 right-5 text-red cursor-pointer size-[20px]" onClick={close} />
        <CardTitle text={foodConsumption ? 'Update FoodConsumption' : 'Add Consumption'} />
        <div className={`${selectedFood && 'px-5 py-3'} relative bg-lightPrimary`}>
          {selectedFood ? (
            <>
              <div className='w-full flex justify-between py-3'>
                <div className='flex items-center gap-3'>
                  <FoodImage image={selectedFood.image} size="lg" />
                  <div className='space-y-1'>
                    <p className='font-semibold'>{selectedFood.name}</p>
                    <div className="flex gap-1">
                      {macros.map((macro) => (
                        <MacroItem key={macro} macro={macro} value={selectedFood[macro]} isRounded={true} showUnity={true} />
                      ))}
                    </div>
                  </div>
                </div>  
                <div className='grid'>
                  <CardTitle text={'Quantity*'} alignLeft={true} />
                    <div className='flex items-center gap-1'>
                      <input 
                        type="number" 
                        className="bg-primary rounded text-secondary w-16 p-2"
                        value={quantity} 
                        onChange={handleChangeQuantity}   
                        required                 
                        min="1"
                      />
                      <div className='max-sm:hidden'>{selectedFood.unity}</div>
                    </div>
                </div>           
              </div>     
              {!foodConsumption && (
                <Icon icon="ion:chevron-up" width="25" height="25" className={`mx-auto transition ${isFoodsListVisible ? '' : 'rotate-180'} cursor-pointer`}  onClick={() => setIsFoodsListVisible(!isFoodsListVisible)}/>
              )}      
            </>          
          ) : null}
          {isFoodsListVisible && (
            <div className='w-full relative h-[50dvh] overflow-y-scroll hide-scrollbar border border-primary px-3 pt-1'>
              <div className={`flex items-center gap-3 cursor-pointer`}>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-lightPrimary text-secondary rounded-xl px-4 py-2"
                />
                <Icon icon="maki:cross" width={15} height={15} className={`text-red cursor-pointer transition ${searchQuery ? '' : 'opacity-0'}`} onClick={() => setSearchQuery('')} />
              </div>
              {filteredFoods && filteredFoods.map((food) => {
                return ( food.is_active && 
                  <div key={food.id} className={`${(selectedFood && !searchQuery) && (selectedFood.id === food.id) && 'hidden'}`}>
                    <div className={`max-sm:hidden flex items-center sm:justify-between gap-3 p-3 border-t ${isDarkMode ? 'border-primary' : 'border-lightPrimary'} cursor-pointer`} onClick={() => selectFood(food)}>
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
                    <div className={`flex sm:hidden items-center gap-10 py-3 border-t ${isDarkMode ? 'border-primary' : 'border-lightPrimary'} cursor-pointer`} onClick={() => selectFood(food)}>
                      <FoodImage image={food.image} size="lg" />
                      <div>
                        <p className='mb-1'>{food.name}</p>
                        <div className="flex gap-2">
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
        <button type="submit" disabled={!isFormValid} className={`flex font-bold bg-blue text-primary px-5 py-3 rounded-3xl mx-auto transition ${!isFormValid && 'brightness-90'}`} onClick={handleSubmit}>Confirm</button>
      </div>
    </div>
  )
}