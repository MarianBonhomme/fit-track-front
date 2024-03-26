import { useEffect, useState } from "react";
import { useNutrition } from "../../../utils/NutritionContext";
import CardTitle from "../../global/CardTitle";
import MacroPie from './../global/MacroPie';

export default function MacroPieCard() {
  const { foodsWithTotalQuantity } = useNutrition();
  const [averageMacros, setAverageMacros] = useState(null);

  useEffect(() => {
    const macros = getAverageMacros()
    setAverageMacros(macros);
  }, [foodsWithTotalQuantity]);

  const getAverageMacros = () => {
    let totalProt = 0;
    let totalCarb = 0;
    let totalFat = 0;
    let totalFoods = 0;

    foodsWithTotalQuantity.forEach(food => {
      let quantity = food.totalQuantity;
      if (food.unity === "Portion") {
        quantity *= food.proportion;
      }
      totalProt += food.prot * quantity / 100;
      totalCarb += food.carb * quantity / 100;
      totalFat += food.fat * quantity / 100;
      totalFoods++;
    });

    const macros = {
      prot: totalProt / totalFoods,
      carb: totalCarb / totalFoods,
      fat: totalFat / totalFoods,
    }

    return macros;
  }

  return (
    <div className="flex flex-col items-center bg-white px-5 py-3 shadow-custom rounded-3xl">
      <CardTitle text="Macro Repartition" />
      <div>
        {averageMacros && (<MacroPie displayLabel={true} macros={averageMacros} /> )}  
      </div>
    </div>
  );
}
