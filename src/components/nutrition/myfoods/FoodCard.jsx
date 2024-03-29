import { Icon } from '@iconify/react';
import React, { useEffect, useRef, useState } from 'react';
import { useNutrition } from '../../../utils/NutritionContext';
import FoodImage from '../global/FoodImage';
import MacroItem from '../global/MacroItem';

function FoodCard({food, editBtnClicked}) {
  const { handleUpdateFood } = useNutrition();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null)

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
  
  return (
    <div ref={ref} className={`bg-primary relative w-[300px] mt-[50px] pt-[80px] flex flex-col justify-between text-center shadow-custom rounded-2xl p-4 ${!food.is_active && 'opacity-60'}`}>
      <div className={`absolute -top-5 -right-5 bg-primary rounded-2xl p-3 z-50 shadow-custom ${isOpen ? '' : 'hidden'}`}>
        <div className="flex items-center gap-1 cursor-pointer" onClick={editBtnClicked} >
          <Icon icon="mage:settings-fill" width={30} height={30} className="text-blue cursor-pointer" />
          <p className='font-bold'>Edit</p>
        </div>
        {food.is_active ? (  
          <div className="flex items-center gap-1 cursor-pointer" onClick={() => setInactive(food)} >       
            <Icon icon="ic:round-delete" width={30} height={30} className="text-red cursor-pointer"/>
            <p className='font-bold'>Disable</p>      
          </div>  
        ) : (
          <div className="flex items-center gap-1 cursor-pointer" onClick={() => setActive(food)} >
            <Icon icon="mingcute:arrow-up-fill" width={30} height={30} className="text-purple cursor-pointer" /> 
            <p className='font-bold'>Enable</p> 
          </div>    
        )}
      </div>
      <div className="absolute -top-[20px] left-0 w-full flex justify-between items-center px-3">
        {food.is_favorite ? (         
          <Icon icon="solar:star-bold" width={30} height={30} className="text-yellow cursor-pointer" onClick={() => removeFromFavorite(food)} />         
        ) : (
          <Icon icon="solar:star-bold" width={30} height={30} className="text-gray cursor-pointer" onClick={() => addToFavorite(food)} />         
        )}
        <FoodImage image={food.image} size="xl" />
        <Icon icon="solar:menu-dots-bold" width="30" height="30" className='text-blue cursor-pointer' onClick={() => setIsOpen(true)} />
      </div>
      <h3 className="text-xl font-bold my-3">{food.name}</h3>	
      <div className="flex justify-center items-center gap-3 text-lg">
        <MacroItem macro={'kcal'} value={food.kcal} isRounded={true} />
        <MacroItem macro={'prot'} value={food.prot} isRounded={true} />
        <MacroItem macro={'fat'} value={food.fat} isRounded={true} />
        <MacroItem macro={'carb'} value={food.carb} isRounded={true} />
      </div>
    </div>
  )
}

export default FoodCard