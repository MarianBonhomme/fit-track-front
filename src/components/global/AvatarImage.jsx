import React from 'react'
import { getimagePathFormatted } from '../../utils/global/ImageService'

export default function AvatarImage({ image, size, clicked }) {
  return (
    <img 
      src={image ? `http://localhost:3000/${getimagePathFormatted(image)}` : 'src/assets/images/avatar-default.jpg'} 
      className={`img-size-${size} rounded-full`}
      onClick={clicked}
    />
  )
}