import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NutritionDashboard from './pages/NutritionDashboard';
import Sidebar from "./components/Sidebar";
import SportDashboard from "./pages/SportDashboard";
import FinanceDashboard from "./pages/FinanceDashboard";
import SettingsDashboard from "./pages/SettingsDashboard";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen w-screen bg-black text-white">
        <div className="h-screen w-[150px] bg-dark absolute top-0 left-0">
          <Sidebar />
        </div>
        <div className="pl-[150px]">
          <Routes>
            <Route path='/' element={<Navigate to="/nutrition"/>} />
            <Route path="/nutrition" Component={NutritionDashboard} />
            <Route path="/sport" Component={SportDashboard} />
            <Route path="/finance" Component={FinanceDashboard} />
            <Route path="/settings" Component={SettingsDashboard} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
