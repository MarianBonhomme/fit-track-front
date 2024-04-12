import { CategoryScale } from 'chart.js';
import { Chart } from 'chart.js/auto';
import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import '../../../index.scss';
import { useProfile } from '../../../utils/profile/ProfileContext';

Chart.register(CategoryScale);

export default function MacroPie({macros}) {
  const { themeColors } = useProfile();

  const data = useMemo(() => {
    return {
      labels: [],
      datasets: [
        {
          data: [macros.prot, macros.carb, macros.fat],
          backgroundColor: [themeColors.purple, themeColors.yellow, themeColors.orange],
          borderWidth: 0,
          hoverOffset: 10,
        },
      ],
    };
  }, [macros, themeColors]);

  return (
    <Pie data={data} /> 
  )
}

