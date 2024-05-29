import React, { useState } from 'react'
import { useUser } from '../utils/user/UserContext';
import { useNutrition } from '../utils/nutrition/NutritionContext';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import NutritionFoodsTab from './NutritionFoodsTab';
import NutritionDashboardTab from './NutritionDashboardTab';

export default function NutritionPage() {
  const { nutritionLoading } = useNutrition();
  const { isDarkMode, toggleDarkMode } = useUser();

  const tabs = ['dashboard', 'foods'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    !nutritionLoading && (
      <div className='p-3 sm:p-5 relative'>
      <div className='absolute right-3 top-3 sm:right-5 sm:top-5'>
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={30}
        />
      </div>
        <ul className='flex font-bold'>
          {tabs.map((tab, index) => (
            <li key={index} className={`${activeTab === tab ? 'bg-primary' : 'cursor-pointer'} text-xs rounded-t-2xl py-3 px-6`} onClick={() => setActiveTab(tab)} >{tab.charAt(0).toUpperCase() + tab.slice(1)}</li>
          ))}
        </ul>
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