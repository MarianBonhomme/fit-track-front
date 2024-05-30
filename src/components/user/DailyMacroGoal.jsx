import React from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import { useUser } from "../../utils/user/UserContext";
import { getColorByMacro } from "../../utils/global/MacroService";

export default function DailyMacroGoal({ value, macro }) {
  const { themeColors } = useUser();

  return (
    <div className="size-28">
      <CircularProgressbarWithChildren
        value={value}
        maxValue={value}
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
        {value ? (
          <>
            <p className="text-lg font-bold">{value}</p>
            <p className="text-xs">{macro}</p>
          </>
        ) : (
          <span className="text-3xl">-</span>
        )}
      </CircularProgressbarWithChildren>
    </div>
  );
}
