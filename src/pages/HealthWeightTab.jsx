import React from 'react'
import DailyWeightMeasurementCard from '../components/health/weight/DailyWeightMeasurementCard'
import WeightCalendarCard from '../components/health/weight/WeightCalendarCard'
import WeightEvolutionChartCard from '../components/health/weight/WeightEvolutionChartCard'

export default function HealthWeightTab() {
  return (
    <div className="flex max-sm:flex-col items-start gap-3 sm:gap-5 rounded-tl-none rounded-3xl relative">
      <div className="w-full sm:w-1/3 flex flex-col gap-3 sm:gap-5">
        <WeightCalendarCard />
        <DailyWeightMeasurementCard />
      </div>
      <div className='w-full sm:w-2/3'>
        <WeightEvolutionChartCard />
      </div>
    </div>
  )
}