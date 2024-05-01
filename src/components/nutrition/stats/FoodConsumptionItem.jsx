import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { useNutrition } from '../../../utils/nutrition/NutritionContext'
import FoodImage from '../global/FoodImage'
import QuantityUnity from '../global/QuantityUnity'
import MacroItem from '../global/MacroItem'
import { calculateMacros } from '../../../utils/nutrition/NutritionService'

export default function FoodConsumptionItem({consumption, clicked}) {
  const { handleDeleteFoodConsumption } = useNutrition();
  const [consumptionMacros, setConsumptionsMacros] = useState();
  
  useEffect(() => {
    const macros = calculateMacros(consumption.food, consumption.quantity)
    setConsumptionsMacros(macros);
  }, [consumption]);

  return (
    <div className="flex justify-between p-5">
      <div className='flex items-center gap-5 cursor-pointer' onClick={clicked}>
        <FoodImage image={consumption.food.image} size="md" />
        <div>
          <p className='font-bold'>{consumption.food.name}</p>
          <QuantityUnity quantity={consumption.quantity} unity={consumption.food.unity} />
        </div>
      </div>
      <div className="flex gap-5 items-center">
        {consumptionMacros && (
          <div className="flex space-x-3">
            <MacroItem macro={'kcal'} value={consumptionMacros.kcal} isRounded={true} />
            <MacroItem macro={'prot'} value={consumptionMacros.prot} isRounded={true} />
            <MacroItem macro={'fat'} value={consumptionMacros.fat} isRounded={true} />
            <MacroItem macro={'carb'} value={consumptionMacros.carb} isRounded={true} />
          </div>
        )}
        <Icon icon="maki:cross" width={15} height={15} className="text-red cursor-pointer" onClick={() => handleDeleteFoodConsumption(consumption)} />
      </div>
    </div>
  )
}