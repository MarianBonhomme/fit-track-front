import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { useNutrition } from '../../../utils/nutrition/NutritionContext';
import { sortFoodConsumptionsByFavorites } from '../../../utils/nutrition/NutritionService';
import CardTitle from '../../global/CardTitle';
import FoodConsumptionForm from './FoodConsumptionForm';
import FoodConsumptionItem from './FoodConsumptionItem';
import { getFullDate } from '../../../utils/global/DateService';
import AddButton from '../../global/AddButton';
import FlipMove from 'react-flip-move';
import DailyMacroProgressBar from '../global/DailyMacroProgressBar';
import MacroItem from '../global/MacroItem';
import { macros } from '../../../utils/global/MacroService';
import { useUser } from '../../../utils/user/UserContext';
import Card from '../../global/Card';

export default function DailyCard() {
  const { user } = useUser();
  const { currentDate, days, dailyFoodConsumptions, incrementCurrentDate, decrementCurrentDate, setCurrentDate, toggleValidateDay, findDayByDate } = useNutrition();
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
    setDaily(findDayByDate(currentDate))
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
    <Card css={'sm:rounded-tl-none'}>
      <div className="flex justify-between items-center">
        <div className='flex gap-2'>
          {daily && sortedDailyFoodConsumptions.length > 0 && (
            daily.count_for_stats ? (
              <Icon icon="material-symbols:cancel-rounded" width="20" height="20" className='text-secondary cursor-pointer' onClick={toggleValidateDay} />
            ) : (
              <Icon icon="icon-park-solid:check-one" width="20" height="20" className="text-secondary cursor-pointer" onClick={toggleValidateDay} />
            )
          )}
          <CardTitle text={currentDate && getFullDate(currentDate)} />
        </div>
        <div className='flex gap-1'>
          <Icon icon="ic:round-chevron-left" width="25" height="25" className="bg-lightPrimary text-secondary rounded-full cursor-pointer" onClick={decrementCurrentDate} />
          <Icon icon="ic:round-chevron-right" width="25" height="25" className="bg-lightPrimary text-secondary rounded-full cursor-pointer" onClick={incrementCurrentDate} />
        </div>
      </div>
      <div className="flex justify-center items-center gap-5 mt-5">
        {dailyMacros && (
          <div className='flex flex-col items-center gap-3'>
            <div className='flex items-center space-x-2'>
              {macros.map((macro) => (
                <DailyMacroProgressBar key={macro} maxValue={user[`daily${macro.charAt(0).toUpperCase()}${macro.slice(1)}`]} value={dailyMacros[macro]} macro={macro} />
              ))}
            </div>
            <div className="flex items-center space-x-2">
              {macros.map((macro) => (
                <MacroItem key={macro} macro={macro} value={dailyMacros[macro]} isRounded={false} showUnity={true} />
              ))}
            </div>
          </div>
        )}
      </div>
      <AddButton clicked={() => openFoodConsumptionForm()} css='w-full mt-5 h-12 mx-auto'/>
      {sortedDailyFoodConsumptions && sortedDailyFoodConsumptions.length > 0 && (
        <FlipMove className='divide-y divide-lightPrimary'>
          {sortedDailyFoodConsumptions.map((consumption) => (
            <div key={consumption.id}>
              <FoodConsumptionItem consumption={consumption} clicked={() => openFoodConsumptionForm(consumption)} /> 
            </div>        
          ))}
        </FlipMove>
      )}
  
      {isFoodConsumptionFormVisible && (
        <FoodConsumptionForm foodConsumption={foodConsumptionToUpdate} close={closeFoodConsumptionForm} />
      )}
    </Card>     
  )
}