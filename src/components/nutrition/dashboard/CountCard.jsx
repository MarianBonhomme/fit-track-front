import { useNutrition } from "../../../utils/nutrition/NutritionContext";
import Card from "../../global/Card";
import CardTitle from "../../global/CardTitle";
import { Icon } from '@iconify/react';

export default function CountCard({ food, color }) {
  const { currentDate, dailyFoodConsumptions, handleAddFoodConsumption, handleUpdateFoodConsumption, handleDeleteFoodConsumption } = useNutrition();

  const incrementFoodConsumptionInDaily = () => {
    if (isFoodInDailyFoodConsumptions()) {
      const targetConsumption = dailyFoodConsumptions.find(consumption => consumption.food.id === food.id);
      targetConsumption.quantity += 1;
      handleUpdateFoodConsumption(targetConsumption)
    } else {
      const newConsumption = {
        id: null,
        food_id: food.id,
        quantity: 1,
        date: currentDate
      };
      handleAddFoodConsumption(newConsumption)
    }
  }

  const decrementFoodConsumptionInDaily = () => {
    if (isFoodInDailyFoodConsumptions()) {
      const targetConsumption = dailyFoodConsumptions.find(consumption => consumption.food.id === food.id);
      if (targetConsumption.quantity > 1) {
        targetConsumption.quantity -= 1;
        handleUpdateFoodConsumption(targetConsumption);
      } else {
        handleDeleteFoodConsumption(targetConsumption)
      }
    }
  }
  
  const isFoodInDailyFoodConsumptions = () => {
    return dailyFoodConsumptions.some(consumption => consumption.food.id === food.id);
  }

  return (
    <Card backgroundColor={color} css={'min-h-32 flex flex-col items-center text-primary'}>
      <CardTitle text={food.name} />
      <div className="grow w-full flex items-center">
        <div className="w-1/3 flex justify-center">
          {isFoodInDailyFoodConsumptions() && (
            <Icon icon="ic:round-minus" width={25} height={25} className="text-primary cursor-pointer" onClick={decrementFoodConsumptionInDaily} />
          )}
        </div>
        <p className="w-1/3 text-center text-2xl font-bold">{food.totalQuantity}</p>
        <div className="w-1/3 flex justify-center">
          <Icon icon="ic:round-plus" width={25} height={25} className="text-primary cursor-pointer" onClick={incrementFoodConsumptionInDaily} />
        </div>
      </div>  
    </Card>
  );
}
