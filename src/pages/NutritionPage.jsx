import React, { useState } from 'react'
import { useUser } from '../utils/user/UserContext';
import { useNutrition } from '../utils/nutrition/NutritionContext';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import ProfileIcon from '../components/profile/ProfileIcon';
import NutritionFoodsTab from './NutritionFoodsTab';
import NutritionDashboardTab from './NutritionDashboardTab';

export default function NutritionPage() {
  const { nutritionLoading } = useNutrition();
  const { isDarkMode, toggleDarkMode } = useUser();

  const tabs = ['dashboard', 'foods'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    !nutritionLoading && (
      <div className='p-3 sm:p-5'>
        <div className='flex justify-between'>
          <ul className='flex font-bold'>
            {tabs.map((tab, index) => (
              <li key={index} className={`${activeTab === tab ? 'bg-primary' : 'cursor-pointer'} text-xs rounded-t-2xl py-3 px-6`} onClick={() => setActiveTab(tab)} >{tab.charAt(0).toUpperCase() + tab.slice(1)}</li>
            ))}
          </ul>
          <div className='sm:flex items-center justify-center gap-3'>
            <div className='max-sm:hidden'>
              <DarkModeSwitch
                checked={isDarkMode}
                onChange={toggleDarkMode}
                size={30}
              />
            </div>
            <ProfileIcon />
          </div>
        </div>
        {activeTab === 'dashboard' && (
          <NutritionDashboardTab />
        )}
        {activeTab === 'foods' && (
          <NutritionFoodsTab />
        )}
      </div>
    )
  )
}