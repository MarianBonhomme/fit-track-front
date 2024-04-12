import React, { useEffect, useState } from 'react'
import AvatarItem from './AvatarItem';
import { useProfile } from '../../../utils/profile/ProfileContext';

export default function AvatarColor({ clicked }) {
  const { profileAvatar, profileColor } = useProfile();
  const [style, setStyle] = useState()

  useEffect(() => {
    if (profileColor && profileColor.hexa) {
      setStyle({backgroundColor: profileColor.hexa})
    }
  }, [profileColor])

  return (
    profileAvatar && (
      <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full" style={style} onClick={clicked}>
        <AvatarItem avatar={profileAvatar} size={'xs'} /> 
      </div>
    )
  )
}