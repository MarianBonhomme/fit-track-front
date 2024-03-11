import { useNutrition } from "../utils/NutritionContext";
import CountCard from './../components/nutrition/dashboard/CountCard';
import FavoriteCard from './../components/nutrition/dashboard/FavoriteCard';
import MacroChart from './../components/nutrition/dashboard/MacroChart';
import MacroPie from './../components/nutrition/dashboard/MacroPie';

export default function NutritionDashboard() {
  const { nutritionLoading } = useNutrition();

  return (
    <div className="p-5">
      {!nutritionLoading && (
        <div className="grid grid-cols-2 gap-5">
          <MacroChart />
          <div className="grid gap-5">
            <div className="grid grid-cols-2 gap-5">
              <MacroPie />
              <div className="grid grid-cols-2 gap-5">
                <CountCard foodId={1} />
                <CountCard foodId={2} />
                <CountCard foodId={6} />
                <CountCard foodId={11} />
              </div>
            </div>
            <FavoriteCard />
          </div>
        </div>
      )}
    </div>
  );
}
