import { CategoryScale } from 'chart.js';
import { Chart } from 'chart.js/auto';
import React, { useMemo, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import '../../../index.scss';
import { useTheme } from '../../../utils/ThemeContext';

Chart.register(CategoryScale);

export default function MacroPie({macros}) {
  const { colors } = useTheme();

  const data = useMemo(() => {
    return {
      labels: [],
      datasets: [
        {
          data: [macros.prot, macros.carb, macros.fat],
          backgroundColor: [colors.purple, colors.yellow, colors.orange],
          borderWidth: 0,
          hoverOffset: 10,
        },
      ],
    };
  }, [macros, colors]);

  return (
    <Pie data={data} /> 
  )
}

