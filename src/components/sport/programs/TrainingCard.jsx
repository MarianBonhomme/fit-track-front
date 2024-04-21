import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { getShortDate } from '../../../utils/global/DateService'

export default function TrainingCard({training}) {
  console.log(training)
  return (
    <div className='w-28 bg-lightPrimary px-4 py-3 rounded-xl relative'>
      <div class="flex justify-between">
        <p class="text-sm mb-2">{getShortDate(new Date(training.date))}</p>
        {training.is_validate ? (
          <Icon icon="icon-park-solid:check-one" width="20" height="20" className='text-green' />
        ) : (
          <Icon icon="ic:round-cancel" width="20" height="20" className='text-red' />
        )}
      </div>
      <p className='text-center text-2xl font-semibold mb-2'>
        {training.weight}
        <span class="text-sm font-normal">kg</span>
      </p>
    </div>
  )
}