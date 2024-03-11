import { useEffect, useState } from "react";
import { useNutrition } from "../../../utils/NutritionContext";
import CardTitle from "../../CardTitle";

export default function CountCard({ foodId }) {
  const { foodConsumptions, getFoodTotalQuantity } = useNutrition();
  const [food, setFood] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foodWithDetails = await getFoodTotalQuantity(foodId);
        setFood(foodWithDetails);
      } catch (error) {
        console.error("Error loading data", error);
      }
    };

    fetchData();
  }, [foodConsumptions]);

  return (
    <div className="flex flex-col items-center bg-dark px-5 py-3 shadow rounded-2xl">
      {food && (
        <>
          <CardTitle text={food.food.name} />
          <div className="grow flex justify-center items-center">
            <p className="text-5xl font-bold">{food.totalQuantity}</p>
          </div>
        </>
      )}
    </div>
  );
}
