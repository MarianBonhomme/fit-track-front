import React, { useEffect, useState } from 'react'
import { useHealth } from '../../../utils/health/HealthContext';
import { Icon } from '@iconify/react/dist/iconify.js';
import CardTitle from '../../global/CardTitle';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { formatDate } from '../../../utils/global/DateService';
import { useUser } from '../../../utils/user/UserContext';
import Card from '../../global/Card';

export default function WeightEvolutionChartCard() {
  const { themeColors } = useUser();
  const { weightMeasurements, currentMonth, incrementMonth, decrementMonth, currentWeek, incrementWeek, decrementWeek } = useHealth();
  const [isMonth, setIsMonth] = useState(false);
  const [minWeight, setMinWeight] = useState();
  const [maxWeight, setMaxWeight] = useState();

  useEffect(() => {
    if (weightMeasurements && weightMeasurements.length > 0) {
      const weights = weightMeasurements.map(measurement => measurement.weight_value);
      const min = Math.floor(Math.min(...weights));
      const max = Math.ceil(Math.max(...weights));
      setMinWeight(min);
      setMaxWeight(max);
    }
  }, [weightMeasurements])

  const getDailyWeightMeasurement = (date) => {  
    const measurement = weightMeasurements.find(
      (measurement) => formatDate(measurement.date) === formatDate(date)
    );
    return measurement || null
  }

  const formatMonth = (date) => {
    return moment(date).format("MMMM YYYY");
  };

  const formatWeek = (startDate, endDate) => {
    return `${moment(startDate).format("DD")} - ${moment(endDate).format("DD MMM YYYY")}`;
  };

  const options = {
    scales: {
      x: {
        stacked: false,
      },
      y: {
        beginAtZero: true,
        min: minWeight - 1,
        max: maxWeight + 1,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: isMonth ? formatMonth(currentMonth[0]) :  formatWeek(currentWeek[0], currentWeek[currentWeek.length - 1])
      }
    },
  };

  const data = {
    labels: isMonth ? (currentMonth && currentMonth.map((day) => moment(day).format("DD/MM"))) : (currentWeek && currentWeek.map((day) => moment(day).format("DD/MM"))),
    datasets: [
      {
        fill: true,
        label: '',
        data: isMonth ? 
          currentMonth && currentMonth.map((day) => {
            const dailyWeightMeasurement = getDailyWeightMeasurement(new Date(day));
            return dailyWeightMeasurement ? dailyWeightMeasurement.weight_value : null
          }) 
          :
          currentWeek && currentWeek.map((day) => {
            const dailyWeightMeasurement = getDailyWeightMeasurement(new Date(day));
            return dailyWeightMeasurement ? dailyWeightMeasurement.weight_value : null
          }),
        backgroundColor: isMonth ? themeColors.green : themeColors.purple,
        pointRadius: 0,
        borderWidth: 1,
        spanGaps: true
      },
    ],
  };

  return (
    <Card>
      <div className="w-full flex justify-between items-center">
        <CardTitle text="Weight Evolution" />
        <div className='flex gap-1'>
          <Icon icon="ic:round-chevron-left" width="25" height="25" className="bg-lightPrimary text-secondary rounded-full cursor-pointer" onClick={isMonth ? decrementMonth : decrementWeek} />
          <Icon icon="ic:round-chevron-right" width="25" height="25" className="bg-lightPrimary text-secondary rounded-full cursor-pointer" onClick={isMonth ? incrementMonth : incrementWeek} />
        </div>
      </div>
      <div className="flex items-center justify-center my-3 gap-3">
        <div className={`w-[50px] text-xs text-center py-1 font-bold rounded-lg ${!isMonth ? 'bg-purple text-primary' : `bg-light-secondary border-2 border-purple text-secondary cursor-pointer`}`} onClick={() => setIsMonth(false)}>Week</div>
        <div className={`w-[50px] text-xs text-center py-1 font-bold rounded-lg ${isMonth ? 'bg-green text-primary' : `bg-light-secondary border-2 border-green text-secondary cursor-pointer`}`} onClick={() => setIsMonth(true)}>Month</div>
      </div>
      <Line data={data} options={options} />
    </Card>
  )
}