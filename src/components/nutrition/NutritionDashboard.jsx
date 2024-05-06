import { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import MyFoodsTab from './MyFoodsTab';
import StatsTab from './StatsTab';
import { useUser } from '../../utils/user/UserContext';
import ProfileIcon from '../user/ProfileIcon';

export default function NutritionDashboard() { 
  const { isDarkMode, toggleDarkMode } = useUser();
  const [activeTab, setActiveTab] = useState('stats');

  return (
    <div className='p-3 sm:p-5'>
      <div className='flex justify-between'>
        <ul className='flex font-bold'>
          <li className={`${activeTab === 'stats' ? 'bg-primary' : 'cursor-pointer'} rounded-t-3xl py-4 px-6 sm:py-5 sm:px-10`} onClick={() => setActiveTab('stats')} >Statistics</li>
          <li className={`${activeTab === 'myfoods' ? 'bg-primary' : 'cursor-pointer'} rounded-t-3xl py-4 px-6 sm:py-5 sm:px-10`} onClick={() => setActiveTab('myfoods')} >My Foods</li>
        </ul>
        <div className='sm:flex items-center justify-center gap-5'>
          <div className='max-sm:hidden'>
            <DarkModeSwitch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              size={35}
            />
          </div>
          <ProfileIcon />
        </div>
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
