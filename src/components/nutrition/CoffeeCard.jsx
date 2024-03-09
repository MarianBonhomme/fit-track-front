import { useNutrition } from "../../utils/NutritionContext";
import CardTitle from "../CardTitle";

export default function CoffeeCard() {
  const { coffeeCount } = useNutrition()

  return (
    <div className="grow bg-dark px-5 py-3 shadow rounded-2xl">
      <CardTitle text='Cups of Coffee' />
      <div className="flex justify-center items-center relative p-5">
        <p className="text-5xl font-bold">{coffeeCount}</p>
        <img src={`src/assets/icons/nutrition/tea-cup-dynamic-premium.png`} alt="Cup of Coffee" className="absolute w-20 right-5"/>
      </div>
    </div>
  )
}