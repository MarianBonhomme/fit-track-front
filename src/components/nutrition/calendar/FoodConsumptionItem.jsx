import { Icon } from '@iconify/react'
import React from 'react'
import { useNutrition } from '../../../utils/NutritionContext'
import FoodImage from '../global/FoodImage'
import QuantityUnity from '../global/QuantityUnity'

export default function FoodConsumptionItem({consumption, clicked}) {
  const { handleDeleteFoodConsumption } = useNutrition();

  return (
    <div key={consumption.id} className="py-3 border-t">
      <div className="flex justify-between px-3">
        <div className='flex items-center gap-5 cursor-pointer' onClick={clicked}>
          <FoodImage image={consumption.food.image} size="lg" />
          <div>
            <p className='font-bold'>{consumption.food.name}</p>
            <QuantityUnity quantity={consumption.quantity} unity={consumption.food.unity} />
          </div>
        </div>
        <div className="flex gap-3 items-center relative">
          <div className='w-[50px] h-[50px] text-sm flex flex-col justify-center items-center bg-ice rounded-full'>
            <p className='font-bold'>{Math.round((consumption.quantity * consumption.food.proportion * consumption.food.kcal) / 100 )}</p>
            <p>kcal</p>
          </div>
          <div className='w-[50px] h-[50px] text-sm flex flex-col justify-center items-center bg-green text-white rounded-full'>
            <p className='font-bold'>{Math.round((consumption.quantity * consumption.food.proportion * consumption.food.prot) / 100 )}</p>
            <p>prot</p>
          </div>
          <div className='w-[50px] h-[50px] text-sm flex flex-col justify-center items-center bg-purple text-white rounded-full'>
            <p className='font-bold'>{Math.round((consumption.quantity * consumption.food.proportion * consumption.food.fat) / 100 )}</p>
            <p>fat</p>
          </div>
          <div className='w-[50px] h-[50px] text-sm flex flex-col justify-center items-center bg-yellow text-white rounded-full'>
            <p className='font-bold'>{Math.round((consumption.quantity * consumption.food.proportion * consumption.food.carb) / 100 )}</p>
            <p>carb</p>
          </div>
          <Icon icon="maki:cross" width={15} height={15} style={{color: '#F46F97', cursor: 'pointer'}} onClick={() => handleDeleteFoodConsumption(consumption)} />
        </div>
      </div>
    </div>
  )
}