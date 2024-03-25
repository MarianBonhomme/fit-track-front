import { Icon } from '@iconify/react';
import React, { useEffect, useMemo, useState } from 'react';
import FlipMove from 'react-flip-move';
import { getimagePathFormatted } from '../../../utils/ImageService';
import { useNutrition } from '../../../utils/NutritionContext';
import CardTitle from '../../global/CardTitle';
import FoodConsumptionForm from '../calendar/FoodConsumptionForm';
import QuantityUnity from '../global/QuantityUnity';
import { Pie } from 'react-chartjs-2';

export default function TodayCard() {
  const { todayFoodConsumptions, handleDeleteFoodConsumption } = useNutrition();
  const [sortedTodayFoodConsumptions, setSortedTodayFoodConsumptions] = useState();
  const [isFoodConsumptionFormVisible, setIsFoodConsumptionFormVisible] = useState(false);
  const [foodConsumptionToUpdate, setFoodConsumptionToUpdate] = useState(null);
  const [dailyMacros, setDailyMacros] = useState(null);
  const today = new Date();

  useEffect(() => {
    const macros = getDailyMacros();
    setDailyMacros(macros);
    const sortedFoodConsumptions = sortByFavorites();
    setSortedTodayFoodConsumptions(sortedFoodConsumptions);
  }, [todayFoodConsumptions])

  const sortByFavorites = () => {
    const sortedFoods = [...todayFoodConsumptions];

    sortedFoods.sort((a, b) => {
      if (a.food.is_favorite && !b.food.is_favorite) {
        return -1;
      } else if (!a.food.is_favorite && b.food.is_favorite) {
        return 1;
      } else {
        return 0;
      }
    });

    return sortedFoods;
  }

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

  const data = useMemo(() => {
    if (dailyMacros) {
      return {
        labels: [],
        datasets: [
          {
            data: [dailyMacros.prot, dailyMacros.carb, dailyMacros.fat],
            backgroundColor: ["#37C8A6", "#F5BE40", "#AA6AE6"],
            borderWidth: 0,
            hoverOffset: 10,
          },
        ],
      };
    }
  }, [dailyMacros]);

  const openFoodConsumptionForm = (foodConsumption) => {
    setFoodConsumptionToUpdate(foodConsumption);
    setIsFoodConsumptionFormVisible(true);
  }

  const closeFoodConsumptionForm = () => {
    setFoodConsumptionToUpdate(null);
    setIsFoodConsumptionFormVisible(false);
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
            <div className='flex gap-5'>
              <div className='w-[80px] h-[80px]'>
                <Pie data={data} />
              </div>
              <div className="flex justify-center items-center gap-5 text-lg">
                <div>
                  <p><span className="font-bold">{Math.round(dailyMacros.kcal)}</span> kcal</p>
                  <p className='text-green'><span className="font-bold">{Math.round(dailyMacros.prot)}</span> prot</p>
                </div>
                <div>
                  <p className='text-purple'><span className="font-bold">{Math.round(dailyMacros.fat)} fat</span></p>
                  <p className='text-yellow'><span className="font-bold">{Math.round(dailyMacros.carb)} carb</span></p>
                </div>
              </div>
            </div>
          )}
          <div className='flex justify-end cursor-pointer'>
            <Icon icon="solar:calendar-bold" width="50" height="50" style={{color: '#F46F97'}} />
          </div>
        </div>
        <FlipMove enterAnimation="elevator" leaveAnimation="elevator">
          {sortedTodayFoodConsumptions && sortedTodayFoodConsumptions.map((consumption) => (
            <div key={consumption.id} className="py-3 border-t">
              <div className="flex justify-between px-3">
                <div className='flex items-center gap-5 cursor-pointer' onClick={() => openFoodConsumptionForm(consumption)}>
                  <img src={`http://localhost:3000/${getimagePathFormatted(consumption.food.image)}`} className="w-[70px] h-[70px] rounded-full" />
                  <div>
                    <p className='font-bold'>{consumption.food.name}</p>
                    <QuantityUnity quantity={consumption.quantity} unity={consumption.food.unity} />
                  </div>
                </div>
                <div className="flex gap-3 items-center relative">
                  <div className='w-[50px] h-[50px] text-sm flex flex-col justify-center items-center bg-ice rounded-full'>
                    <p className='font-bold'>{Math.round((consumption.quantity * consumption.food.proportion * consumption.food.kcal) / 100 )}</p>
                    <p>kcal</p>
                  </div>
                  <div className='w-[50px] h-[50px] text-sm flex flex-col justify-center items-center bg-green text-white rounded-full'>
                    <p className='font-bold'>{Math.round((consumption.quantity * consumption.food.proportion * consumption.food.prot) / 100 )}</p>
                    <p>prot</p>
                  </div>
                  <div className='w-[50px] h-[50px] text-sm flex flex-col justify-center items-center bg-purple text-white rounded-full'>
                    <p className='font-bold'>{Math.round((consumption.quantity * consumption.food.proportion * consumption.food.fat) / 100 )}</p>
                    <p>fat</p>
                  </div>
                  <div className='w-[50px] h-[50px] text-sm flex flex-col justify-center items-center bg-yellow text-white rounded-full'>
                    <p className='font-bold'>{Math.round((consumption.quantity * consumption.food.proportion * consumption.food.carb) / 100 )}</p>
                    <p>carb</p>
                  </div>
                  <Icon icon="maki:cross" width={15} height={15} style={{color: '#F46F97', cursor: 'pointer'}} onClick={() => handleDeleteFoodConsumption(consumption)} />
                </div>
              </div>
            </div>
          ))}
        </FlipMove>
      </div>
  
      {isFoodConsumptionFormVisible && (
        <FoodConsumptionForm date={today} foodConsumption={foodConsumptionToUpdate} close={closeFoodConsumptionForm} />
      )}
    </>     
  )
}