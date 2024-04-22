import React, { useState } from 'react'
import { useUser } from '../../utils/user/UserContext';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import ProgramsTab from './ProgramsTab';
import CreateProgramForm from './programs/CreateProgramForm';

export default function SportPage() {  
  const { isDarkMode, toggleDarkMode } = useUser();
  const [activeTab, setActiveTab] = useState('programs');
  const [isProgramFormDisplayed, setIsProgramFormDisplayed] = useState(false)

  return (
    <>
      <div className='p-5'>
        <div className='flex justify-between items-start'>
          <ul className='flex font-bold'>
            <li className={`${activeTab === 'programs' ? 'bg-primary' : 'cursor-pointer'} rounded-t-3xl py-5 px-10`} onClick={() => setActiveTab('programs')} >Programs</li>
          </ul>
          <div className='bg-blue text-primary px-5 py-2 text-sm font-semibold rounded-full cursor-pointer' onClick={() => setIsProgramFormDisplayed(true)}>Create New Program</div>
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={50}
          />
        </div>
        {activeTab === 'programs' && (
          <ProgramsTab />
        )}
      </div>
      {isProgramFormDisplayed && (
        <CreateProgramForm close={() => setIsProgramFormDisplayed(false)}/>
      )}
    </>
  );
}