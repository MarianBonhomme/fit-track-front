import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import FinanceDashboard from "./pages/FinanceDashboard";
import NutritionDashboard from "./pages/NutritionDashboard";
import SettingsDashboard from "./pages/SettingsDashboard";
import SportDashboard from "./pages/SportDashboard";
import NutritionAdministration from "./pages/NutritionAdministration";

export default function App() {
  return (
    <Router>
      <div className="h-screen w-[100px] bg-dark fixed top-0 left-0">
        <Sidebar />
      </div>
      <div className="pl-[100px]">
        <Routes>
          <Route path="/" element={<Navigate to="/nutrition" />} />
          <Route path="/nutrition/administration" Component={NutritionAdministration} />
          <Route path="/nutrition" Component={NutritionDashboard} />
          <Route path="/sport" Component={SportDashboard} />
          <Route path="/finance" Component={FinanceDashboard} />
          <Route path="/settings" Component={SettingsDashboard} />
        </Routes>
      </div>
    </Router>
  );
}
