import React from 'react'
import { getimagePathFormatted } from '../../../utils/global/ImageService';

export default function AvatarCard({ avatar }) {
  return (
    <div className='flex flex-col items-center gap-5 bg-primary shadow-custom rounded-2xl p-4'>
      <img 
        src={avatar.image ? `http://localhost:3000/${getimagePathFormatted(avatar.image)}` : 'src/assets/images/not-found.jpg'} 
        className={`rounded-full`}
      />
      <p>{avatar.name}</p>
    </div>
  )
}