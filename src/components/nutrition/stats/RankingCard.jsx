import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useNutrition } from "../../../utils/NutritionContext";
import CardTitle from "../../global/CardTitle";
import FoodImage from "../global/FoodImage";
import QuantityUnity from "../global/QuantityUnity";
import { calculateMacros } from "../../../utils/NutritionService";
import MacroItem from "../global/MacroItem";

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
    return foods
  }

  const getTopFoodsBy = (criteria) => {
    const sortedFoods = sortBy(criteria);
    const topFoods = getTop(sortedFoods);
    return topFoods;
  }

  const sortBy = (criteria) => {
    return [...foodsWithTotalMacros].sort((a, b) => b[criteria] - a[criteria]);
  }

  const getTop = (foods) => {
    return foods.slice(0, 7);
  } 

  return (
    <div className="grow flex flex-col gap-2 bg-primary px-4 pt-3 shadow-custom rounded-3xl">
      <CardTitle text="Top Food" />
      <div className="flex justify-between mt-3">
        <p>Sort by : {filter !== "totalQuantity" && filter}</p>
        <Icon icon="maki:cross" width={20} height={20} className={`text-red cursor-pointer transition ${filter !== 'totalQuantity' ? '' : 'opacity-0'}`} onClick={() => setFilter('totalQuantity')} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className={`rounded-lg text-center font-bold py-1 ${filter !== 'kcal' ? 'bg-lightPrimary text-secondary cursor-pointer' : 'bg-green text-primary'}`} onClick={() => setFilter('kcal')}>Kcal</div>
        <div className={`rounded-lg text-center font-bold py-1 ${filter !== 'fat' ? 'bg-lightPrimary text-secondary cursor-pointer' : 'bg-orange text-primary'}`} onClick={() => setFilter('fat')}>Fat</div>
        <div className={`rounded-lg text-center font-bold py-1 ${filter !== 'prot' ? 'bg-lightPrimary text-secondary cursor-pointer' : 'bg-purple text-primary'}`} onClick={() => setFilter('prot')}>Prot</div>
        <div className={`rounded-lg text-center font-bold py-1 ${filter !== 'carb' ? 'bg-lightPrimary text-secondary cursor-pointer' : 'bg-yellow text-primary'}`} onClick={() => setFilter('carb')}>Carb</div>
      </div>
      <div>
        {rankedFoods.map((food, index) => {
          return (
            <div key={food.id} className="border-t border-lightPrimary first:border-none">
              <div className='flex items-center gap-3 px-3 py-5 relative'>                
                {index === 0 && (
                  <div className="absolute top-0 -left-3 -rotate-45">
                    <Icon icon="streamline:crown-solid" width="25" height="25" className="text-blue" />
                  </div>
                )}
                <div className={`absolute top-0 right-0 bg-blue pl-2 pb-1 pr-1 rounded-bl-full`}>
                  <p className="text-xs text-primary font-bold">{index + 1}</p>
                </div>              
                <FoodImage image={food.image} size="md" />
                <div className="w-full">
                  <p>{food.name}</p>
                  <div className="flex items-center justify-between gap-3">
                    <QuantityUnity quantity={food.totalQuantity} unity={food.unity} quantityStyle={'text-2xl font-bold'} unityStyle={'text-sm'} />
                    {filter !== 'totalQuantity' && (
                      <MacroItem macro={filter} value={food[filter]} isRounded={false} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )      
        })}
      </div>
    </div>
  )
}