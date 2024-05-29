import React, { useState } from 'react'
import { useHealth } from '../utils/health/HealthContext'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useUser } from '../utils/user/UserContext';
import HealthWeightTab from './HealthWeightTab';
import HealthSleepTab from './HealthSleepTab';

export default function HealthPage() {
  const { isDarkMode, toggleDarkMode } = useUser();
  const { healthLoading } = useHealth();
  
  const tabs = ['weight', 'sleep'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    !healthLoading && (
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
        {activeTab === 'weight' && (
          <HealthWeightTab />
        )}
        {activeTab === 'sleep' && (
          <HealthSleepTab />
        )}
      </div>
    )
  )
}