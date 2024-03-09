import AddCoffeeButton from "../components/nutrition/AddCoffeeButton";
import CountCard from "../components/nutrition/CountCard";
import MacroChart from "../components/nutrition/MacroChart";
import MacroPie from "../components/nutrition/MacroPie";
import { useNutrition } from "../utils/NutritionContext";

export default function NutritionDashboard() {
  const { coffeeCount } = useNutrition()

  return (
    <div className="flex flex-col gap-y-5 py-5">     
      <div className="w-full flex items-stretch gap-5 px-5">
        <div className="w-3/4 flex">
          <MacroChart />
        </div>
        <div className="w-1/4 flex flex-col justify-between gap-5">
          <div className="flex h-full">
            <MacroPie />
          </div>
          <div className="flex">
            <CountCard count={coffeeCount} title="Cup of Coffee" icon="nutrition/tea-cup-dynamic-premium.png" />
          </div>
        </div>
      </div>
      <div className="w-full flex items-stretch gap-5 px-5">
        <div className="w-1/3 flex">
          <CountCard count={coffeeCount} title="Rice (kg)" />
        </div>
        <div className="w-1/3 flex">
          <CountCard count={coffeeCount} title="Meat (kg)" />
        </div>
        <div className="w-1/3 flex">
          <CountCard count={coffeeCount} title="Oil (L)" />
        </div>
      </div>
      <AddCoffeeButton />
    </div>
  )
}