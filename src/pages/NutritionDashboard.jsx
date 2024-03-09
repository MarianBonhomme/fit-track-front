import AddCoffeeButton from "../components/nutrition/coffee/AddCoffeeButton";
import CoffeeDrunkCard from './../components/nutrition/coffee/CoffeeDrunkCard';

export default function NutritionDashboard() {
  return (
    <div className="p-10">
      <CoffeeDrunkCard />
      <AddCoffeeButton />
    </div>
  )
}