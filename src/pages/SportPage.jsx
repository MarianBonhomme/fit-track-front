import React, { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import ProfileIcon from '../components/profile/ProfileIcon';
import { useUser } from '../utils/user/UserContext';
import CalendarTab from './SportCalendarTab';
import ProgramsTab from './SportProgramsTab';
import ProgramForm from '../components/sport/global/ProgramForm';
import TrainingForm from '../components/sport/global/TrainingForm';
import AddButton from '../components/global/AddButton';
import { useSport } from '../utils/sport/SportContext';

export default function SportPage() {
  const { isDarkMode, toggleDarkMode } = useUser();
  const { isTrainingFormDisplayed, isProgramFormDisplayed, openProgramForm } = useSport();

  const tabs = ['programs', 'calendar'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <>
      <div className='p-3 sm:p-5'>
        <div className='flex justify-between items-start'>
          <ul className='flex font-bold'>
            {tabs.map((tab, index) => (
              <li key={index} className={`${activeTab === tab ? 'bg-primary' : 'cursor-pointer'} rounded-t-3xl py-4 px-6 sm:py-5 sm:px-10 flex gap-5 items-center`} onClick={() => setActiveTab(tab)} >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === 'programs' && <AddButton css={'w-8 h-8 p-2'} clicked={openProgramForm} />}
              </li>
            ))}
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
        {activeTab === 'calendar' && (
          <CalendarTab />
        )}
        {activeTab === 'programs' && (
          <ProgramsTab />
        )}
      </div>
      {isProgramFormDisplayed && (
        <ProgramForm />
      )} 
      {isTrainingFormDisplayed && (
        <TrainingForm />
      )}
    </>
  );
}