import React from "react";
import Sidebar from "../components/global/Sidebar";
import NutritionPage from "../components/nutrition/NutritionDashboard";
import SportDashboard from '../components/sport/SportDashboard';
import { DashboardProvider, useDashboard } from "../utils/global/DashboardContext";
import { NutritionProvider } from "../utils/nutrition/NutritionContext";
import SettingsDashboard from "../components/settings/SettingsDashboard";

export default function DashboardPage() {
  return (
    <DashboardProvider>
      <DashboardPageContent />
    </DashboardProvider>
  );
}

function DashboardPageContent() {
  const { activeDashboard } = useDashboard();

  return (
    <>
      <div className="h-screen w-[80px] bg-primary fixed top-0 left-0">
        <Sidebar />
      </div>
      <div className="pl-[80px]">
        {activeDashboard === "nutrition" && 
          <NutritionProvider>
            <NutritionPage />
          </NutritionProvider>
        }
        {activeDashboard === "sport" && 
          <SportDashboard />
        }
        {activeDashboard === "settings" && 
          <SettingsDashboard />
        }
      </div>
    </>
  );
}
