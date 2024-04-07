import { useEffect, useState } from "react";
import { useNutrition } from "../../../utils/nutrition/NutritionContext";
import CardTitle from "../../global/CardTitle";
import MacroPie from '../global/MacroPie';
import MacroItem from "../global/MacroItem";

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
            <MacroItem macro='kcal' value={dailyAvgMacro.kcal} isRounded={false} showUnity={true} />
            <MacroItem macro='prot' value={dailyAvgMacro.prot} isRounded={false} showUnity={true} />
            <MacroItem macro='fat' value={dailyAvgMacro.fat} isRounded={false} showUnity={true} />
            <MacroItem macro='carb' value={dailyAvgMacro.carb} isRounded={false} showUnity={true} />
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
