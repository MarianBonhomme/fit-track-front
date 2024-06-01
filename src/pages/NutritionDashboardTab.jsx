import React, { useEffect, useState } from 'react';
import { useNutrition } from '../utils/nutrition/NutritionContext';
import CountCard from '../components/nutrition/dashboard/CountCard';
import DailyCard from '../components/nutrition/dashboard/DailyCard';
import MacroChartCard from '../components/nutrition/dashboard/MacroChartCard';
import MacroRepartitionCard from '../components/nutrition/dashboard/MacroRepartitionCard';
import CalendarCard from '../components/nutrition/dashboard/CalendarCard';
import AddButton from '../components/global/AddButton';

export default function NutritionDashboardTab() {
  const { foodsWithTotalQuantity, daysIndicatedCount } = useNutrition();
  const [foodsForCountCards, setFoodsForCountCards] = useState([]);

  useEffect(() => {
    const protionFoods = foodsWithTotalQuantity.filter((food) => food.unity == 'Portion');;
    setFoodsForCountCards(protionFoods)
  }, [foodsWithTotalQuantity]);

  const getColor = (index) => {
    const colors = ["yellow", "green", "purple", "orange", "red", "blue"];
    const colorIndex = index % colors.length;
    return colors[colorIndex];
}

  return (
    <div className="flex max-sm:flex-col items-start gap-3 sm:gap-5 relative">
      <div className='sm:hidden w-full'>
        <CalendarCard />
      </div>
      <div className='w-full sm:w-1/3'>
        <DailyCard />
      </div>
      {daysIndicatedCount > 0 ? (
        <div className="w-full sm:w-2/3 flex max-sm:flex-col gap-3 sm:gap-5">
          <div className='w-full sm:w-2/3 flex flex-col sm:grid gap-5'>
            <MacroChartCard />
            <div className='max-sm:hidden'>
              <CalendarCard />
            </div>
          </div>
          <div className="w-full sm:w-1/3 grid gap-3 sm:gap-5">
            <MacroRepartitionCard />
            <div className='grid grid-cols-2 gap-3 sm:gap-5'>
              {foodsForCountCards && foodsForCountCards.map((food, index) => (
                <CountCard key={food.id} food={food} color={getColor(index)} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='w-full relative'>
          <div className="w-full sm:w-2/3 flex max-sm:flex-col gap-3 sm:gap-5 opacity-25">
            <div className='w-full sm:w-2/3 flex flex-col sm:grid gap-5'>
              <MacroChartCard />
              <div className='max-sm:hidden'>
                <CalendarCard />
              </div>
            </div>
            <div className="w-full sm:w-1/3 grid gap-3 sm:gap-5">
              <MacroRepartitionCard />
            </div>
          </div>
          <StartMessage />
        </div>
      )}
    </div>
  );
}

function StartMessage() {
  return (
    <div className="text-center my-auto flex flex-col gap-3 bg-primary rounded-3xl p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow">
      <AddButton css={'size-14 mx-auto'} />
      Start adding consumptions to see your stats
    </div>
  )
}