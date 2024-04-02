import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { useNutrition } from '../../../utils/NutritionContext';
import { sortFoodConsumptionsByFavorites } from '../../../utils/NutritionService';
import CardTitle from '../../global/CardTitle';
import FoodConsumptionForm from '../calendar/FoodConsumptionForm';
import FoodConsumptionItem from '../calendar/FoodConsumptionItem';
import AddButton from '../global/AddButton';
import MacroPie from '../global/MacroPie';
import { getFormattedDate } from '../../../utils/DateService';
import MacroItem from '../global/MacroItem';

export default function DailyCard() {
  const { currentDay, dailyFoodConsumptions, incrementCurrentDay, decrementCurrentDay } = useNutrition();
  const [sortedDailyFoodConsumptions, setSortedDailyFoodConsumptions] = useState([]);
  const [isFoodConsumptionFormVisible, setIsFoodConsumptionFormVisible] = useState(false);
  const [foodConsumptionToUpdate, setFoodConsumptionToUpdate] = useState(null);
  const [dailyMacros, setDailyMacros] = useState(null);

  useEffect(() => {
    const macros = getDailyMacros();
    setDailyMacros(macros);
    const sortedFoodConsumptions = sortFoodConsumptionsByFavorites(dailyFoodConsumptions);
    setSortedDailyFoodConsumptions(sortedFoodConsumptions);
  }, [dailyFoodConsumptions])

  const getDailyMacros = () => {
    var macros = null;
    var dailyKcal = 0;
    var dailyProt = 0;
    var dailyCarb = 0;
    var dailyFat = 0;

    dailyFoodConsumptions.forEach((consumption) => {
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
      <div className="bg-primary px-4 py-3 shadow-custom rounded-3xl rounded-tl-none relative">
        <div className="flex justify-between items-center">
          <AddButton btnClicked={() => openFoodConsumptionForm(null)}/>
          <CardTitle text={currentDay && getFormattedDate(currentDay)} className="justify-self-start"/>
        </div>
        <div className="flex justify-center items-center gap-5 mb-3">
          <Icon icon="ic:round-chevron-left" width="50" height="50" className="text-dark cursor-pointer" onClick={decrementCurrentDay} />
          {dailyMacros && (
            <div className='flex items-center gap-5'>
              <div className='w-[80px] h-[80px]'>
                <MacroPie macros={dailyMacros} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <MacroItem macro={'kcal'} value={dailyMacros.kcal} isRounded={false} showUnity={true} />
                <MacroItem macro={'fat'} value={dailyMacros.fat} isRounded={false} showUnity={true} />
                <MacroItem macro={'prot'} value={dailyMacros.prot} isRounded={false} showUnity={true} />
                <MacroItem macro={'carb'} value={dailyMacros.carb} isRounded={false} showUnity={true} />
              </div>
            </div>
          )}
          <Icon icon="ic:round-chevron-right" width="50" height="50" className="text-dark cursor-pointer" onClick={incrementCurrentDay} />
        </div>
        {sortedDailyFoodConsumptions.map((consumption) => (
          <FoodConsumptionItem key={consumption.id} consumption={consumption} clicked={() => openFoodConsumptionForm(consumption)} />         
        ))}
      </div>
  
      {isFoodConsumptionFormVisible && (
        <FoodConsumptionForm foodConsumption={foodConsumptionToUpdate} close={closeFoodConsumptionForm} />
      )}
    </>     
  )
}