import { useEffect, useState } from "react";
import { useNutrition } from "../utils/NutritionContext";
import CountCard from "./../components/nutrition/dashboard/CountCard";
import FavoriteCard from "./../components/nutrition/dashboard/FavoriteCard";
import MacroChart from "./../components/nutrition/dashboard/MacroChart";
import MacroPie from "./../components/nutrition/dashboard/MacroPie";
import CalenderResume from "../components/nutrition/calendar/CalenderResume";

export default function NutritionDashboard() {
  const { foodsWithTotalQuantity } = useNutrition();
  const [foodsForCountCards, setFoodsForCountCards] = useState([]);

  useEffect(() => {
    const foodsCountCard = getPortionFoods();
    setFoodsForCountCards(foodsCountCard)
  }, [foodsWithTotalQuantity]);

  const getPortionFoods = () => {
    const portionFoods = foodsWithTotalQuantity.filter((food) => food.unity == 'Portion');
    return portionFoods.slice(0, 4);
  }

  return (
    <div className="p-5">
      <div className="grid gap-5">
        <CalenderResume />
        <div className="grid grid-cols-2 gap-5">
          <MacroChart />
          <div className="grid gap-5">
            <div className="grid grid-cols-2 gap-5">
              <MacroPie />
              <div className="grid grid-cols-2 gap-5">
                {foodsForCountCards && foodsForCountCards.map((food) => (
                  <CountCard key={food.id} food={food} />
                ))}
              </div>
            </div>
            <FavoriteCard />
          </div>
        </div>
      </div>
    </div>
  );
}
