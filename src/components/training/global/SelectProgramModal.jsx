import React from 'react'
import { useTraining } from '../../../utils/training/TrainingContext'
import CardTitle from '../../global/CardTitle';
import AddButton from '../../global/AddButton';
import PatternIndicator from './PatternIndicator';
import Modal from '../../global/Modal';

export default function SelectProgramModal({ close, programClicked  }) {
  const { openProgramModal, programs } = useTraining();

  return (
    <Modal close={close} zIndex={'z-30'}>
      <CardTitle text={'Select Program'} />
      <div className='w-full bg-lightPrimary mt-5'>
        <div className='px-3 py-1 flex items-center gap-1 cursor-pointer' onClick={openProgramModal}>
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
    </Modal>
  )
}