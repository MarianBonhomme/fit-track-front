import React from 'react'
import { useHealth } from '../utils/health/HealthContext'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import ProfileIcon from '../components/profile/ProfileIcon';
import { useUser } from '../utils/user/UserContext';

export default function HealthPage() {
  const { isDarkMode, toggleDarkMode } = useUser();
  const { healthLoading, weightMeasurements } = useHealth();

  return (
    !healthLoading && (
      <div className='p-3 sm:p-5 relative'>        
        <div className='absolute right-3 top-3 sm:right-5 sm:top-5 flex items-center justify-center gap-3'>
          <div>
            <DarkModeSwitch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              size={30}
            />
          </div>
          <ProfileIcon />
        </div>
        {weightMeasurements && weightMeasurements.map((measurement) => (
          measurement.weight_value
        ))}
      </div>
    )
  )
}