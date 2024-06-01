import React from 'react'
import { useTraining } from '../../../utils/training/TrainingContext'
import { Icon } from '@iconify/react/dist/iconify.js';
import CardTitle from '../../global/CardTitle';
import AddButton from '../../global/AddButton';
import PatternIndicator from './PatternIndicator';

export default function SelectProgramModal({ close, programClicked  }) {
  const { openProgramForm, programs } = useTraining();

  return (
    <div className="h-screen w-full bg-opacity-70 bg-black flex justify-center items-center fixed top-0 left-0 z-30">
      <div className='max-sm:h-screen min-w-96 max-sm:w-full sm:rounded-t-lg sm:rounded-b-lg flex flex-col bg-primary relative pt-5 overflow-hidden'>
        <Icon icon="maki:cross" className="absolute top-5 right-5 text-secondary cursor-pointer size-[20px]" onClick={close} />
        <CardTitle text={'Select Program'} />
        <div className='w-full bg-lightPrimary mt-5'>
          <div className='px-3 py-1 flex items-center gap-1 cursor-pointer' onClick={openProgramForm}>
            <AddButton css={'h-10'} />
            <p className='text-gray font-bold'>New Program</p>
          </div>
          {programs && programs.map((program) => {
            return ( !program.is_completed &&
              <div key={program.id} className={`pl-5 p-3 border-t border-primary cursor-pointer relative`} onClick={() => programClicked(program)}>
                <PatternIndicator pattern={program.pattern} />
                <p className='font-bold'>{program.name}</p>
                <p className='text-xs'>{program.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}