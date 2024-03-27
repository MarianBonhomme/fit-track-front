import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { useNutrition } from '../../../utils/NutritionContext';

export default function FoodConsumptionForm({ foodConsumption, close }) {
  const { foods, dailyFoodConsumptions, handleAddFoodConsumption, handleUpdateFoodConsumption, currentDay } = useNutrition();

  const [formData, setFormData] = useState({
    id: foodConsumption ? foodConsumption.id : null,
    food_id: 1,
    quantity: 0,
    date: currentDay
  })

  useEffect(() => {
    if (foodConsumption) {
      setFormData(foodConsumption)
    }
  }, [foodConsumption, currentDay])

  const handleChange = (e) => {
	  const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
	};

  const handleSubmit = (e) => {
	  e.preventDefault();
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

  return (
    <div className='h-screen w-full fixed top-0 left-0 bg-opacity-70 bg-ice flex justify-center items-center z-50 shadow-custom'>
      <form onSubmit={handleSubmit} className='w-full max-w-3xl flex flex-col items-center bg-white p-10 relative rounded-2xl'>
        <Icon icon="maki:cross" width={35} height={35} style={{color: '#F46F97', cursor: 'pointer'}} className="absolute right-10 top-10" onClick={close} />
        <h3 className='font-bold text-3xl mb-10'>{foodConsumption ? 'Update FoodConsumption' : 'Create New FoodConsumption'}</h3>
        <div className='w-full flex flex-col items-center'>
          <div className="flex gap-5">
            <div className='flex flex-col mb-5'>
              <label htmlFor="food_id">Food</label>
              <select
                id="food_id"
                name="food_id"
                value={formData.food_id}
                onChange={handleChange}
                className='text-black px-4 py-1 border rounded-2xl mt-1 w-72'
                required
              >
                {foods && foods.map((food) => (
                  <option key={food.id} value={food.id}>{food.name}</option>
                ))}
              </select>
            </div>
          </div>       
          <div className='flex flex-col mb-5'>
            <label htmlFor="quantity">Quantity</label>
            <div>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className='text-black px-4 py-1 border rounded-2xl mt-1 w-20'
                required
              />
            </div>
          </div>        
        </div>
        <button type="submit" className='font-bold bg-blue text-white px-10 py-3 rounded-3xl mt-10'>Confirm</button>
      </form>
    </div>
  )
}