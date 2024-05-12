import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { UserProvider, useUser } from "./utils/user/UserContext";
import { ProfileProvider } from "./utils/profile/ProfileContext";
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
        <NutritionProvider>
          <SportProvider>
            <AppContent />
          </SportProvider>
        </NutritionProvider>
      </ProfileProvider>
    </UserProvider>
  );
}

function AppContent() {
  const { user } = useUser();

  return (
    <Router>
      <Sidebar />
      <div className="sm:pl-[80px] max-sm pb-[70px]">
        <Routes>
          <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/nutrition" />} />
          <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/auth" />} />
          <Route path="/nutrition" element={user ? <NutritionPage /> : <Navigate to="/auth" />} />
          <Route path="/sport" element={user ? <SportPage /> : <Navigate to="/auth" />} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </div>
    </Router>
  );
}
