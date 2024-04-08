import React from 'react'

export default function ColorItem({ color, clicked }) {
  const style = {
    backgroundColor: color.hexa
  }

  return (
    <div className='w-[100px] h-[100px] rounded-full cursor-pointer border border-primary' style={style} onClick={clicked}></div>
  )
}