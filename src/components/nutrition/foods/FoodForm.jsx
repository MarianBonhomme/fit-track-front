import { Icon } from '@iconify/react';
import { useEffect, useState } from "react";
import { useNutrition } from "../../../utils/nutrition/NutritionContext";
import { getColorByMacro } from '../../../utils/global/MacroService';

export default function FoodForm({ food, close }) {
  const { handleAddFood, handleUpdateFood, handleDeleteFood } = useNutrition();
  const [isProportionInputVisible, setIsProportionInputVisible] = useState(food?.unity === 'Portion')
  const [isFormValid, setIsFormValid] = useState(false);
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    id: food && food.id,
    name: '',
    kcal: 0,
    prot: 0,
    carb: 0,
    fat: 0,
    unity: 'Gram',
    proportion: 1,
    is_favorite: false,
  })

  useEffect(() => {
    if (food) {
      setFormData(food)
    }
  }, [food])

  useEffect(() => {
    const { name, kcal, prot, carb, fat, proportion } = formData;
    const isValid = name !== '' && kcal !== null && prot !== null && carb !== null && fat !== null && proportion > 0;
    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (e) => {
	  const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    checkSelectInput(name, value);
	};

  const checkSelectInput = (name, value) => {
    if (name === 'unity') { 
      if (value === "Portion") {
        setIsProportionInputVisible(true);
      } else {
        setIsProportionInputVisible(false);
      }
    }
  };

  const toggleIsFavorite = () => {
    setFormData({
      ...formData,
      is_favorite: !formData.is_favorite,
    });
  };
  
  const handleSubmit = (e) => {
	  e.preventDefault();

    const newFormData = new FormData();
    if (file) {
      newFormData.append('image', file);
    } else {
      newFormData.append('image', formData.image);
    }
    newFormData.append('id', formData.id);
    newFormData.append('name', formData.name);
    newFormData.append('kcal', formData.kcal);
    newFormData.append('prot', formData.prot);
    newFormData.append('carb', formData.carb);
    newFormData.append('fat', formData.fat);
    newFormData.append('unity', formData.unity);
    newFormData.append('proportion', formData.proportion);
    newFormData.append('is_favorite', formData.is_favorite);

    if (food) {
      handleUpdateFood(newFormData);
    } else {
      handleAddFood(newFormData)
    }
	  close();
	};

  const deleteFood = () => {
    const confirm = window.confirm("Are your sure to delete this food ? All stats and data associated with will be deleted.")
    if (confirm) {
      handleDeleteFood(food);
    }
  }

  return (
    <div className='h-screen w-full fixed top-0 left-0 flex bg-opacity-70 bg-black justify-center items-center sm:items-start p-5 sm:pt-20 z-50'>
      <form onSubmit={handleSubmit} className='w-full max-w-xl flex flex-col items-center bg-primary px-3 py-5 sm:p-10 relative rounded-2xl'>
        <Icon icon="maki:cross" className="absolute top-5 right-5 sm:right-10 sm:top-10 text-red cursor-pointer size-[20px] sm:size-[25px]" onClick={close} />
        <Icon icon="solar:star-bold" className={`absolute top-5 left-5 sm:right-10 sm:top-10 size-[20px] sm:size-[25px] text-${formData.is_favorite ? 'yellow' : 'gray'} cursor-pointer`} onClick={toggleIsFavorite} />  
        <h3 className='font-bold mb-5 sm:mb-10'>{food ? 'Update Food' : 'Create Food'}</h3>
        <div className='w-full flex flex-col items-center relative gap-5'>     
          <div className='flex flex-col relative'>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              name="image"
						  onChange={e => setFile(e.target.files[0])}
              accept="image/*"
            />
          </div>     
          <div className='flex flex-col relative'>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
						  onChange={handleChange}
              className='max-w-100 px-3 py-1 rounded-md bg-lightPrimary text-secondary font-bold'
              required
            />
          </div>
          <div className='flex flex-col items-center'>
            <div className="grid grid-cols-2 sm:flex gap-3 sm:gap-5">
              <div className='flex flex-col'>
                <label htmlFor="kcal">Kcals</label>
                <input
                  type="number"
                  id="kcal"
                  name="kcal"
                  value={formData.kcal}
                  onChange={handleChange}
                  className={`max-w-20 px-3 py-1 rounded-md bg-${getColorByMacro('kcal')} text-primary font-bold`}
                  required
                  min="0"
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="prot">Proteins</label>
                <input
                  type="number"
                  id="prot"
                  name="prot"
                  value={formData.prot}
                  onChange={handleChange}
                  className={`max-w-20 px-3 py-1 rounded-md bg-${getColorByMacro('prot')} text-primary font-bold`}
                  required
                  min="0"
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="fat">Fats</label>
                <input
                  type="number"
                  id="fat"
                  name="fat"
                  value={formData.fat}
                  onChange={handleChange}
                  className={`max-w-20 px-3 py-1 rounded-md bg-${getColorByMacro('fat')} text-primary font-bold`}
                  required
                  min="0"
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="carb">Carbs</label>
                <input
                  type="number"
                  id="carb"
                  name="carb"
                  value={formData.carb}
                  onChange={handleChange}
                  className={`max-w-20 px-3 py-1 rounded-md bg-${getColorByMacro('carb')} text-primary font-bold`}
                  required
                  min="0"
                />
              </div>
            </div>
            <p className='mt-2 text-center text-gray font-bold'>Toutes les quantités sont à renseigner pour 100g</p>
          </div>
          <div className="flex gap-5">
            <div className='flex flex-col'>
              <label htmlFor="unity">Unity</label>
              <select
                id="unity"
                name="unity"
                value={formData.unity}
                onChange={handleChange}
                className='max-w-28 px-3 py-1 rounded-md bg-lightPrimary text-secondary font-bold'
                required
              >
                <option value="Gram">G</option>
                <option value="Litre">Ml</option>
                <option value="Portion">Portion</option>
              </select>
            </div>
            <div className={`${isProportionInputVisible ? 'flex' : 'hidden'} flex-col mb-3`}>
              <label htmlFor="proportion">Proportion</label>
              <input
                type="number"
                id="proportion"
                name="proportion"
                value={formData.proportion}
                onChange={handleChange}
                className='max-w-20 px-3 py-1 rounded-md bg-lightPrimary text-secondary font-bold'
                required
                min="1"
              />
            </div>
          </div>          
        </div>
        <div className='flex items-center justify-center gap-3 mt-5 sm:mt-10'>
          {food && <button type="submit" disabled={!isFormValid} className={`font-bold bg-red text-primary px-5 py-3 rounded-3xl ${!isFormValid && 'brightness-90'}`} onClick={deleteFood}>Delete</button>}
          <button type="submit" disabled={!isFormValid} className={`font-bold bg-blue text-primary px-5 py-3 rounded-3xl ${!isFormValid && 'brightness-90'}`}>Confirm</button>
        </div>
      </form>
    </div>
  )
}