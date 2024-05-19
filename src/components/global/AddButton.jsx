import { Icon } from '@iconify/react'
import React from 'react'

export default function AddButton({clicked, css}) {
  return (
    <div className={`${css && css} bg-lightPrimary rounded-full flex justify-center items-center cursor-pointer`} onClick={clicked}>
      <Icon icon="fluent-emoji-high-contrast:plus" className='text-gray size-[10px]'/>
    </div>  
  )
}