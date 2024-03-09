import { useNutrition } from "../../../utils/NutritionContext"

export default function CoffeeDrunkCard() {
  const { coffeeCount } = useNutrition()

  return (
    <div className="max-w-fit bg-dark px-10 py-5 shadow rounded-3xl">
      <h3 className="text-xl mb-3">Total Coffee Drank</h3>
      <div class="text-center">
        <p class="text-5xl font-bold">{coffeeCount}</p>
      </div>
    </div>
  )
}