import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { useEffect, useMemo, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useNutrition } from "../../../utils/NutritionContext";
import CardTitle from "../../CardTitle";

Chart.register(CategoryScale);

export default function MacroPie() {
  const { foodsWithTotalQuantity } = useNutrition();
  const [averageProt, setAverageProt] = useState(0);
  const [averageCarb, setAverageCarb] = useState(0);
  const [averageFat, setAverageFat] = useState(0);

  useEffect(() => {
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

    setAverageProt(totalProt / totalFoods);
    setAverageCarb(totalCarb / totalFoods);
    setAverageFat(totalFat / totalFoods);
  }, [foodsWithTotalQuantity]);

  const data = useMemo(() => {
    return {
      labels: ["Protein", "Carb", "Fat"],
      datasets: [
        {
          data: [averageProt, averageCarb, averageFat],
          backgroundColor: ["#9E2384", "#2B0D84", "#D7964E"],
          borderWidth: 0,
          hoverOffset: 10,
        },
      ],
    };
  }, [averageProt, averageCarb, averageFat]);

  return (
    <div className="flex flex-col items-center bg-dark px-5 py-3 shadow rounded-2xl">
      <CardTitle text="Macro Repartition" />
      <div>
        <Pie data={data} />   
      </div>
    </div>
  );
}
