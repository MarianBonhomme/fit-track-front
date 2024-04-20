import React, { useEffect } from 'react'
import { useSport } from '../../utils/sport/SportContext'

export default function SportPage() {
  const { programs } = useSport();

  useEffect(() => {
    console.log(programs);
  }, [programs])

  return (    
    programs && (
      <div className="flex">
        {programs.name}
      </div>
    )
  )
}