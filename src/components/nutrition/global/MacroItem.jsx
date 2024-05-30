import React from 'react'
import { getColorByMacro } from '../../../utils/global/MacroService';

export default function MacroItem({ macro, value, isRounded, showUnity, css }) {
  return (
    isRounded ? (
      <div className={`${showUnity ? 'size-[40px]' : 'size-[30px]'} text-xs flex flex-col justify-center items-center text-primary rounded-full bg-${getColorByMacro(macro)} ${css && css}`} >
        <p className='font-bold text-xs/3'>
          {value ? (
            Math.round(value)
          ) : (
            '-'
          )}
        </p>
        {showUnity && (
          <p className='text-xs/3'>{macro}</p>
        )}
      </div>
    ) : (
      <div className={`w-[75px] h-[25px] flex justify-center items-center gap-1 text-primary text-xs rounded-lg mx-auto bg-${getColorByMacro(macro)} ${css && css}`} >
        <p className="font-bold">
          {value ? (
            Math.round(value)
          ) : (
            '-'
          )}
        </p>
        {showUnity && (<p>{macro}</p>)}
      </div>
    )
  )
}