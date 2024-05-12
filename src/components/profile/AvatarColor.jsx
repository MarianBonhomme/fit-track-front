import React from 'react'
import AvatarItem from './AvatarItem';

export default function AvatarColor({ avatar, color, clicked, colorSize, avatarSize }) {
  return (
    avatar && <div className={`item-size-${colorSize} flex items-center justify-center rounded-full`} style={{backgroundColor: `${color?.hexa ? color?.hexa : 'transparent'}`}} onClick={clicked}>
      <AvatarItem avatar={avatar} size={avatarSize} /> 
    </div>
  )
}