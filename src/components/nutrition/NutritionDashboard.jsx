import { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useTheme } from '../../utils/global/ThemeContext';
import MyFoodsTab from './MyFoodsTab';
import StatsTab from './StatsTab';

export default function NutritionDashboard() { 
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('stats');

  return (
    <div className='p-5'>
      <div className='flex justify-between'>
        <ul className='flex font-bold'>
          <li className={`${activeTab === 'stats' ? 'bg-primary' : 'cursor-pointer'} rounded-t-3xl py-5 px-10`} onClick={() => setActiveTab('stats')} >Statistics</li>
          <li className={`${activeTab === 'myfoods' ? 'bg-primary' : 'cursor-pointer'} rounded-t-3xl py-5 px-10`} onClick={() => setActiveTab('myfoods')} >My Foods</li>
        </ul>
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={50}
        />
      </div>
      {activeTab === 'stats' && (
        <StatsTab />
      )}
      {activeTab === 'myfoods' && (
        <MyFoodsTab />
      )}
    </div>
  );
}
