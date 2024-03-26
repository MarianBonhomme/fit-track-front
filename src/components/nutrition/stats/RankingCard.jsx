import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useNutrition } from "../../../utils/NutritionContext";
import CardTitle from "../../global/CardTitle";
import FoodImage from "../global/FoodImage";
import QuantityUnity from "../global/QuantityUnity";

export default function RankingCard() {
  const { foodsWithTotalQuantity } = useNutrition();
  const [rankedFoods, setRankedFoods] = useState([])

  useEffect(() => {
    const topfoods = getTopFoods();
    setRankedFoods(topfoods);
  }, [foodsWithTotalQuantity]);

  const getTopFoods = () => {
    const filteredFoods = foodsWithTotalQuantity.filter((food) => food.unity !== "Portion" );
    const sortedFoods = [...filteredFoods].sort((a, b) => b.totalQuantity - a.totalQuantity);
    const topFoods = sortedFoods.slice(0, 7);
    return topFoods;
  }

  const getClassByIndex = (index) => {
    const indexClasses = {
        0: 'text-green',
        1: 'text-blue',
        2: 'text-purple',
    };

    if (index > 2) {
        return 'text-yellow';
    }

    return indexClasses[index] || '';
};

  return (
    <div className="grow flex flex-col gap-2 bg-white px-4 pt-3 shadow-custom rounded-3xl">
      <CardTitle text="Top Food" />
      <div>
        {rankedFoods.map((food, index) => {
          return (
            <div key={food.id} className="py-5 border-t">
              <div className='flex items-center gap-3 px-3 relative'>
                {index === 0 && (
                  <div className="absolute top-0 right-0 rotate-45">
                    <Icon icon="streamline:crown-solid" width="25" height="25" style={{color: '#F5BE40'}}  />
                  </div>
                )}
                <p className={`font-bold ${getClassByIndex(index)}`}>{index + 1}</p>
                <FoodImage image={food.image} size="lg" />
                <div>
                  <p>{food.name}</p>
                  <QuantityUnity quantity={food.totalQuantity} unity={food.unity} quantityStyle={'text-2xl font-bold'} unityStyle={'text-xl'} />
                </div>
              </div>
            </div>
          )      
        })}
      </div>
    </div>
  )
}