import { CategoryScale } from 'chart.js';
import { Chart } from 'chart.js/auto';
import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';

Chart.register(CategoryScale);

export default function MacroPie({displayLabel, macros}) {

  const data = useMemo(() => {
    return {
      labels: displayLabel ? ["Protein", "Carb", "Fat"] : [],
      datasets: [
        {
          data: [macros.prot, macros.carb, macros.fat],
          backgroundColor: ["#37C8A6", "#F5BE40", "#AA6AE6"],
          borderWidth: 0,
          hoverOffset: 10,
        },
      ],
    };
  }, [macros]);

  return (
    <Pie data={data} /> 
  )
}

