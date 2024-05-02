import { Icon } from '@iconify/react';
import React, { useEffect, useRef, useState } from 'react';
import { useNutrition } from '../../../utils/nutrition/NutritionContext';
import FoodImage from '../global/FoodImage';
import MacroItem from '../global/MacroItem';
import MacroPie from '../global/MacroPie';
import { macros } from '../../../utils/global/MacroService';

function FoodCard({food, editBtnClicked}) {
  const { handleUpdateFood, handleDeleteFood } = useNutrition();
  const [foodMacros, setFoodMacros] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null)

  useEffect(() => {
    const macros = getFoodMacros();
    setFoodMacros(macros);
  }, [food])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
  
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  const getFoodMacros = () => {
    return {
      kcal: food.kcal,
      prot: food.prot,
      fat: food.fat,
      carb: food.carb,
    }
  }

  const addToFavorite = (food) => {
    const foodFavorite = { ...food, is_favorite: 1, is_active: 1, };
    handleUpdateFood(foodFavorite);
    setIsOpen(false);
  }

  const removeFromFavorite = (food) => {
    const foodNotFavorite = { ...food, is_favorite: 0 };
    handleUpdateFood(foodNotFavorite);
    setIsOpen(false);
  }

  const setActive = (food) => {
    const foodActive = { ...food, is_active: 1 };
    handleUpdateFood(foodActive);
    setIsOpen(false);
  }

  const setInactive = (food) => {
    const foodInactive = { ...food, is_active: 0, is_favorite : 0 };
    handleUpdateFood(foodInactive);
    setIsOpen(false);
  }

  const deleteFood = (food) => {
    const confirm = window.confirm("Are your sure to delete this food ? All stats and data associated with will be deleted.")
    if (confirm) {
      handleDeleteFood(food);
    }
  }
  
  return (
    <div ref={ref} className={`bg-primary relative w-[270px] mt-[50px] pt-[50px] rounded-2xl p-4 ${!food.is_active && 'opacity-60'}`}>
      <div className={`absolute -top-5 -right-5 flex flex-col gap-1 bg-primary rounded-2xl p-3 z-50 ${isOpen ? '' : 'hidden'}`}>   
        {food.is_active ? (  
          <>
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => food.is_favorite ? removeFromFavorite(food) : addToFavorite(food)} >
              <Icon icon="solar:star-bold" width={25} height={25} className={`${food.is_favorite ? 'text-yellow' : 'text-gray'} cursor-pointer`} />         
              <p className='font-semibold'>Favoris</p>
            </div>
            <div className="flex items-center gap-1 cursor-pointer" onClick={editBtnClicked} >
              <Icon icon="mage:settings-fill" width={25} height={25} className="text-blue cursor-pointer" />
              <p className='font-semibold'>Edit</p>
            </div>
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => setInactive(food)} >       
              <Icon icon="ic:round-delete" width={25} height={25} className="text-red cursor-pointer"/>
              <p className='font-semibold'>Disable</p>      
            </div>  
          </>
        ) : (
         <>
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => setActive(food)} >
              <Icon icon="mingcute:arrow-up-fill" width={25} height={25} className="text-purple cursor-pointer" /> 
              <p className='font-semibold'>Enable</p> 
            </div>  
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => deleteFood(food)} >
              <Icon icon="ic:round-delete" width={25} height={25} className="text-red cursor-pointer" /> 
              <p className='font-semibold'>Delete</p> 
            </div> 
          </>    
        )}
      </div>
      <div className="absolute -top-[20px] left-0 w-full flex justify-between items-center px-3">
        {foodMacros && (
          <div className='size-10'>
            <MacroPie macros={foodMacros} />
          </div>
        )}
        <FoodImage image={food.image} size="lg" />
        <Icon icon="solar:menu-dots-bold" width="25" height="25" className='text-blue cursor-pointer' onClick={() => setIsOpen(true)} />
      </div>
      <h3 className="text-center font-bold my-3">{food.name}</h3>	
      <div className="grid grid-cols-2 gap-2">
        {macros.map((macro) => (
          <MacroItem key={macro} macro={macro} value={food[macro]} isRounded={false} showUnity={true} />
        ))}
      </div>
    </div>
  )
}

export default FoodCard