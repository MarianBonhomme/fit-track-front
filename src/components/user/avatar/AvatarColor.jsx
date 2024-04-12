import React from 'react'
import AvatarItem from './AvatarItem';

export default function AvatarColor({ avatar, color, clicked, size }) {
  return (
    avatar && <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full" style={{backgroundColor: `${color?.hexa ? color?.hexa : 'transparent'}`}} onClick={clicked}>
      <AvatarItem avatar={avatar} size={'xs'} /> 
    </div>
  )
}