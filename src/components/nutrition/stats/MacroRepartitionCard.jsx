import { useEffect, useState } from "react";
import { useNutrition } from "../../../utils/NutritionContext";
import CardTitle from "../../global/CardTitle";
import MacroPie from '../global/MacroPie';
import QuantityUnity from "../global/QuantityUnity";

export default function MacroRepartitionCard() {
  const { foodsWithTotalQuantity, daysIndicatedCount } = useNutrition();
  const [averageMacros, setAverageMacros] = useState(null);
  const [dailyAvgMacro, setDailyAvgMacros] = useState(null);

  useEffect(() => {
    const macros = getAverageMacros()
    setAverageMacros(macros);
  }, [foodsWithTotalQuantity]);

  const getAverageMacros = () => {
    let avgKcal = 0;
    let avgProt = 0;
    let avgCarb = 0;
    let avgFat = 0;
    let totalFoods = 0;

    foodsWithTotalQuantity.forEach(food => {
      let quantity = food.totalQuantity;
      avgKcal += (food.kcal * food.proportion * quantity / 100) / daysIndicatedCount;
      avgProt += (food.prot * food.proportion * quantity / 100) / daysIndicatedCount;
      avgCarb += (food.carb * food.proportion * quantity / 100) / daysIndicatedCount;
      avgFat += (food.fat * food.proportion * quantity / 100) / daysIndicatedCount;
      totalFoods++;
    });

    const avgMacros = {
      kcal: avgKcal,
      prot: avgProt,
      carb: avgCarb,
      fat: avgFat,
    }

    setDailyAvgMacros(avgMacros)

    const macros = {
      prot: avgProt / totalFoods,
      carb: avgCarb / totalFoods,
      fat: avgFat / totalFoods,
    }

    return macros;
  }

  return (
    <div className="flex flex-col items-center bg-primary px-5 py-3 shadow-custom rounded-3xl">
      <CardTitle text="Total Macro Repartition" />
      <div className="w-full flex justify-center items-center">
        {dailyAvgMacro && (
          <div className="w-1/3 flex flex-col items-center gap-3">
            <p className="font-bold text-center">Daily Average</p>
            <div className='w-[110px] h-[30px] flex justify-center items-center gap-1 bg-green text-primary text-sm rounded-lg'>
              <p className="font-bold">{Math.round(dailyAvgMacro.kcal)}</p>
              <p>kcal</p>
            </div>
            <div className='w-[110px] h-[30px] flex justify-center items-center gap-1 bg-purple text-primary text-sm rounded-lg'>
              <p className="font-bold">{Math.round(dailyAvgMacro.prot)}</p>
              <p>prot</p>
            </div>
            <div className='w-[110px] h-[30px] flex justify-center items-center gap-1 bg-orange text-primary text-sm rounded-lg'>
              <p className="font-bold">{Math.round(dailyAvgMacro.fat)}</p>
              <p>fat</p>
            </div>
            <div className='w-[110px] h-[30px] flex justify-center items-center gap-1 bg-yellow text-primary text-sm rounded-lg'>
              <p className="font-bold">{Math.round(dailyAvgMacro.carb)}</p>
              <p>carb</p>
            </div>
          </div>
        )}
        {averageMacros && (
          <div className="w-2/3">
            <MacroPie macros={averageMacros} />
          </div>
        )}  
      </div>
    </div>
  );
}
