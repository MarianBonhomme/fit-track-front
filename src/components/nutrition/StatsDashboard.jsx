import React, { useEffect, useState } from 'react';
import { useNutrition } from '../../utils/NutritionContext';
import CalenderResume from './stats/CalenderResume';
import CountCard from './stats/CountCard';
import FavoriteCard from './stats/FavoriteCard';
import MacroChart from './stats/MacroChart';
import MacroPie from './stats/MacroPie';

export default function StatsDashboard() {
  const { foodsWithTotalQuantity } = useNutrition();
  const [foodsForCountCards, setFoodsForCountCards] = useState([]);
  const colors = ["blue", "purple", "yellow", "dark"]

  useEffect(() => {
    const foodsCountCard = getPortionFoods();
    setFoodsForCountCards(foodsCountCard)
  }, [foodsWithTotalQuantity]);

  const getPortionFoods = () => {
    const portionFoods = foodsWithTotalQuantity.filter((food) => food.unity == 'Portion');
    return portionFoods.slice(0, 4);
  }

  return (
    <div className="grid gap-5 rounded-tl-none rounded-3xl relative z-10">
      <CalenderResume />
      <div className="grid grid-cols-2 gap-5">
        <MacroChart />
        <div className="grid gap-5">
          <div className="grid grid-cols-2 gap-5">
            <MacroPie />
            <div className="grid grid-cols-2 gap-5">
              {foodsForCountCards && foodsForCountCards.map((food, index) => (
                <CountCard key={food.id} food={food} color={colors[index]} />
              ))}
            </div>
          </div>
          <FavoriteCard />
        </div>
      </div>
    </div>
  );
}