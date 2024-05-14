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
      <AppContent />   
    </UserProvider>
  );
}

function AppContent() {
  const { user, userLoading } = useUser();

  return (
    !userLoading && user && user.id &&
      <ProfileProvider>  
       <AppContentContent />
      </ProfileProvider>
  )
}

function AppContentContent() {
  const { user } = useUser();
  const { profile, profileLoading } = useProfile();

  return (
    !profileLoading && profile && profile.id &&
      <NutritionProvider>
        <SportProvider>  
          <Router>
            {user && <Sidebar />}
            <div className="sm:pl-[80px] max-sm pb-[70px]">
              <Routes>
                <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/profile" />} />
                <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/auth" />} />
                <Route path="/nutrition" element={user ? <NutritionPage /> : <Navigate to="/auth" />} />
                <Route path="/sport" element={user ? <SportPage /> : <Navigate to="/auth" />} />
                <Route path="*" element={<Navigate to="/auth" />} />
              </Routes>
            </div>
          </Router>
        </SportProvider>
      </NutritionProvider>
  )
}
