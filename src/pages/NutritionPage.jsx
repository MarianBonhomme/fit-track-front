import { useState } from 'react';
import CalendarDashboard from '../components/nutrition/CalendarDashboard';
import MyFoodsDashboard from '../components/nutrition/MyFoodsDashboard';
import { useTheme } from '../utils/ThemeContext';
import StatsDashboard from './../components/nutrition/StatsDashboard';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export default function NutritionPage() { 
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [active, setActive] = useState('stats')

  return (
    <div className='p-5'>
      <div className='flex justify-between'>
        <ul className='flex relative z-20 font-bold'>
          <li className={`${active === 'stats' ? 'bg-primary' : 'cursor-pointer'} rounded-t-3xl py-5 px-10`} onClick={() => setActive('stats')} >Statistiques</li>
          <li className={`${active === 'myfoods' ? 'bg-primary' : 'cursor-pointer'} rounded-t-3xl py-5 px-10`} onClick={() => setActive('myfoods')} >Mes aliments</li>
          <li className={`${active === 'calendar' ? 'bg-primary' : 'cursor-pointer'} rounded-t-3xl py-5 px-10`} onClick={() => setActive('calendar')} >Calendrier</li>
        </ul>
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={50}
        />
      </div>
      {active === 'stats' && (
        <StatsDashboard />
      )}
      {active === 'myfoods' && (
        <MyFoodsDashboard />
      )}
      {active === 'calendar' && (
        <CalendarDashboard />
      )}
    </div>
  );
}
