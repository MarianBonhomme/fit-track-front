import { Icon } from '@iconify/react'
import React from 'react'

export default function AddButton({clicked, css}) {
  return (
    <div className={`${css && css} bg-lightPrimary rounded-2xl flex justify-center items-center cursor-pointer`} onClick={clicked}>
      <Icon icon="fluent-emoji-high-contrast:plus" width="25" height="25" className='text-gray'/>
    </div>  
  )
}