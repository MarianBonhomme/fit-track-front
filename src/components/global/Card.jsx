import React from 'react'

export default function Card({children, clicked, backgroundColor, css, padding}) {
  return (
    <div 
      className={`${css && css} ${backgroundColor ? `bg-${backgroundColor}` : 'bg-primary'} ${padding ? padding : 'px-4 py-3'} rounded-2xl`}
      onClick={clicked}
    >
      {children}
    </div>
  )
}