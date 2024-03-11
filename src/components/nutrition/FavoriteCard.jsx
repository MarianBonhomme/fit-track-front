import { useEffect, useState } from "react";
import { useNutrition } from "../../utils/NutritionContext";
import CardTitle from "../CardTitle";

export default function FavoriteCard() {
  const { foods, getFoodTotalQuantity } = useNutrition();
  const [favsFood, setFavsFood] = useState([])

  useEffect(() => {
    const sortedFoods = [...foods].sort((a, b) => b.totalQuantity - a.totalQuantity);
    const top3Favs = sortedFoods.slice(0, 3);
    setFavsFood(top3Favs);
  }, [foods]);

  return (
    <div className="grow bg-dark px-5 py-3 shadow rounded-2xl">
      <CardTitle text="Top 3 Food" />
      <div className="flex justify-evenly p-5">
        {favsFood.map((food) => {
          return (
            <div key={food.id} className="text-center">
              <p className="text-xl">{food.name}</p>
              <div className="flex justify-center items-end">
                <p className="text-3xl font-bold">{food.totalQuantity * food.portion}</p>
                <span className="text-xl">{food.unity}</span>
              </div>
            </div>
          )      
        })}
      </div>
    </div>
  )
}