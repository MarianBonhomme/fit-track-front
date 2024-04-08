import React, { useEffect, useState } from 'react'
import AvatarItem from './AvatarItem';
import { useUser } from '../../../utils/user/UserContext';

export default function AvatarColor({ clicked }) {
  const { userAvatar, userColor } = useUser();
  const [style, setStyle] = useState()

  useEffect(() => {
    if (userColor && userColor.hexa) {
      setStyle({backgroundColor: userColor.hexa})
    }
  }, [userColor])

  return (
    userAvatar && (
      <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full" style={style} onClick={clicked}>
        <AvatarItem avatar={userAvatar} size={'xs'} /> 
      </div>
    )
  )
}