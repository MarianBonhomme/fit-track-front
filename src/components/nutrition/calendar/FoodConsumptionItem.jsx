import { Icon } from '@iconify/react'
import React from 'react'
import { useNutrition } from '../../../utils/NutritionContext'
import FoodImage from '../global/FoodImage'
import QuantityUnity from '../global/QuantityUnity'
import MacrosQuantities from '../global/MacrosQuantities'
import colors from '../../../assets/colors/colors'

export default function FoodConsumptionItem({consumption, clicked}) {
  const { handleDeleteFoodConsumption } = useNutrition();

  return (
    <div key={consumption.id} className="py-3 border-t border-lightPrimary">
      <div className="flex justify-between px-3">
        <div className='flex items-center gap-5 cursor-pointer' onClick={clicked}>
          <FoodImage image={consumption.food.image} size="lg" />
          <div>
            <p className='font-bold'>{consumption.food.name}</p>
            <QuantityUnity quantity={consumption.quantity} unity={consumption.food.unity} />
          </div>
        </div>
        <div className="flex gap-5 items-center relative">
          <MacrosQuantities macros={consumption.food} />
          <Icon icon="maki:cross" width={15} height={15} style={{color: colors.red, cursor: 'pointer'}} onClick={() => handleDeleteFoodConsumption(consumption)} />
        </div>
      </div>
    </div>
  )
}