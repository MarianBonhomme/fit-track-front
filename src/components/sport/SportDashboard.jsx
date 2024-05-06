import React, { useEffect, useState } from 'react'
import { useUser } from '../../utils/user/UserContext';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import ProgramsTab from './ProgramsTab';
import CalendarTab from './CalendarTab';
import AddButton from './../global/AddButton';
import TrainingForm from './global/TrainingForm';
import { useSport } from '../../utils/sport/SportContext';
import ProgramForm from './global/ProgramForm';
import ProfileIcon from '../user/ProfileIcon';

export default function SportPage() {  
  const { isDarkMode, toggleDarkMode } = useUser();
  const { isTrainingFormDisplayed, isProgramFormDisplayed, openProgramForm } = useSport();
  const [activeTab, setActiveTab] = useState('calendar');

  return (
    <>
      <div className='p-3 sm:p-5'>
        <div className='flex justify-between items-start'>
          <ul className='flex font-bold'>
            <li className={`${activeTab === 'calendar' ? 'bg-primary' : 'cursor-pointer'} rounded-t-3xl py-4 px-6 sm:py-5 sm:px-10`} onClick={() => setActiveTab('calendar')} >Calendar</li>
            <li className={`${activeTab === 'programs' ? 'bg-primary' : 'cursor-pointer'} rounded-t-3xl py-2 px-6 sm:py-3 sm:px-10 flex gap-5 items-center`} onClick={() => setActiveTab('programs')} >
              Programs
              <AddButton css={'w-8 h-8 p-2'} clicked={openProgramForm} />
            </li>
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