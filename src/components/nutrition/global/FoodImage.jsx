import React from 'react'
import { getimagePathFormatted } from '../../../utils/global/ImageService'

export default function FoodImage({ image, size }) {
  return (
    <img 
      src={image ? `http://localhost:3000/${getimagePathFormatted(image)}` : 'src/assets/images/not-found.jpg'} 
      className={`item-size-${size} rounded-full`}
    />
  )
}