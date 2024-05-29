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
import { TrainingProvider } from "./utils/training/TrainingContext";
import Sidebar from "./components/global/Sidebar";
import TrainingPage from "./pages/TrainingPage";
import UserPage from './pages/UserPage';
import HealthPage from "./pages/HealthPage";
import { HealthProvider } from "./utils/health/HealthContext";
import Loader from "./components/global/Loader";

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
      <TrainingProvider>  
        <HealthProvider>
          {userLoading ? (
            <Loader />
          ) : (
            <Router>
              {user ? <Sidebar /> : null}
              <div className="sm:pl-[60px] max-sm:pb-[60px]">
                <Routes>
                  <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/user" />} />
                  <Route path="/user" element={user ? <UserPage /> : <Navigate to="/auth" />} />
                  <Route path="/nutrition" element={user ? <NutritionPage /> : <Navigate to="/auth" />} />
                  <Route path="/training" element={user ? <TrainingPage /> : <Navigate to="/auth" />} />
                  <Route path="/health" element={user ? <HealthPage /> : <Navigate to="/auth" />} />
                  <Route path="*" element={<Navigate to="/auth" />} />
                </Routes>
              </div>
            </Router>
          )}          
        </HealthProvider>
      </TrainingProvider>
    </NutritionProvider>
  )
}
