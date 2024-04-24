import React from 'react'
import { getShortDate } from '../../../utils/global/DateService'
import { Icon } from '@iconify/react/dist/iconify.js'

export default function TrainingCard({training, edit}) {
  return (
    <div className="bg-lightPrimary min-w-40 min-h-40 p-2 flex flex-col items-center justify-evenly rounded-xl shadow text-secondary relative">
      <Icon icon="icon-park-outline:hamburger-button" width={20} height={20} className="absolute top-3 left-3 text-gray cursor-pointer" onClick={edit} />
      <p className='text-xs px-2 rounded-full bg-blue text-primary font-semibold'>{getShortDate(new Date(training.date))}</p>
      <div className='flex flex-col items-center'>
        <p className='text-3xl font-bold'>
          {training.weight > 0 ? (
            <>
              {training.weight}
              <span className="text-sm font-normal">kg</span>
            </>
          ) : (
            training.comment
          )}
        </p>
        {training.is_validate ? (
          <Icon icon="icon-park-solid:check-one" width="25" height="25" className="text-green" />
        ) : (
          <Icon icon="material-symbols:cancel-rounded" width="25" height="25" className='text-red' />
        )}
      </div>
      <div className='flex justify-center gap-1 text-sm font-bold bg-primary rounded-full mx-auto px-2 py-1'>
        <p className={`flex items-center justify-center h-5 w-5 rounded-full ${training.difficulty === 1 ? 'bg-green text-primary' : 'text-green' }`}>1</p>
        <p className={`flex items-center justify-center h-5 w-5 rounded-full ${training.difficulty === 2 ? 'bg-green text-primary' : 'text-green' }`}>2</p>
        <p className={`flex items-center justify-center h-5 w-5 rounded-full ${training.difficulty === 3 ? 'bg-yellow text-primary' : 'text-yellow' }`}>3</p>
        <p className={`flex items-center justify-center h-5 w-5 rounded-full ${training.difficulty === 4 ? 'bg-orange text-primary' : 'text-orange' }`}>4</p>
        <p className={`flex items-center justify-center h-5 w-5 rounded-full ${training.difficulty === 5 ? 'bg-red text-primary' : 'text-red' }`}>5</p>
      </div>
    </div>
  )
}