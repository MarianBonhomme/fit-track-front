import { useEffect, useState } from "react";
import { useNutrition } from "../../../utils/nutrition/NutritionContext";
import CardTitle from "../../global/CardTitle";
import MacroPie from '../global/MacroPie';
import MacroItem from "../global/MacroItem";
import { macros } from "../../../utils/global/MacroService";
import Card from "../../global/Card";

export default function MacroRepartitionCard() {
  const { foodsWithTotalQuantity, daysIndicatedCount } = useNutrition();
  const [averageMacros, setAverageMacros] = useState({
    prot: 33,
    carb: 33,
    fat: 33,
  });
  const [dailyAvgMacro, setDailyAvgMacros] = useState({
    kcal: 0,
    prot: 0,
    carb: 0,
    fat: 0,
  });

  useEffect(() => {
    if (daysIndicatedCount > 0) {
      const macros = getAverageMacros()
      setAverageMacros(macros);
    }
  }, [foodsWithTotalQuantity]);

  const getAverageMacros = () => {
    let avgKcal = 0;
    let avgProt = 0;
    let avgCarb = 0;
    let avgFat = 0;
    let totalFoods = 0;

    foodsWithTotalQuantity.forEach(food => {
      let quantity = food.totalQuantityValidated;
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
    <Card>
      <CardTitle text="Total Macro Repartition" alignLeft={true} />
      <div className="w-full flex justify-center items-center">
        {dailyAvgMacro && (
          <div className="w-1/3 flex flex-col items-center gap-2">
            <p className="text-xs/3">Daily Average</p>          
            {macros.map((macro) => (
              <MacroItem key={macro} macro={macro} value={dailyAvgMacro[macro]} isRounded={false} showUnity={true} />
            ))}
          </div>
        )}
        {averageMacros && (
          <div className="w-2/3">
            <MacroPie macros={averageMacros} />
          </div>
        )}  
      </div>
    </Card>
  );
}
