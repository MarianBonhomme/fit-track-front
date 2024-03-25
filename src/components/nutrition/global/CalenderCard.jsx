import { useEffect, useState } from "react";
import { useNutrition } from "../../../utils/NutritionContext";
import CardTitle from "../../global/CardTitle";
import FoodConsumptionForm from "./FoodConsumptionForm";
import QuantityUnity from "./QuantityUnity";
import { Icon } from '@iconify/react';

export default function CalenderCard({ day }) {
  const { foodConsumptions, handleDeleteFoodConsumption } = useNutrition();
  const [foodConsumptionsForDate, setFoodConsumptionsForDate] = useState([]);
  const [isToday, setIsToday] = useState();
  const [isFoodConsumptionFormVisible, setIsFoodConsumptionFormVisible] = useState(false);
  const [foodConsumptionToUpdate, setFoodConsumptionToUpdate] = useState(null);
  const [dailyMacros, setDailyMacros] = useState(null);

  useEffect(() => {
    const datedConsumptions = filterFoodConsumptionsByDate();
    setFoodConsumptionsForDate(datedConsumptions);
  }, [foodConsumptions])

  useEffect(() => {
    const macros = getDailyMacros();
    setDailyMacros(macros);
  }, [foodConsumptionsForDate])

  useEffect(() => {
    checkToday(day.date);
  }, [])

  const filterFoodConsumptionsByDate = () => {
    const consumptions = foodConsumptions.filter(consumption => consumption.date == day.date);
    return consumptions
  }

  const getDailyMacros = () => {
    var macros = null;
    var dailyKcal = 0;
    var dailyProt = 0;
    var dailyCarb = 0;
    var dailyFat = 0;

    foodConsumptionsForDate.forEach((consumption) => {
      dailyKcal += (consumption.quantity * consumption.food.proportion * consumption.food.kcal) / 100; 
      dailyProt += (consumption.quantity * consumption.food.proportion * consumption.food.prot) / 100; 
      dailyCarb += (consumption.quantity * consumption.food.proportion * consumption.food.carb) / 100; 
      dailyFat += (consumption.quantity * consumption.food.proportion * consumption.food.fat) / 100; 
    })

    macros = {
      kcal: dailyKcal,
      prot: dailyProt,
      carb: dailyCarb,
      fat: dailyFat,
    };

    return macros;
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
      <div className="bg-white px-4 py-3 shadow-custom rounded-3xl rounded-tl-none relative">
        <div className="grid grid-cols-2">
          <div className="flex flex-col items-start">
            <CardTitle text={isToday ? 'Today' : day.name} className="justify-self-start"/>
            <div className="flex items-center bg-purple rounded-xl gap-1 pl-2 pr-4 mt-1 mb-3 cursor-pointer" onClick={() => openFoodConsumptionForm(null)}>
              <Icon icon="fluent-emoji-high-contrast:plus" width={20} height={20} style={{color: '#F5F5F5'}} />
              <p className="text-white font-bold">Add</p>
            </div>
          </div>
          <div className="flex justify-end gap-5">
            {dailyMacros && (
              <>
                <div>
                  <p>kcal: <span className="font-bold">{Math.round(dailyMacros.kcal)}</span></p>
                  <p>prot: <span className="font-bold">{Math.round(dailyMacros.prot)}</span></p>
                </div>
                <div>
                  <p>fat: <span className="font-bold">{Math.round(dailyMacros.fat)}</span></p>
                  <p >carb: <span className="font-bold">{Math.round(dailyMacros.carb)}</span></p>
                </div>
              </>
            )}
          </div>
        </div>
        <ul>
          {foodConsumptionsForDate && foodConsumptionsForDate.map((consumption) => (
            <li className="flex justify-between" key={consumption.id}>
              <div className="w-3/4 flex justify-between" onClick={() => openFoodConsumptionForm(consumption)}>
                <p>{consumption.food.name}</p>
                <QuantityUnity quantity={consumption.quantity} unity={consumption.food.unity} />
              </div>
              <Icon icon="maki:cross" width={25} height={25} style={{color: '#F46F97', cursor: 'pointer'}} onClick={() => deleteFoodConsumption(consumption)} />
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