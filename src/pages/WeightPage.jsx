import React from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import WeightCalendarCard from "../components/health/weight/WeightCalendarCard";
import WeightEvolutionChartCard from "../components/health/weight/WeightEvolutionChartCard";
import { useUser } from "../utils/user/UserContext";
import { useHealth } from "../utils/health/HealthContext";

export default function WeightPage() {
  const { isDarkMode, toggleDarkMode } = useUser();
  const { healthLoading } = useHealth();

  return (
    !healthLoading && (
      <div className="relative grid gap-3 p-3 max-sm:pb-[60px] sm:gap-5 sm:p-5">
        <div className="absolute right-3 top-3 sm:right-5 sm:top-5">
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={30}
          />
        </div>
        <p className="text-xl font-bold">Weight</p>
        <WeightCalendarCard />
        <WeightEvolutionChartCard />
      </div>
    )
  );
}
