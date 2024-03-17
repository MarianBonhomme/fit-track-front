import { useEffect, useState } from "react";
import { useNutrition } from "../../../utils/NutritionContext";
import CardTitle from "../../CardTitle";
import FoodConsumptionForm from "./FoodConsumptionForm";

export default function CalenderCard({ day }) {
  const { foodConsumptions, handleDeleteFoodConsumption } = useNutrition();
  const [foodConsumptionsForDate, setFoodConsumptionsForDate] = useState([]);
  const [isToday, setIsToday] = useState();
  const [isFoodConsumptionFormVisible, setIsFoodConsumptionFormVisible] = useState(false);
  const [foodConsumptionToUpdate, setFoodConsumptionToUpdate] = useState(null);

  useEffect(() => {
    const datedConsumptions = filterFoodConsumptionsByDate();
    setFoodConsumptionsForDate(datedConsumptions);
  }, [foodConsumptions])

  useEffect(() => {
    checkToday(day.date);
  }, [])

  const filterFoodConsumptionsByDate = () => {
    const consumptions = foodConsumptions.filter(consumption => consumption.date == day.date);
    return consumptions
  }

  const checkToday = (date) => {
    const today = new Date();
    const dateToCheck = new Date(date);

    if (dateToCheck.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
        setIsToday(true);
    }
  }

  const openFoodConsumptionForm = (foodConsumption) => {
    setFoodConsumptionToUpdate(foodConsumption);
    setIsFoodConsumptionFormVisible(true);
  }

  const closeFoodConsumptionForm = () => {
    setFoodConsumptionToUpdate(null);
    setIsFoodConsumptionFormVisible(false);
  }

  const deleteFoodConsumption = (foodConsumption) => {
    const confirmed = window.confirm("Etes-vous sûr ?");
    confirmed && handleDeleteFoodConsumption(foodConsumption);
  }

  return (
    <>
      <div className="bg-dark px-4 py-3 shadow rounded-2xl">
        <CardTitle text={isToday ? 'Today' : day.name} />
        <div className="flex items-center gap-2 border-b border-gray-600 mb-2 text-gray-400" onClick={() => openFoodConsumptionForm(null)}>
          <img src="/assets/icons/global/plus-dynamic-premium.png" alt="add" className="w-10" />
          <p>Ajouter</p>
        </div>
        <ul>
          {foodConsumptionsForDate && foodConsumptionsForDate.map((consumption) => (
            <li className="flex justify-between" key={consumption.id}>
              <p>{consumption.food.name}</p>
              <div className="flex gap-3">
                <p>{consumption.quantity} {consumption.food.unity}</p>
                <div className="flex">
                  <img src="/assets/icons/global/setting-dynamic-premium.png" alt="update" className="w-6 pointer" onClick={() => openFoodConsumptionForm(consumption)}/>
                  <img src="/assets/icons/global/trash-can-dynamic-premium.png" alt="delete" className="w-6 pointer" onClick={() => deleteFoodConsumption(consumption)}/>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
  
      {isFoodConsumptionFormVisible && (
        <FoodConsumptionForm date={day.date} foodConsumption={foodConsumptionToUpdate} close={closeFoodConsumptionForm} />
      )}
    </>         
  )
}