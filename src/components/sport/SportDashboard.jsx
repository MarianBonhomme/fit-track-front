import React, { useState } from 'react'
import { useUser } from '../../utils/user/UserContext';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import ProgramsTab from './ProgramsTab';

export default function SportPage() {  
  const { isDarkMode, toggleDarkMode } = useUser();
  const [activeTab, setActiveTab] = useState('programs');

  return (
    <div className='p-5'>
      <div className='flex justify-between'>
        <ul className='flex font-bold'>
          <li className={`${activeTab === 'programs' ? 'bg-primary' : 'cursor-pointer'} rounded-t-3xl py-5 px-10`} onClick={() => setActiveTab('programs')} >Programs</li>
        </ul>
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
  );
}