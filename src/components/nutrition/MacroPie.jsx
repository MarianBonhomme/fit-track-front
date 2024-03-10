import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { useEffect, useMemo, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useNutrition } from "../../utils/NutritionContext";
import CardTitle from "./../CardTitle";

Chart.register(CategoryScale);

export default function MacroPie() {
  const { foodConsumptions } = useNutrition();
  const [averageProt, setAverageProt] = useState(0);
  const [averageCarb, setAverageCarb] = useState(0);
  const [averageFat, setAverageFat] = useState(0);

  useEffect(() => {
    setMacroRepartition();
    console.log(foodConsumptions)
  }, [foodConsumptions]);

  const setMacroRepartition = () => {
    if (foodConsumptions && foodConsumptions.length > 0) {
      const totalProt = foodConsumptions.reduce((acc, food) => acc + food.food.prot, 0);
      const totalCarb = foodConsumptions.reduce((acc, food) => acc + food.food.carb, 0);
      const totalFat = foodConsumptions.reduce((acc, food) => acc + food.food.fat, 0);

      const avgProt = totalProt / foodConsumptions.length;
      const avgCarb = totalCarb / foodConsumptions.length;
      const avgFat = totalFat / foodConsumptions.length;

      setAverageProt(avgProt);
      setAverageCarb(avgCarb);
      setAverageFat(avgFat);
    }
  };

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
    <div className="grow flex flex-col bg-dark px-5 py-3 shadow rounded-2xl">
      <CardTitle text="Macro Repartition" />
      {foodConsumptions && (
        <div className="grow flex items-center">
          <Pie data={data} />
        </div>
      )}      
    </div>
  );
}
