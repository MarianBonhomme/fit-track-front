import React from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import { useUser } from "../../../utils/user/UserContext";
import { getColorByMacro } from "../../../utils/global/MacroService";

export default function DailyMacroProgressBar({ value, maxValue, macro }) {
  const { themeColors } = useUser();
  const percentValue = value / maxValue * 100 

  return (
    <div className="size-16 sm:size-20">
      <CircularProgressbarWithChildren
        value={value}
        maxValue={maxValue}
        strokeWidth={10}
        styles={buildStyles({
          textColor: themeColors.secondary,
          pathColor: themeColors[getColorByMacro(macro)],
          trailColor: themeColors.lightPrimary,
          strokeLinecap: 'round',
          pathTransitionDuration: 0.5,
          pathTransition: 'stroke-dashoffset 0.5s ease-in-out 0s',
          text: {
            dominantBaseline: 'central',
            textAnchor: 'middle',
          },
        })}
      >
        <p className="font-bold">{Math.round(percentValue) }%</p>
      </CircularProgressbarWithChildren>
    </div>
  );
}
