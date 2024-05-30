import { Bar } from "react-chartjs-2";
import CardTitle from "../../global/CardTitle";
import { useUser } from "../../../utils/user/UserContext";
import { useNutrition } from "../../../utils/nutrition/NutritionContext";
import moment from 'moment';
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { getColorByMacro, macros } from "../../../utils/global/MacroService";

export default function MacroChartCard() {
  const { user, themeColors } = useUser();
  const { currentMonth, incrementMonth, decrementMonth, filterFoodConsumptionsByDate } = useNutrition();
  const [activeMacro, setActiveMacro] = useState('prot');
  const [maxMacros, setMaxMacros] = useState();

  useEffect(() => {
    if (user) {
      setMaxMacros({
        kcal: user.dailyKcal,
        prot: user.dailyProt,
        fat: user.dailyFat,
        carb: user.dailyCarb,
      })
    }
  }, [user])

  const getDailyMacroValue = (dailyFoodConsumptions) => {
    var value = 0;

    dailyFoodConsumptions.forEach((consumption) => {
      value += (consumption.quantity * consumption.food.proportion * consumption.food[activeMacro]) / 100;
    });

    return value;
  };

  const data = {
    labels: currentMonth && currentMonth.map((day) => moment(day).format("DD/MM")),
    datasets: [
      {
        label: '',
        data: currentMonth && 
          currentMonth.map((day) => {
            const dailyFoodConsumptions = filterFoodConsumptionsByDate(new Date(day));
            const dailyMacro = getDailyMacroValue(dailyFoodConsumptions);
            return Math.round(dailyMacro);
          }),
        backgroundColor: themeColors[getColorByMacro(activeMacro)],
        barPercentage: 0.9,
      },
      {
        label: '',
        data: currentMonth && maxMacros &&
          currentMonth.map(() => {
            return maxMacros[activeMacro];
          }),
        type: 'line',
        fill: false,
        borderColor: themeColors[getColorByMacro(activeMacro)],
        borderWidth: 3,
        pointRadius: 0,
      }
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: false,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full flex flex-col items-center bg-primary px-4 py-3 rounded-3xl">
      <div className="w-full flex justify-between items-center">
        <CardTitle text="Daily Macro Consumption" />
        <div className="flex gap-1">
          <Icon icon="ic:round-chevron-left" width="25" height="25" className="bg-lightPrimary text-secondary rounded-full cursor-pointer" onClick={decrementMonth} />
          <Icon icon="ic:round-chevron-right" width="25" height="25" className="bg-lightPrimary text-secondary rounded-full cursor-pointer" onClick={incrementMonth} />
      </div>
      </div>
      <div className="flex items-center justify-evenly my-3 gap-3">
        {macros.map((macro) => {
          const color = getColorByMacro(macro) 
          const isActive = activeMacro === macro
          return (
            <div 
              key={macro} 
              className={`w-[50px] text-xs text-center py-1 font-bold rounded-lg ${isActive ? `bg-${color} text-primary` : `bg-light-secondary border-2 border-${color} text-secondary cursor-pointer`}`} 
              onClick={() => setActiveMacro(macro)}
            >
              {macro}
            </div>
          )
        })}
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

