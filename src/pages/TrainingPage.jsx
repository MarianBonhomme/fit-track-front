import React, { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useUser } from '../utils/user/UserContext';
import TrainingCalendarTab from './TrainingCalendarTab';
import TrainingProgramsTab from './TrainingProgramsTab';
import ProgramModal from '../components/training/global/ProgramModal';
import TrainingModal from '../components/training/global/TrainingModal';
import AddButton from '../components/global/AddButton';
import { useTraining } from '../utils/training/TrainingContext';

export default function TrainingPage() {
  const { isDarkMode, toggleDarkMode } = useUser();
  const { isTrainingModalDisplayed, isProgramModalDisplayed, openProgramModal, trainingLoading } = useTraining();

  const tabs = ['calendar', 'programs'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    !trainingLoading && (
      <>
        <div className='relative'>
          {/* <div className='absolute right-3 top-3 sm:right-5 sm:top-5'>
            <DarkModeSwitch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              size={30}
            />
          </div>
          <ul className='flex font-bold'>
            {tabs.map((tab, index) => (
              <li key={index} className={`${activeTab === tab ? 'bg-primary' : 'cursor-pointer'} text-xs rounded-t-2xl py-3 px-6 flex gap-3 items-center`} onClick={() => setActiveTab(tab)} >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === 'programs' && <AddButton css={'w-4 h-4 p-1'} clicked={openProgramModal} />}
              </li>
            ))}
          </ul> */}
          {activeTab === 'calendar' && (
            <TrainingCalendarTab />
          )}
          {activeTab === 'programs' && (
            <TrainingProgramsTab />
          )}
        </div>
        {isProgramModalDisplayed && (
          <ProgramModal />
        )} 
        {isTrainingModalDisplayed && (
          <TrainingModal />
        )}
    </>
    )
  );
}