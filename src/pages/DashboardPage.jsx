import React from "react";
import Sidebar from "../components/global/Sidebar";
import NutritionPage from "../components/nutrition/NutritionDashboard";
import SportDashboard from '../components/sport/SportDashboard';
import { DashboardProvider, useDashboard } from "../utils/global/DashboardContext";
import { NutritionProvider } from "../utils/nutrition/NutritionContext";
import UserDashboard from "../components/user/UserDashboard";
import { useUser } from "../utils/user/UserContext";
import { useNutrition } from "../utils/nutrition/NutritionContext";
import { useProfile } from "../utils/profile/ProfileContext";
import { SportProvider } from "../utils/sport/SportContext";

export default function DashboardPage() {
  const { userLoading } = useUser();
  const { profileLoading } = useProfile();

  return (
    <DashboardProvider>
      {!userLoading && !profileLoading && <DashboardPageContent />}
    </DashboardProvider>
  );
}

function DashboardPageContent() {
  const { activeDashboard } = useDashboard();

  return (
    <>
      <Sidebar />
      <div className="pl-[80px]">
        {activeDashboard === "nutrition" && 
          <NutritionProvider>
            <NutritionContent />
          </NutritionProvider>
        }
        {activeDashboard === "sport" && 
          <SportProvider>
            <SportDashboard />
          </SportProvider>         
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
