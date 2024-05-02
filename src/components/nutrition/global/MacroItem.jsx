import React from 'react'
import { getColorByMacro } from '../../../utils/global/MacroService';

export default function MacroItem({ macro, value, isRounded, showUnity, css }) {
  return (
    isRounded ? (
      <div className={`size-[40px] text-sm flex flex-col justify-center items-center text-primary rounded-full bg-${getColorByMacro(macro)} ${css && css}`} >
        <p className='font-bold text-sm/4'>{Math.round(value)}</p>
        {showUnity && (
          <p className='text-xs/3'>{macro}</p>
        )}
      </div>
    ) : (
      <div className={`w-[90px] h-[30px] flex justify-center items-center gap-1 text-primary text-sm rounded-lg mx-auto bg-${getColorByMacro(macro)} ${css && css}`} >
        <p className="font-bold">{Math.round(value)}</p>
        {showUnity && (<p>{macro}</p>)}
      </div>
    )
  )
}