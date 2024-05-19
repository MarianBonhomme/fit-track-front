import React from 'react'

export default function DifficultyScale({difficulty}) {
  return (
    <div className='flex justify-center gap-1 text-xxs font-bold bg-primary rounded-full mx-auto px-2 py-1'>
      <p className={`flex items-center justify-center size-4 rounded-full ${difficulty === 1 ? 'bg-green text-primary' : 'text-green' }`}>1</p>
      <p className={`flex items-center justify-center size-4 rounded-full ${difficulty === 2 ? 'bg-green text-primary' : 'text-green' }`}>2</p>
      <p className={`flex items-center justify-center size-4 rounded-full ${difficulty === 3 ? 'bg-yellow text-primary' : 'text-yellow' }`}>3</p>
      <p className={`flex items-center justify-center size-4 rounded-full ${difficulty === 4 ? 'bg-orange text-primary' : 'text-orange' }`}>4</p>
      <p className={`flex items-center justify-center size-4 rounded-full ${difficulty === 5 ? 'bg-red text-primary' : 'text-red' }`}>5</p>
    </div>
  )
}