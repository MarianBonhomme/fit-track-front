import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useNutrition } from "../../../utils/nutrition/NutritionContext";
import CardTitle from "../../global/CardTitle";
import FoodImage from "../global/FoodImage";
import QuantityUnity from "../global/QuantityUnity";
import { calculateMacros } from "../../../utils/nutrition/NutritionService";
import MacroItem from "../global/MacroItem";
import FlipMove from "react-flip-move";
import { getColorByMacro, macros } from "../../../utils/global/MacroService";

export default function RankingCard() {
  const { foodsWithTotalQuantity } = useNutrition();
  const [foodsWithTotalMacros, setFoodsWithTotalMacros] = useState([]);
  const [rankedFoods, setRankedFoods] = useState([]);
  const [filter, setFilter] = useState('totalQuantity');

  useEffect(() => {
    const foodsWithMacros = getFoodsWithTotalMacros();
    setFoodsWithTotalMacros(foodsWithMacros);
  }, [foodsWithTotalQuantity]);

  useEffect(() => {
    const ranked = getTopFoodsBy(filter);
    setRankedFoods(ranked);
  }, [filter, foodsWithTotalMacros])
  
  const getFoodsWithTotalMacros = () => {
    const foods = foodsWithTotalQuantity.map((food) => {
      const totalMacros = calculateMacros(food, food.totalQuantity);
      return { ...food, ...totalMacros};
    })
    const filteredFoods = foods.filter(food => food.totalQuantity > 0)
    return filteredFoods
  }

  const getTopFoodsBy = (criteria) => {
    const sortedFoods = sortBy(criteria);
    return sortedFoods;
  }

  const sortBy = (criteria) => {
    return [...foodsWithTotalMacros].sort((a, b) => b[criteria] - a[criteria]);
  }

  return (
    <div className="grow flex flex-col gap-2 bg-primary px-4 pt-3 rounded-3xl">
      <CardTitle text="Top Food" />
      <div className="flex justify-between mt-3">
        <p>Sort by : {filter !== "totalQuantity" && filter}</p>
        <Icon icon="maki:cross" width={15} height={15} className={`text-red cursor-pointer transition ${filter !== 'totalQuantity' ? '' : 'opacity-0'}`} onClick={() => setFilter('totalQuantity')} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {macros.map((macro) => (
          <div key={macro} className={`rounded-lg text-center font-bold py-1 ${filter === macro ? 'bg-lightPrimary text-secondary' : `bg-${getColorByMacro(macro)} text-primary cursor-pointer`}`} onClick={() => setFilter(macro)}>{macro}</div>
        ))}
      </div>
      <FlipMove enterAnimation="elevator" leaveAnimation="elevator">
        {rankedFoods.map((food, index) => {
          return (
            <div key={food.id} className="border-t border-lightPrimary first:border-none">
              <div className='flex items-center gap-3 px-3 py-5 relative'>                
                {index === 0 && (                  
                  <p className="absolute top-0 -left-3 -rotate-45 text-2xl">👑</p>
                )}
                <div className={`absolute top-0 right-0 bg-blue px-2 py-1 rounded-b-full`}>
                  <p className="text-xs text-primary font-bold">{index + 1}</p>
                </div>              
                <FoodImage image={food.image} size="md" />
                <div className="w-full">
                  <p>{food.name}</p>
                  <div className="flex items-center justify-between">
                    <QuantityUnity quantity={food.totalQuantity} unity={food.unity} quantityStyle={'font-bold'} unityStyle={'text-xs'} />
                    {filter !== 'totalQuantity' && (
                      <MacroItem macro={filter} value={food[filter]} isRounded={false} css="mr-0" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )      
        })}
      </FlipMove>
    </div>
  )
}