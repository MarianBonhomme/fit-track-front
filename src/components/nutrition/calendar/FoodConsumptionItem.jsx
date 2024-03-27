import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { useNutrition } from '../../../utils/NutritionContext'
import FoodImage from '../global/FoodImage'
import MacrosQuantities from '../global/MacrosQuantities'
import QuantityUnity from '../global/QuantityUnity'

export default function FoodConsumptionItem({consumption, clicked}) {
  const { handleDeleteFoodConsumption } = useNutrition();
  const [consumptionMacros, setConsumptionsMacros] = useState();
  
  useEffect(() => {
    const macros = {
      kcal: (consumption.food.kcal * consumption.quantity * consumption.food.proportion) / 100,
      prot: (consumption.food.prot * consumption.quantity * consumption.food.proportion) / 100,
      carb: (consumption.food.carb * consumption.quantity * consumption.food.proportion) / 100,
      fat: (consumption.food.fat * consumption.quantity * consumption.food.proportion) / 100,
    }
    setConsumptionsMacros(macros);
  }, [consumption]);

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
          {consumptionMacros && (<MacrosQuantities macros={consumptionMacros} />)}
          <Icon icon="maki:cross" width={15} height={15} className="text-red cursor-pointer" onClick={() => handleDeleteFoodConsumption(consumption)} />
        </div>
      </div>
    </div>
  )
}