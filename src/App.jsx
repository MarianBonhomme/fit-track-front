import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Sidebar from "./components/global/Sidebar";
import NutritionPage from "./pages/NutritionPage";
import SportPage from "./pages/SportPage";

export default function App() {
  return (
    <Router>
      <div className="h-screen w-[80px] bg-primary fixed top-0 left-0">
        <Sidebar />
      </div>
      <div className="pl-[80px]">
        <Routes>
          <Route path="/" element={<Navigate to="/nutrition"/>} />
          <Route path="/nutrition" Component={NutritionPage} />
          <Route path="/sport" Component={SportPage}/>
        </Routes>
      </div>
    </Router>
  );
}
