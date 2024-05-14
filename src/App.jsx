import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { UserProvider, useUser } from "./utils/user/UserContext";
import { ProfileProvider, useProfile } from "./utils/profile/ProfileContext";
import NutritionPage from "./pages/NutritionPage";
import { NutritionProvider } from "./utils/nutrition/NutritionContext";
import { SportProvider } from "./utils/sport/SportContext";
import Sidebar from "./components/global/Sidebar";
import SportPage from "./pages/SportPage";
import ProfilePage from './pages/ProfilePage';

export default function App() {
  return (
    <UserProvider>
      <ProfileProvider>
        <AppContent />
      </ProfileProvider>
    </UserProvider>
  );
}

function AppContent() {
  const { user } = useUser();
  const { profileLoading } = useProfile();

  return (
    <Router>
      {user && <Sidebar />}
      <div className="sm:pl-[80px] max-sm pb-[70px]">
        <Routes>
          <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/nutrition" />} />
          <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/auth" />} />
          <Route path="*" element={<Navigate to="/auth" />} />
          <Route path="/nutrition" element={
            user && !profileLoading ? 
              <NutritionProvider>
                <NutritionPage />
              </NutritionProvider> 
                : 
              <Navigate to="/auth" />
            } 
          />
          <Route path="/sport" element={
            user && !profileLoading ? 
              <SportProvider>
                <SportPage />
              </SportProvider> 
                : 
              <Navigate to="/auth" />
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}
