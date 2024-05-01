import React, { useEffect, useState } from 'react'

export default function MacroItem({ macro, value, isRounded, showUnity, css }) {
  const [color, setColor] = useState('');

  useEffect(() => {
    if (macro === 'kcal') {
      setColor("green")
    } else if (macro === 'prot') {
      setColor("purple")
    } else if (macro === 'fat') {
      setColor("orange")
    } else if (macro === 'carb') {
      setColor("yellow")
    }
  }, [macro])

  return (
    isRounded ? (
      <div className={`size-[40px] text-sm flex flex-col justify-center items-center text-primary rounded-full bg-${color} ${css && css}`} >
        <p className='font-bold text-sm/4'>{Math.round(value)}</p>
        {showUnity && (
          <p className='text-xs/3'>{macro}</p>
        )}
      </div>
    ) : (
      <div className={`w-[110px] h-[30px] flex justify-center items-center gap-1 text-primary text-sm rounded-lg mx-auto bg-${color} ${css && css}`} >
        <p className="font-bold">{Math.round(value)}</p>
        {showUnity && (<p>{macro}</p>)}
      </div>
    )
  )
}