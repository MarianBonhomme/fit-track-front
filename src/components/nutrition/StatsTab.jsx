import React, { useEffect, useState } from 'react';
import { useNutrition } from '../../utils/nutrition/NutritionContext';
import CountCard from './stats/CountCard';
import DailyCard from './stats/DailyCard';
import MacroChartCard from './stats/MacroChartCard';
import MacroRepartitionCard from './stats/MacroRepartitionCard';
import CalendarCard from './stats/CalendarCard';

export default function StatsTab() {
  const { foodsWithTotalQuantity } = useNutrition();
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
    <div className="flex max-sm:flex-col items-start gap-5 rounded-tl-none rounded-3xl relative">
      <div className='sm:hidden'>
        <CalendarCard />
      </div>
      <div className='w-full sm:w-1/3'>
        <DailyCard />
      </div>
      <div className="w-full sm:w-2/3 flex max-sm:flex-col gap-5 sticky top-20">
        <div className='w-full sm:w-2/3 flex flex-col sm:grid gap-5'>
          <MacroChartCard />
          <div className='max-sm:hidden'>
            <CalendarCard />
          </div>
        </div>
        <div className="w-full sm:w-1/3 grid gap-5">
          <MacroRepartitionCard />
          <div className='grid grid-cols-2 gap-5'>
            {foodsForCountCards && foodsForCountCards.map((food, index) => (
              <CountCard key={food.id} food={food} color={getColor(index)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}