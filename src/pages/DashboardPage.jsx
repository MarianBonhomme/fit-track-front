import React from "react";
import Sidebar from "../components/global/Sidebar";
import NutritionPage from "../components/nutrition/NutritionDashboard";
import SportDashboard from '../components/sport/SportDashboard';
import { DashboardProvider, useDashboard } from "../utils/global/DashboardContext";
import { NutritionProvider } from "../utils/nutrition/NutritionContext";
import UserDashboard from "../components/user/UserDashboard";
import { useUser } from "../utils/user/UserContext";
import { useNutrition } from "../utils/nutrition/NutritionContext";

export default function DashboardPage() {
  const { userLoading } = useUser();

  return (
    <DashboardProvider>
      {!userLoading && <DashboardPageContent />}
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
            <NutritionContent />
          </NutritionProvider>
        }
        {activeDashboard === "sport" && 
          <SportDashboard />
        }
        {activeDashboard === "user" && 
          <UserDashboard />
        }
      </div>
    </>
  );
}

function NutritionContent() {
  const { nutritionLoading } = useNutrition();

  return (
    !nutritionLoading && <NutritionPage />
  )
}
