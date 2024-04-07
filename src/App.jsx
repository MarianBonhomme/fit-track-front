import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import { UserProvider, useUser } from "./utils/user/UserContext";
import { AvatarProvider } from './utils/avatar/AvatarContext';

export default function App() {
  return (
    <UserProvider>
      <AvatarProvider>
        <AppContent />
      </AvatarProvider>     
    </UserProvider>
  );
}

function AppContent() {
  const { user } = useUser();

  return (
    <Router>
      <Routes>
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={user ? <DashboardPage /> : <Navigate to="/auth" />}
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
}
