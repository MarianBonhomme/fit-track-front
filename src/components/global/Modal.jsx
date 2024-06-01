import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

export default function Modal({children, close, zIndex}) {
  return (
    <div className={`h-screen w-full bg-opacity-70 bg-black flex justify-center items-center fixed top-0 left-0 ${zIndex ? zIndex : 'z-40'}`}>
      <div className={`max-sm:h-screen w-full sm:max-w-xl sm:rounded-3xl flex flex-col gap-5 bg-primary relative py-5`}>
        <Icon icon="maki:cross" className="absolute top-5 right-5 text-secondary cursor-pointer size-[20px]" onClick={close} />
        {children}
      </div>
    </div>
  )
}
