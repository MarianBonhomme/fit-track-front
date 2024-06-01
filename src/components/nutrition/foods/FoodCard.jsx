import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import FoodImage from '../global/FoodImage';
import MacroItem from '../global/MacroItem';
import MacroPie from '../global/MacroPie';
import { macros } from '../../../utils/global/MacroService';
import Card from '../../global/Card';

export default function FoodCard({food, editBtnClicked}) {
  const [foodMacros, setFoodMacros] = useState();

  useEffect(() => {
    const macros = getFoodMacros();
    setFoodMacros(macros);
  }, [food])

  const getFoodMacros = () => {
    return {
      kcal: food.kcal,
      prot: food.prot,
      fat: food.fat,
      carb: food.carb,
    }
  }
  
  return (
    <Card css={`relative w-[175px] sm:w-[250px] mt-[30px] cursor-pointer ${!food.is_active && 'opacity-60'}`} clicked={editBtnClicked}>
      <div className="absolute -top-[20px] left-0 w-full flex justify-center items-center px-3">
        <FoodImage image={food.image} size="lg" />
      </div>  
      {foodMacros && (
        <div className='size-10 -mt-3'>
          <MacroPie macros={foodMacros} />
        </div>
      )}
      <h3 className="text-center font-bold my-3">{food.name}</h3>	
      <div className="grid grid-cols-2 gap-2 max-w-fit mx-auto">
        {macros.map((macro) => (
          <MacroItem key={macro} macro={macro} value={food[macro]} isRounded={false} showUnity={true} />
        ))}
      </div>
    </Card>
  )
}