import { useEffect, useState } from "react";
import { useNutrition } from "../../../utils/NutritionContext";
import CardTitle from "../../global/CardTitle";
import MacroPie from '../global/MacroPie';
import QuantityUnity from "../global/QuantityUnity";

export default function MacroRepartitionCard() {
  const { foodsWithTotalQuantity } = useNutrition();
  const [averageMacros, setAverageMacros] = useState(null);
  const [totalMacros, setTotalMacros] = useState(null);

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

    const totalMacros = {
      prot: totalProt,
      carb: totalCarb,
      fat: totalFat,
    }

    setTotalMacros(totalMacros)

    const macros = {
      prot: totalProt / totalFoods,
      carb: totalCarb / totalFoods,
      fat: totalFat / totalFoods,
    }

    return macros;
  }

  return (
    <div className="flex flex-col items-center bg-white px-5 py-3 shadow-custom rounded-3xl">
      <CardTitle text="Total Macro Repartition" />
      <div className="w-full flex justify-center items-center">
        {totalMacros && (
          <div className="w-1/3 flex flex-col items-center gap-5">
            <div className='w-[110px] h-[30px] flex justify-center items-center gap-1 bg-purple text-white text-sm rounded-lg'>
              <QuantityUnity quantity={Math.round(totalMacros.prot)} unity={"Gram"} quantityStyle={"font-bold"} /> 
              <p>prot</p>
            </div>
            <div className='w-[110px] h-[30px] flex justify-center items-center gap-1 bg-orange text-white text-sm rounded-lg'>
              <QuantityUnity quantity={Math.round(totalMacros.fat)} unity={"Gram"} quantityStyle={"font-bold"} /> 
              <p>fat</p>
            </div>
            <div className='w-[110px] h-[30px] flex justify-center items-center gap-1 bg-yellow text-white text-sm rounded-lg'>
              <QuantityUnity quantity={Math.round(totalMacros.carb)} unity={"Gram"} quantityStyle={"font-bold"} /> 
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
