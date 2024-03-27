import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useNutrition } from "../../../utils/NutritionContext";
import CardTitle from "../../global/CardTitle";
import FoodImage from "../global/FoodImage";
import QuantityUnity from "../global/QuantityUnity";
import colors from "../../../assets/colors/colors";

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

  const getColorByIndex = (index) => {
    const indexClasses = {
        1: 'green',
        2: 'green',
        3: 'blue',
        4: 'blue',
    };

    if (index > 4) {
        return 'purple';
    }

    return indexClasses[index] || '';
};

  return (
    <div className="grow flex flex-col gap-2 bg-primary px-4 pt-3 shadow-custom rounded-3xl">
      <CardTitle text="Top Food" />
      <div>
        {rankedFoods.map((food, index) => {
          return (
            <div key={food.id} className="border-t border-lightPrimary">
              <div className='flex items-center gap-3 px-3 py-5 relative'>
                
                {index === 0 ? (
                  <div className="absolute top-1 right-0 rotate-45">
                    <Icon icon="streamline:crown-solid" width="30" height="30" style={{color: colors.yellow}}  />
                  </div>
                ) : (
                  <div className={`absolute top-0 right-0 bg-${getColorByIndex(index)} pl-4 pb-2 pr-2 pt-1 rounded-bl-full`}>
                    <p className=" text-primary font-bold">{index + 1}</p>
                  </div>
                )}                
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