import React, { useEffect, useState } from 'react';
import { useNutrition } from '../../utils/NutritionContext';
import CountCard from './stats/CountCard';
import DailyCard from './stats/DailyCard';
import MacroChartCard from './stats/MacroChartCard';
import MacroRepartitionCard from './stats/MacroRepartitionCard';
import RankingCard from './stats/RankingCard';

export default function StatsDashboard() {
  const { foodsWithTotalQuantity } = useNutrition();
  const [foodsForCountCards, setFoodsForCountCards] = useState([]);
  const colors = ["purple", "yellow", "orange", "green"]

  useEffect(() => {
    const foodsCountCard = getPortionFoods();
    setFoodsForCountCards(foodsCountCard)
  }, [foodsWithTotalQuantity]);

  const getPortionFoods = () => {
    const portionFoods = foodsWithTotalQuantity.filter((food) => food.unity == 'Portion');
    return portionFoods.slice(0, 4);
  }

  return (
    <div className="flex items-start gap-5 rounded-tl-none rounded-3xl relative z-10">
      <div className='w-1/3'>
        <DailyCard />
      </div>
      <div className="w-2/3 flex gap-5 sticky top-20">
        <div className='w-3/4 grid gap-5'>
          <MacroChartCard />
          <div className='grid grid-cols-2 gap-5'>
            <MacroRepartitionCard />
            <div className="grid grid-cols-2 gap-5">
              {foodsForCountCards && foodsForCountCards.map((food, index) => (
                <CountCard key={food.id} food={food} color={colors[index]} />
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/4 flex items-stretch">
          <RankingCard />
        </div>
      </div>
    </div>
  );
}