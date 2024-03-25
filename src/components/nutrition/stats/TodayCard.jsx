import React, { useEffect, useState } from 'react'
import { useNutrition } from '../../../utils/NutritionContext';
import CardTitle from '../../global/CardTitle';
import { Icon } from '@iconify/react';
import FoodConsumptionForm from '../global/FoodConsumptionForm';
import { getimagePathFormatted } from '../../../utils/ImageService';
import QuantityUnity from '../global/QuantityUnity';

export default function TodayCard() {
  const { todayFoodConsumptions, handleDeleteFoodConsumption } = useNutrition();
  const [isFoodConsumptionFormVisible, setIsFoodConsumptionFormVisible] = useState(false);
  const [foodConsumptionToUpdate, setFoodConsumptionToUpdate] = useState(null);
  const [dailyMacros, setDailyMacros] = useState(null);
  const today = new Date();

  console.log(todayFoodConsumptions)

  useEffect(() => {
    const macros = getDailyMacros();
    setDailyMacros(macros);
  }, [todayFoodConsumptions])

  const getDailyMacros = () => {
    var macros = null;
    var dailyKcal = 0;
    var dailyProt = 0;
    var dailyCarb = 0;
    var dailyFat = 0;

    todayFoodConsumptions.forEach((consumption) => {
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
        <div className="flex justify-between">
          <div className="flex flex-col items-start">
            <CardTitle text='Today' className="justify-self-start"/>
            <div className="flex items-center bg-blue rounded-full gap-1 pl-4 pr-5 py-2 mt-2 mb-5 cursor-pointer text-sm" onClick={() => openFoodConsumptionForm(null)}>
              <Icon icon="fluent-emoji-high-contrast:plus" width={20} height={20} style={{color: '#F5F5F5'}} />
              <p className="text-white font-bold">Add</p>
            </div>
          </div>
          {dailyMacros && (
            <div className="flex justify-center gap-5">
              <div>
                <p>kcal: <span className="font-bold">{Math.round(dailyMacros.kcal)}</span></p>
                <p className='text-green'>prot: <span className="font-bold">{Math.round(dailyMacros.prot)}</span></p>
              </div>
              <div>
                <p className='text-purple'>fat: <span className="font-bold">{Math.round(dailyMacros.fat)}</span></p>
                <p className='text-yellow'>carb: <span className="font-bold">{Math.round(dailyMacros.carb)}</span></p>
              </div>
            </div>
          )}
          <div className='flex justify-end'>
            <Icon icon="solar:calendar-bold" width="50" height="50" style={{color: '#F46F97'}} />
          </div>
        </div>
          {todayFoodConsumptions && todayFoodConsumptions.map((consumption) => (
            <div className="py-3 border-t">
              <div className="grid grid-cols-2 px-3">
                <div className='flex items-center gap-5 cursor-pointer' onClick={() => openFoodConsumptionForm(consumption)}>
                  <img src={`http://localhost:3000/${getimagePathFormatted(consumption.food.image)}`} className="h-[70px] rounded-full" />
                  <div>
                    <h3 className='font-bold'>{consumption.food.name}</h3>
                    <QuantityUnity quantity={consumption.quantity} unity={consumption.food.unity} />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center relative">
                  <div className='w-[50px] h-[50px] text-sm flex flex-col justify-center items-center bg-ice rounded-full'>
                    <p className='font-bold'>{Math.round((consumption.quantity * consumption.food.kcal) / 100 )}</p>
                    <p>kcal</p>
                  </div>
                  <div className='w-[50px] h-[50px] text-sm flex flex-col justify-center items-center bg-green text-white rounded-full'>
                    <p className='font-bold'>{Math.round((consumption.quantity * consumption.food.prot) / 100 )}</p>
                    <p>prot</p>
                  </div>
                  <div className='w-[50px] h-[50px] text-sm flex flex-col justify-center items-center bg-purple text-white rounded-full'>
                    <p className='font-bold'>{Math.round((consumption.quantity * consumption.food.fat) / 100 )}</p>
                    <p>fat</p>
                  </div>
                  <div className='w-[50px] h-[50px] text-sm flex flex-col justify-center items-center bg-yellow text-white rounded-full'>
                    <p className='font-bold'>{Math.round((consumption.quantity * consumption.food.carb) / 100 )}</p>
                    <p>carb</p>
                  </div>
                  <div className='absolute -right-3'><Icon icon="maki:cross" width={15} height={15} style={{color: '#F46F97', cursor: 'pointer'}} onClick={() => deleteFoodConsumption(consumption)} /></div>
                </div>
              </div>
            </div>
          ))}
      </div>
  
      {isFoodConsumptionFormVisible && (
        <FoodConsumptionForm date={today} foodConsumption={foodConsumptionToUpdate} close={closeFoodConsumptionForm} />
      )}
    </>     
  )
}