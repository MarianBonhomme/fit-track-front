import React from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import { useUser } from "../../../utils/user/UserContext";

export default function DailyMacroProgressBar({ value, maxValue, macro }) {
  const { isDarkMode } = useUser();
  const percentValue = value / maxValue * 100 

  let barColor;
  switch (macro) {
    case 'kcal':
      barColor = isDarkMode ? '#8CE0D1' : '#42C697';
      break;
    case 'prot':
      barColor = isDarkMode ? '#A283C6' : '#906FB4';
      break;
    case 'carb':
      barColor = isDarkMode ? '#FEECA0' : '#F6D963';
      break;
    case 'fat':
      barColor = isDarkMode ? '#FBCAA1' : '#F4B570';
      break;
    default:
      barColor = '#000000';
  }

  return (
    <div className="size-20">
      <CircularProgressbarWithChildren
        value={value}
        maxValue={maxValue}
        strokeWidth={10}
        styles={buildStyles({
          textColor: isDarkMode ? '#F5F5F5' : '#202124',
          pathColor: barColor,
          trailColor: isDarkMode ? '#0E1013' : '#E2E5ED',
          strokeLinecap: 'round',
          pathTransitionDuration: 0.5,
          pathTransition: 'stroke-dashoffset 0.5s ease-in-out 0s',
          text: { // Styles de texte
            fontSize: '16px', // Taille de police
            dominantBaseline: 'central', // Alignement vertical du texte au centre
            textAnchor: 'middle', // Alignement horizontal du texte au centre
          },
        })}
      >
        <p className="font-bold">{Math.round(percentValue) }%</p>
      </CircularProgressbarWithChildren>
    </div>
  );
}
