import React from 'react'
import { getimagePathFormatted } from '../../../utils/global/ImageService'
import { environment } from '../../../../environment'

export default function AvatarItem({ avatar, size, clicked }) {
  const BASE_URL = environment.API_URL ||'http://localhost:3000'
  return (
    avatar.image && <img 
      src={`${BASE_URL}/${getimagePathFormatted(avatar.image)}`} 
      className={`item-size-${size} cursor-pointer`}
      onClick={clicked}
    />
  )
}