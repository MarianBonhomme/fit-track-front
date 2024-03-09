import { useNutrition } from '../../../utils/NutritionContext';

export default function AddCoffeeButton() {
  const { incrementCoffeeCount } = useNutrition(); 

  return (
    <button className="absolute bottom-10 right-10 bg-pink px-5 py-3 rounded-3xl" onClick={incrementCoffeeCount}>+ Add Coffee</button>
  )
}