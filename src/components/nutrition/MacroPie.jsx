import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(CategoryScale);

export default function MacroPie() {
  const data = {
    labels: ['Protein', 'Carb', 'Fat'],
    datasets: [{
      data: [150, 400, 80],
      backgroundColor: [
        '#9E2384',
        '#2B0D84',
        '#D7964E'
      ],
      borderWidth: 0,
      hoverOffset: 10
    }]
  }

  return (
    <div className="grow flex flex-col bg-dark px-5 py-3 shadow rounded-2xl">
      <h3 className="text-center text-2xl font-bold mb-3">Macro Repartition</h3>
      <div class="grow flex items-center">
        <Pie data={data} />
      </div>
    </div>
  )
}
