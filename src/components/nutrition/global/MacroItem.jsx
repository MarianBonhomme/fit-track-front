import React, { useEffect, useState } from 'react'

export default function MacroItem({ macro, value, isRounded }) {
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
  }, [])

  return (
    isRounded ? (
      <div className={`w-[50px] h-[50px] text-sm flex flex-col justify-center items-center text-primary rounded-full bg-${color}`} >
        <p className='font-bold'>{Math.round(value)}</p>
        <p>{macro}</p>
      </div>
    ) : (
      <div className={`w-[110px] h-[30px] flex justify-center items-center gap-1 text-primary text-sm rounded-lg bg-${color}`} >
        <p className="font-bold">{Math.round(value)}</p>
        <p>{macro}</p>
      </div>
    )
  )
}