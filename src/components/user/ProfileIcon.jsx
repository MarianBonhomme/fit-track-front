import React, { useState } from 'react'
import AvatarColor from './avatar/AvatarColor'
import { useProfile } from '../../utils/profile/ProfileContext';

export default function ProfileIcon() {
  const { userProfiles, avatars, colors, switchProfile, profileAvatar, profileColor } = useProfile();
  const [isVisible, setIsVisible] = useState(false);
  
  const getAvatarById = (avatarId) => {
    const avatar = avatars.find(avatar => avatar.id === avatarId);
    return avatar
  }

  const getColorById = (colorId) => {
    const color = colors.find(color => color.id === colorId);
    return color
  }

  const profileClicked = (profile) => {
    switchProfile(profile);
    setIsVisible(false);
  }

  return (
    <div className="relative">
      <AvatarColor avatar={profileAvatar} color={profileColor} clicked={() => setIsVisible(!isVisible)} colorSize={'md'} avatarSize={'xs'} />
      {isVisible && 
        <div className="rounded-2xl bg-primary px-5 absolute top-full right-0 translate-y-3 z-50 shadow">
          {userProfiles && userProfiles.map((profile) => (
            <div key={profile.id} className="flex items-center gap-3 py-3 border-b last:border-b-0 border-lightPrimary cursor-pointer" onClick={() => profileClicked(profile)}>
              <AvatarColor avatar={getAvatarById(profile.avatar_id)} color={getColorById(profile.color_id)} colorSize={'sm'} avatarSize={'xxs'} />
              <p className='font-bold'>{profile.pseudo}</p>
            </div>
          ))}
        </div> 
      }
    </div>
  )
}