import React, { useState, useEffect } from 'react'
import { useNutrition } from '../../../utils/NutritionContext'

export default function FoodConsumptionForm({ date, foodConsumption, close }) {
  const { foods, handleAddFoodConsumption, handleUpdateFoodConsumption } = useNutrition();

  const [formData, setFormData] = useState({
    id: foodConsumption ? foodConsumption.id : null,
    food_id: 1,
    quantity: 0,
    date: date
  })

  useEffect(() => {
    if (foodConsumption) {
      setFormData(foodConsumption)
    }
  }, [foodConsumption])

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
      handleAddFoodConsumption(formData)
    }
	  close();
	};

  return (
    <div className='h-screen w-full fixed top-0 left-0 bg-opacity-50 bg-black flex justify-center items-center z-50'>
      <form onSubmit={handleSubmit} className='w-full max-w-3xl flex flex-col items-center bg-dark p-10 relative rounded-2xl'>
        <button onClick={close} className='absolute top-5 right-5 text-xl hover:rotate-90'>❌</button>
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
        <button type="submit" className='bg-black px-10 py-3 rounded-3xl mt-10'>Confirm</button>
      </form>
    </div>
  )
}