import { useEffect, useState } from "react";
import { useNutrition } from "../../utils/NutritionContext";
import CardTitle from "../CardTitle";

export default function FavoriteCard() {
  const { foods } = useNutrition();
  const [favsFood, setFavsFood] = useState([])

  useEffect(() => {
    const sortedFoods = [...foods].sort((a, b) => b.totalQuantity - a.totalQuantity);
    const top5Favs = sortedFoods.slice(0, 5);
    setFavsFood(top5Favs);
  }, [foods]);

  return (
    <div className="grow bg-dark px-5 py-3 shadow rounded-2xl relative">
      <img src="src/assets/icons/global/bookmark-fav-dynamic-premium.png" alt="bookmark" className="absolute left-0 top-0 w-20" />
      <CardTitle text="Top 3 Food" />
      <div className="flex justify-evenly p-5">
        {favsFood.map((food) => {
          return (
            <div key={food.id} className="text-center">
              <p className="text-xl">{food.name}</p>
              <div className="flex items-end">
                <p className="text-5xl font-bold">{food.totalQuantity * food.portion}</p>
                <span className="text-3xl">{food.unity}</span>
              </div>
            </div>
          )      
        })}
      </div>
    </div>
  )
}