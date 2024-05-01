import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { useNutrition } from '../../../utils/nutrition/NutritionContext';
import { sortFoodConsumptionsByFavorites } from '../../../utils/nutrition/NutritionService';
import CardTitle from '../../global/CardTitle';
import FoodConsumptionForm from './FoodConsumptionForm';
import FoodConsumptionItem from './FoodConsumptionItem';
import MacroPie from '../global/MacroPie';
import { getFullDate } from '../../../utils/global/DateService';
import MacroItem from '../global/MacroItem';
import AddButton from '../../global/AddButton';
import FlipMove from 'react-flip-move';

export default function DailyCard() {
  const { currentDate, days, dailyFoodConsumptions, incrementCurrentDate, decrementCurrentDate, setCurrentDate, toggleValidateDay, getDayByDate } = useNutrition();
  const [sortedDailyFoodConsumptions, setSortedDailyFoodConsumptions] = useState([]);
  const [isFoodConsumptionFormVisible, setIsFoodConsumptionFormVisible] = useState(false);
  const [foodConsumptionToUpdate, setFoodConsumptionToUpdate] = useState(null);
  const [dailyMacros, setDailyMacros] = useState(null);
  const [daily, setDaily] = useState();

  useEffect(() => {
    const macros = getDailyMacros();
    setDailyMacros(macros);
    const sortedFoodConsumptions = sortFoodConsumptionsByFavorites(dailyFoodConsumptions);
    setSortedDailyFoodConsumptions(sortedFoodConsumptions);
  }, [dailyFoodConsumptions])

  useEffect(() => {
    setDaily(getDayByDate(currentDate))
  }, [currentDate, days])

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
      <div className="bg-primary px-4 py-3 rounded-3xl rounded-tl-none relative">
        <div className="flex justify-between items-center">
          <div className={`flex items-center gap-2 ${currentDate && getFullDate(currentDate) === 'Today' ? 'opacity-0' : 'cursor-pointer'}`} onClick={() => setCurrentDate(new Date())}>
            <Icon icon="ion:calendar" width="25" height="25" className='text-blue' />
            <p className='text-sm/3'>Today</p>
          </div>
          <CardTitle text={currentDate && getFullDate(currentDate)} />
          <div>
            {daily && sortedDailyFoodConsumptions.length > 0 && (
              daily.is_validate ? (
                <Icon icon="material-symbols:cancel-rounded" width="25" height="25" className='text-red cursor-pointer' onClick={toggleValidateDay} />
              ) : (
                <Icon icon="icon-park-solid:check-one" width="25" height="25" className="text-green cursor-pointer" onClick={toggleValidateDay} />
              )
            )}
          </div>
        </div>
        <div className="flex justify-center items-center gap-5">
          <Icon icon="ic:round-chevron-left" width="25" height="25" className="text-dark cursor-pointer" onClick={decrementCurrentDate} />
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
          <Icon icon="ic:round-chevron-right" width="25" height="25" className="text-dark cursor-pointer" onClick={incrementCurrentDate} />
        </div>
        <AddButton clicked={() => openFoodConsumptionForm()} css='w-full mt-5 h-20 mx-auto'/>
        {sortedDailyFoodConsumptions && sortedDailyFoodConsumptions.length > 0 && (
          <FlipMove className='divide-y divide-lightPrimary'>
            {sortedDailyFoodConsumptions.map((consumption) => (
              <div key={consumption.id}>
                <FoodConsumptionItem consumption={consumption} clicked={() => openFoodConsumptionForm(consumption)} /> 
              </div>        
            ))}
          </FlipMove>
        )}
      </div>
  
      {isFoodConsumptionFormVisible && (
        <FoodConsumptionForm foodConsumption={foodConsumptionToUpdate} close={closeFoodConsumptionForm} />
      )}
    </>     
  )
}