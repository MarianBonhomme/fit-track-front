import React from 'react'
import { getimagePathFormatted } from '../../../utils/global/ImageService'

export default function AvatarItem({ avatar, size, clicked }) {
  return (
    <img 
      src={`http://localhost:3000/${getimagePathFormatted(avatar.image)}`} 
      className={`img-size-${size} cursor-pointer`}
      onClick={clicked}
    />
  )
}