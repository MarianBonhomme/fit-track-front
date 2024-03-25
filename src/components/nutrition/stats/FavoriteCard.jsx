import { useEffect, useState } from "react";
import { useNutrition } from "../../../utils/NutritionContext";
import QuantityUnity from "../global/QuantityUnity";
import CardTitle from "../../global/CardTitle";

export default function FavoriteCard() {
  const { foodsWithTotalQuantity } = useNutrition();
  const [favoriteFoods, setFavoriteFoods] = useState([])

  useEffect(() => {
    const top3foods = getTop3Foods();
    setFavoriteFoods(top3foods);
  }, [foodsWithTotalQuantity]);

  const getTop3Foods = () => {
    const filteredFoods = foodsWithTotalQuantity.filter((food) => food.unity !== "Portion" );
    const sortedFoods = [...filteredFoods].sort((a, b) => b.totalQuantity - a.totalQuantity);
    const top3 = sortedFoods.slice(0, 5);
    return top3;
  }

  return (
    <div className="grow bg-white px-5 py-3 shadow-custom rounded-3xl">
      <CardTitle text="Top 5 Food" />
      <div className="h-full flex flex-col justify-evenly p-5">
        {favoriteFoods && favoriteFoods.map((food) => {
          return (
            <div key={food.id} className="text-center">
              <p className="text-xl">{food.name}</p>
              <QuantityUnity quantity={food.totalQuantity} unity={food.unity} quantityStyle={'text-3xl font-bold'} unityStyle={'text-xl'} />
            </div>
          )      
        })}
      </div>
    </div>
  )
}