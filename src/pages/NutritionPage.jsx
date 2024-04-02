import { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import MyFoodsDashboard from '../components/nutrition/MyFoodsDashboard';
import { useTheme } from '../utils/ThemeContext';
import StatsDashboard from './../components/nutrition/StatsDashboard';

export default function NutritionPage() { 
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [activeDashboard, setActiveDashboard] = useState('stats');

  return (
    <div className='p-5'>
      <div className='flex justify-between'>
        <ul className='flex font-bold'>
          <li className={`${activeDashboard === 'stats' ? 'bg-primary' : 'cursor-pointer'} rounded-t-3xl py-5 px-10`} onClick={() => setActiveDashboard('stats')} >Statistics</li>
          <li className={`${activeDashboard === 'myfoods' ? 'bg-primary' : 'cursor-pointer'} rounded-t-3xl py-5 px-10`} onClick={() => setActiveDashboard('myfoods')} >My Foods</li>
        </ul>
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={50}
        />
      </div>
      {activeDashboard === 'stats' && (
        <StatsDashboard />
      )}
      {activeDashboard === 'myfoods' && (
        <MyFoodsDashboard />
      )}
    </div>
  );
}
