import AddCoffeeButton from "../components/nutrition/AddCoffeeButton";
import AddFoodButton from "../components/nutrition/AddFoodButton";
import CoffeeCard from "../components/nutrition/CoffeeCard";
import FavoriteCard from "../components/nutrition/FavoriteCard";
import MacroChart from "../components/nutrition/MacroChart";
import MacroPie from "../components/nutrition/MacroPie";

export default function NutritionDashboard() {
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
            <CoffeeCard />
          </div>
        </div>
      </div>
      {/* <div className="w-full flex items-stretch gap-5 px-5">
        <div className="w-2/12 flex">
          <AddFoodButton />
        </div>
        <div className="w-10/12 flex">
          <FavoriteCard />
        </div>
      </div> */}
      <AddCoffeeButton />
    </div>
  )
}