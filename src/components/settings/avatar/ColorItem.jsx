import React from 'react'

export default function ColorItem({ color, clicked }) {
  const style = {
    backgroundColor: color.hexa
  }

  return (
    <div className='w-10 h-10 rounded-full' style={style} onClick={clicked}></div>
  )
}