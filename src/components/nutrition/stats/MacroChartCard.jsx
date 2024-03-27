import { Bar } from "react-chartjs-2";
import CardTitle from "../../global/CardTitle";
import colors from "../../../assets/colors/colors";

export default function MacroChartCard() {
  const data = {
    labels: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
    datasets: [
      {
        label: 'Proteines',
        data: [80, 70, 90, 75, 85, 80, 95],
        backgroundColor: colors.purple,
        barPercentage: 0.9,
      },
      {
        label: 'Glucides',
        data: [150, 130, 160, 140, 155, 150, 170],
        backgroundColor: colors.yellow,
        barPercentage: 0.9,
      },
      {
        label: 'Lipides',
        data: [50, 45, 55, 48, 52, 50, 58],
        backgroundColor: colors.orange,
        barPercentage: 0.9,
      },
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
  };

  return (
    <div className="w-full flex flex-col items-center bg-primary px-5 py-2 shadow-custom rounded-3xl">
      <CardTitle text="Daily Consumption" />
      <Bar data={data} options={options} />
    </div>
  );
};

