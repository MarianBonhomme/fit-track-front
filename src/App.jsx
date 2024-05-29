import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { UserProvider, useUser } from "./utils/user/UserContext";
import NutritionPage from "./pages/NutritionPage";
import { NutritionProvider } from "./utils/nutrition/NutritionContext";
import { SportProvider } from "./utils/sport/SportContext";
import Sidebar from "./components/global/Sidebar";
import SportPage from "./pages/SportPage";
import UserPage from './pages/UserPage';
import HealthPage from "./pages/HealthPage";
import { HealthProvider } from "./utils/health/HealthContext";

export default function App() {
  return (
    <UserProvider>    
      <AppContent />       
    </UserProvider>
  );
}

function AppContent() {
  const { user, userLoading } = useUser();

  return (
    <NutritionProvider>
      <SportProvider>  
        <HealthProvider>
          {userLoading ? (
            <div className="w-screen h-screen flex items-center justify-center">
              <img src="/assets/images/loader.svg" alt="loader" />
            </div>
          ) : (
            <Router>
              {user && <Sidebar />}
              <div className="sm:pl-[60px] max-sm:pb-[60px]">
                <Routes>
                  <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/user" />} />
                  <Route path="/user" element={user ? <UserPage /> : <Navigate to="/auth" />} />
                  <Route path="/nutrition" element={user ? <NutritionPage /> : <Navigate to="/auth" />} />
                  <Route path="/sport" element={user ? <SportPage /> : <Navigate to="/auth" />} />
                  <Route path="/health" element={user ? <HealthPage /> : <Navigate to="/auth" />} />
                  <Route path="*" element={<Navigate to="/auth" />} />
                </Routes>
              </div>
            </Router>
          )}          
        </HealthProvider>
      </SportProvider>
    </NutritionProvider>
  )
}
