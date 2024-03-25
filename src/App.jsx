import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Sidebar from "./components/global/Sidebar";
import NutritionPage from "./pages/NutritionPage";

export default function App() {
  return (
    <Router>
      <div className="h-screen w-[80px] bg-white fixed top-0 left-0">
        <Sidebar />
      </div>
      <div className="pl-[80px]">
        <Routes>
          <Route path="/" element={<Navigate to="/nutrition" />} />
          <Route path="/nutrition" Component={NutritionPage} />
        </Routes>
      </div>
    </Router>
  );
}
