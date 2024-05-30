import React from 'react'

export default function ColorItem({ color, clicked, size }) {
  const style = {
    backgroundColor: color.hexa
  }

  return (
    <div className={`item-size-${size} rounded-full cursor-pointer border border-lightPrimary`} style={style} onClick={clicked}></div>
  )
}