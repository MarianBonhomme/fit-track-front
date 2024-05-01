import React from 'react'

export default function PatternIndicator({pattern}) {
  const getBackgroundByPattern = () => {
    if (pattern === "push") {
      return 'bg-red'
    } else if (pattern === "pull") {
      return 'bg-green'
    } else if (pattern === "legs") {
      return 'bg-purple'
    } else if (pattern === "abs") {
      return 'bg-yellow'
    } else {
      return 'bg-blue'
    }
  };
  const background = getBackgroundByPattern()

  return (
    <div className={`absolute top-0 left-0 w-2 h-full rounded-full ${background}`}></div>
  )
}