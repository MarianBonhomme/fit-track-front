import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { useNutrition } from '../../../utils/nutrition/NutritionContext'
import FoodImage from '../global/FoodImage'
import QuantityUnity from '../global/QuantityUnity'
import MacroItem from '../global/MacroItem'
import { calculateMacros } from '../../../utils/nutrition/NutritionService'
import { macros } from '../../../utils/global/MacroService'

export default function FoodConsumptionItem({consumption, clicked}) {
  const { handleDeleteFoodConsumption } = useNutrition();
  const [consumptionMacros, setConsumptionsMacros] = useState();
  
  useEffect(() => {
    const macros = calculateMacros(consumption.food, consumption.quantity)
    setConsumptionsMacros(macros);
  }, [consumption]);

  return (
    <div className="flex justify-between p-3 sm:p-5 max-sm:gap-3">
      <div className='flex items-center gap-3 sm:gap-5 cursor-pointer' onClick={clicked}>
        <FoodImage image={consumption.food.image} size="lg" />
        <div>
          <p className='font-bold'>{consumption.food.name}</p>
          <QuantityUnity quantity={consumption.quantity} unity={consumption.food.unity} />
        </div>
      </div>
      <div className="flex gap-3 sm:gap-5 items-center">
        {consumptionMacros && (
          <div className="grid grid-cols-2 sm:flex gap-1 sm:gap-3">            
            {macros.map((macro) => (
              <MacroItem key={macro} macro={macro} value={consumptionMacros[macro]} isRounded={true} />
            ))}
          </div>
        )}
        <Icon icon="maki:cross" width={15} height={15} className="text-red cursor-pointer" onClick={() => handleDeleteFoodConsumption(consumption)} />
      </div>
    </div>
  )
}