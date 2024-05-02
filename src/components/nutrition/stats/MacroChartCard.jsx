import { Bar, Line } from "react-chartjs-2";
import CardTitle from "../../global/CardTitle";
import { useUser } from "../../../utils/user/UserContext";
import { useNutrition } from "../../../utils/nutrition/NutritionContext";
import moment from 'moment';
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useProfile } from "../../../utils/profile/ProfileContext";

export default function MacroChartCard() {
  const { themeColors } = useUser();
  const { profile } = useProfile();
  const { currentMonth, incrementMonth, decrementMonth, filterFoodConsumptionsByDate } = useNutrition();
  const [activeMacro, setActiveMacro] = useState('prot');
  const [maxMacros, setMaxMacros] = useState();
  const macros = ['kcal', 'prot', 'fat', 'carb']

  useEffect(() => {
    if (profile) {
      setMaxMacros({
        kcal: profile.dailyKcal,
        prot: profile.dailyProt,
        fat: profile.dailyFat,
        carb: profile.dailyCarb,
      })
    }
  }, [profile])

  const getDailyMacroValue = (dailyFoodConsumptions) => {
    var value = 0;

    dailyFoodConsumptions.forEach((consumption) => {
      value += (consumption.quantity * consumption.food.proportion * consumption.food[activeMacro]) / 100;
    });

    return value;
  };

  const getColorByMacro = (macro) => {
    switch (macro) {
      case 'kcal':
        return 'green'
      case 'prot':
        return 'purple'
      case 'fat':
        return 'orange'
      case 'carb':
        return 'yellow'
      default:
        break;
    }
  }

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
        title: {
          display: true,
          text: 'Quantité (g)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full flex flex-col items-center bg-primary px-5 py-2 rounded-3xl">
      <div className="flex justify-between items-center gap-5">
        <Icon icon="ic:round-chevron-left" width="25" height="25" className="text-dark cursor-pointer" onClick={decrementMonth} />
        <CardTitle text="Daily Macro Consumption" />
        <Icon icon="ic:round-chevron-right" width="25" height="25" className="text-dark cursor-pointer" onClick={incrementMonth} />
      </div>
      <div className="flex items-center justify-evenly my-3 gap-3">
        {macros.map((macro) => (
          <div key={macro} className={`w-[80px] text-xs text-center py-1 font-bold rounded ${activeMacro === macro ? 'bg-lightPrimary text-secondary' : `bg-${getColorByMacro(macro)} text-primary cursor-pointer`}`} onClick={() => setActiveMacro(macro)}>{macro}</div>
        ))}
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

