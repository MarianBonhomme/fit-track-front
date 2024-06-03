import React from 'react'
import WeightCalendarCard from '../components/health/weight/WeightCalendarCard'
import WeightEvolutionChartCard from '../components/health/weight/WeightEvolutionChartCard'

export default function HealthWeightTab() {
  return (
    <div className="flex max-sm:flex-col items-start gap-3 sm:gap-5 relative">
      <div className="w-full sm:w-1/2 flex flex-col gap-3 sm:gap-5">
        <WeightCalendarCard />
      </div>
      <div className='w-full sm:w-1/2'>
        <WeightEvolutionChartCard />
      </div>
    </div>
  )
}