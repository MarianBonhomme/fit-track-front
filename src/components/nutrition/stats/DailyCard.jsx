import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { useNutrition } from '../../../utils/NutritionContext';
import { sortFoodConsumptionsByFavorites } from '../../../utils/NutritionService';
import CardTitle from '../../global/CardTitle';
import FoodConsumptionForm from '../calendar/FoodConsumptionForm';
import FoodConsumptionItem from '../calendar/FoodConsumptionItem';
import AddButton from '../global/AddButton';
import MacroPie from '../global/MacroPie';
import MacroQuantity from '../global/MacroQuantity';

export default function DailyCard() {
  const { todayFoodConsumptions } = useNutrition();
  const [sortedTodayFoodConsumptions, setSortedTodayFoodConsumptions] = useState([]);
  const [isFoodConsumptionFormVisible, setIsFoodConsumptionFormVisible] = useState(false);
  const [foodConsumptionToUpdate, setFoodConsumptionToUpdate] = useState(null);
  const [dailyMacros, setDailyMacros] = useState(null);
  const today = new Date();

  useEffect(() => {
    const macros = getDailyMacros();
    setDailyMacros(macros);
    const sortedFoodConsumptions = sortFoodConsumptionsByFavorites(todayFoodConsumptions);
    setSortedTodayFoodConsumptions(sortedFoodConsumptions);
  }, [todayFoodConsumptions])

  const getDailyMacros = () => {
    var macros = null;
    var dailyKcal = 0;
    var dailyProt = 0;
    var dailyCarb = 0;
    var dailyFat = 0;

    todayFoodConsumptions.forEach((consumption) => {
      dailyKcal += (consumption.quantity * consumption.food.proportion * consumption.food.kcal) / 100; 
      dailyProt += (consumption.quantity * consumption.food.proportion * consumption.food.prot) / 100; 
      dailyCarb += (consumption.quantity * consumption.food.proportion * consumption.food.carb) / 100; 
      dailyFat += (consumption.quantity * consumption.food.proportion * consumption.food.fat) / 100; 
    })

    macros = {
      kcal: dailyKcal,
      prot: dailyProt,
      carb: dailyCarb,
      fat: dailyFat,
    };

    return macros;
  }

  const openFoodConsumptionForm = (foodConsumption) => {
    setFoodConsumptionToUpdate(foodConsumption);
    setIsFoodConsumptionFormVisible(true);
  }

  const closeFoodConsumptionForm = () => {
    setFoodConsumptionToUpdate(null);
    setIsFoodConsumptionFormVisible(false);
  }

  return (
    <>
      <div className="bg-white px-4 py-3 shadow-custom rounded-3xl rounded-tl-none relative">
        <div className="flex justify-between pb-3">
          <div className="flex flex-col items-start gap-2">
            <CardTitle text='Today' className="justify-self-start"/>
            <AddButton btnClicked={() => openFoodConsumptionForm(null)}/>
          </div>
          {dailyMacros && (
            <div className='flex gap-5'>
              <div className='w-[80px] h-[80px]'>
                <MacroPie displayLabel={false} macros={dailyMacros} />
              </div>
              <MacroQuantity macros={dailyMacros} />
            </div>
          )}
          <div className='flex justify-end cursor-pointer'>
            <Icon icon="solar:calendar-bold" width="50" height="50" style={{color: '#F46F97'}} />
          </div>
        </div>
        {sortedTodayFoodConsumptions.map((consumption) => (
          <FoodConsumptionItem key={consumption.id} consumption={consumption} clicked={() => openFoodConsumptionForm(consumption)} />         
        ))}
      </div>
  
      {isFoodConsumptionFormVisible && (
        <FoodConsumptionForm date={today} foodConsumption={foodConsumptionToUpdate} close={closeFoodConsumptionForm} />
      )}
    </>     
  )
}