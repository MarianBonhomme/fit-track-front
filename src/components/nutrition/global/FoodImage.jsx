import React from 'react'
import { getimagePathFormatted } from '../../../utils/global/ImageService'
import { environment } from '../../../../environment'

export default function FoodImage({ image, size }) {
  const BASE_URL = environment.API_URL ||'http://localhost:3000'
  
  return (
    <img 
      src={image ? `${BASE_URL}/${getimagePathFormatted(image)}` : '/assets/images/not-found.jpg'} 
      className={`item-size-${size} rounded-full`}
      alt="Food"
    />
  )
}