import { Bar } from "react-chartjs-2";
import CardTitle from "../../global/CardTitle";

export default function MacroChart() {
  const data = {
    labels: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
    datasets: [
      {
        label: 'Proteines',
        data: [80, 70, 90, 75, 85, 80, 95],
        backgroundColor: '#37C8A6',
        barPercentage: 0.9,
      },
      {
        label: 'Glucides',
        data: [150, 130, 160, 140, 155, 150, 170],
        backgroundColor: '#F5BE40',
        barPercentage: 0.9,
      },
      {
        label: 'Lipides',
        data: [50, 45, 55, 48, 52, 50, 58],
        backgroundColor: '#AA6AE6',
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
    <div className="w-full flex flex-col items-center bg-white px-5 py-2 shadow-custom rounded-3xl">
      <CardTitle text="Daily Consumption" />
      <Bar data={data} options={options} />
    </div>
  );
};

