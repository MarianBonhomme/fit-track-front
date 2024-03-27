import React from 'react'

export default function MacrosQuantities({macros}) {
  return (
    <div className="flex justify-center items-center gap-3 text-lg">
      <div className='w-[50px] h-[50px] text-sm flex flex-col justify-center items-center bg-green text-white rounded-full'>
        <p className='font-bold'>{Math.round(macros.kcal)}</p>
        <p>kcal</p>
      </div>
      <div className='w-[50px] h-[50px] text-sm flex flex-col justify-center items-center bg-purple text-white rounded-full'>
        <p className='font-bold'>{Math.round(macros.prot)}</p>
        <p>prot</p>
      </div>
      <div className='w-[50px] h-[50px] text-sm flex flex-col justify-center items-center bg-orange text-white rounded-full'>
        <p className='font-bold'>{Math.round(macros.fat)}</p>
        <p>fat</p>
      </div>
      <div className='w-[50px] h-[50px] text-sm flex flex-col justify-center items-center bg-yellow text-white rounded-full'>
        <p className='font-bold'>{Math.round(macros.carb)}</p>
        <p>carb</p>
      </div>  
    </div>
  )
}