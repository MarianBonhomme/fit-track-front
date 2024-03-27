import { CategoryScale } from 'chart.js';
import { Chart } from 'chart.js/auto';
import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import colors from '../../../assets/colors/colors';

Chart.register(CategoryScale);

export default function MacroPie({displayLabel, macros}) {

  const data = useMemo(() => {
    return {
      labels: displayLabel ? ["Protein", "Carb", "Fat"] : [],
      datasets: [
        {
          data: [macros.prot, macros.carb, macros.fat],
          backgroundColor: [colors.purple, colors.yellow, colors.orange],
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

