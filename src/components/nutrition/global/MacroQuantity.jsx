import React from 'react'

function MacroQuantity({macros}) {
  return (
    <div className="flex justify-center items-center gap-5 text-lg">
      <div>
        <p><span className="font-bold">{Math.round(macros.kcal)}</span> kcal</p>
        <p className='text-green'><span className="font-bold">{Math.round(macros.prot)}</span> prot</p>
      </div>
      <div>
        <p className='text-purple'><span className="font-bold">{Math.round(macros.fat)} fat</span></p>
        <p className='text-yellow'><span className="font-bold">{Math.round(macros.carb)} carb</span></p>
      </div>
    </div>
  )
}

export default MacroQuantity