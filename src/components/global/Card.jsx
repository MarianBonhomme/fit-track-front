import React from 'react'

export default function Card({children, clicked, backgroundColor, css}) {
  return (
    <div 
      className={`${css && css} ${backgroundColor ? `bg-${backgroundColor}` : 'bg-primary'} px-4 py-3 rounded-2xl`}
      onClick={clicked}
    >
      {children}
    </div>
  )
}