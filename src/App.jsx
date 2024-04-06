import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Sidebar from "./components/global/Sidebar";
import NutritionPage from "./pages/NutritionPage";
import SportPage from "./pages/SportPage";
import { useUser } from "./utils/UserContext";
import AuthPage from "./pages/AuthPage";
import { useEffect } from "react";

export default function App() {
  const { user } = useUser();

  useEffect(() => {
    console.log(user);
  }, [user])

  return (
    <Router>
      <div className="h-screen w-[80px] bg-primary fixed top-0 left-0">
        <Sidebar />
      </div>
      <div className="pl-[80px]">
        <Routes>
          <Route 
            path="/auth" 
            element={!user ? <AuthPage /> : <Navigate to="/nutrition" />} 
          />
          <Route
            path="/nutrition"
            element={user ? <NutritionPage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/sport"
            element={user ? <SportPage /> : <Navigate to="/auth" />}
          />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </div>
    </Router>
  );
}
