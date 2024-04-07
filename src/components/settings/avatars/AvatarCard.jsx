import React from 'react'
import AvatarImage from './AvatarImage';

export default function AvatarCard({ avatar }) {
  return (
    <div className='w-[200px] h-[200px] flex flex-col items-center justify-center gap-3 bg-primary shadow-custom rounded-full p-4'>
      <AvatarImage image={avatar.image} size={'xl'} />
      <p className='text-2xl font-bold'>{avatar.name}</p>
    </div>
  )
}