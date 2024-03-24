import { useState } from 'react';
import CalendarDashboard from '../components/nutrition/CalendarDashboard';
import FoodsDashboard from './../components/nutrition/FoodsDashboard';
import StatsDashboard from './../components/nutrition/StatsDashboard';

export default function NutritionPage() { 
  const [active, setActive] = useState('stats')

  return (
    <div className='p-5'>
      <ul className='flex relative z-20 font-bold'>
        <li className={`${active === 'stats' ? 'bg-white' : 'cursor-pointer'} rounded-t-3xl py-5 px-10`} onClick={() => setActive('stats')} >Statistiques</li>
        <li className={`${active === 'admin' ? 'bg-white' : 'cursor-pointer'} rounded-t-3xl py-5 px-10`} onClick={() => setActive('admin')} >Mes aliments</li>
        <li className={`${active === 'calendar' ? 'bg-white' : 'cursor-pointer'} rounded-t-3xl py-5 px-10`} onClick={() => setActive('calendar')} >Calendrier</li>
      </ul>
      {active === 'stats' && (
        <StatsDashboard />
      )}
      {active === 'admin' && (
        <FoodsDashboard />
      )}
      {active === 'calendar' && (
        <CalendarDashboard />
      )}
    </div>
  );
}
