import React, { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useUser } from '../utils/user/UserContext';
import TrainingCalendarTab from './TrainingCalendarTab';
import TrainingProgramsTab from './TrainingProgramsTab';
import ProgramForm from '../components/training/global/ProgramForm';
import TrainingForm from '../components/training/global/TrainingForm';
import AddButton from '../components/global/AddButton';
import { useTraining } from '../utils/training/TrainingContext';

export default function TrainingPage() {
  const { isDarkMode, toggleDarkMode } = useUser();
  const { isTrainingFormDisplayed, isProgramFormDisplayed, openProgramForm, trainingLoading } = useTraining();

  const tabs = ['calendar', 'programs'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    !trainingLoading && (
      <>
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
              <li key={index} className={`${activeTab === tab ? 'bg-primary' : 'cursor-pointer'} text-xs rounded-t-2xl py-3 px-6 flex gap-3 items-center`} onClick={() => setActiveTab(tab)} >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === 'programs' && <AddButton css={'w-6 h-6 p-2'} clicked={openProgramForm} />}
              </li>
            ))}
          </ul>
          {activeTab === 'calendar' && (
            <TrainingCalendarTab />
          )}
          {activeTab === 'programs' && (
            <TrainingProgramsTab />
          )}
        </div>
        {isProgramFormDisplayed && (
          <ProgramForm />
        )} 
        {isTrainingFormDisplayed && (
          <TrainingForm />
        )}
    </>
    )
  );
}