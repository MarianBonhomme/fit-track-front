import { Icon } from '@iconify/react';
import { useEffect, useState } from "react";
import { useNutrition } from "../../../utils/nutrition/NutritionContext";
import { getColorByMacro } from '../../../utils/global/MacroService';
import CardTitle from '../../global/CardTitle';
import { macros } from '../../../utils/global/MacroService';
import Modal from '../../global/Modal';

export default function FoodModal({ food, close }) {
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

  const handleUnityClick = (clickedUnity) => {
    if (clickedUnity === 'Portion') {
      setIsProportionInputVisible(true);
    } else {
      setIsProportionInputVisible(false);
    }
    setFormData({...formData, unity: clickedUnity})
  }

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
    <Modal close={close}>
      <CardTitle text={food ? 'Update Food' : 'Create Food'} />
      <form onSubmit={handleSubmit}>      
        <Icon icon="solar:star-bold" className={`absolute top-5 left-5 size-[20px] text-${formData.is_favorite ? 'yellow' : 'gray'} cursor-pointer`} onClick={toggleIsFavorite} />  
        <div className='grid gap-3'>     
          <div className='bg-lightPrimary p-5'>
            <CardTitle text={'Image'} alignLeft={true} />
            <input
              type="file"
              id="image"
              name="image"
						  onChange={e => setFile(e.target.files[0])}
              accept="image/*"
              className='mt-3 mx-auto'
            />
          </div>     
          <div className='flex items-center gap-5 bg-lightPrimary px-5 py-3'>
            <CardTitle text={'Name*'} alignLeft={true} />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
						  onChange={handleChange}
              className='bg-transparent text-secondary w-full p-3'
              required
            />
          </div>
          <div className='bg-lightPrimary p-5'>
            <CardTitle text={'Macros'} alignLeft={true} />
            <div className='flex justify-evenly mt-3'>
              {macros.map((macro) => {
                return (
                  <div className='flex flex-col mx-auto'>
                    <input
                      type="number"
                      id={macro}
                      name={macro}
                      value={formData[macro]}
                      onChange={handleChange}
                      className={`w-14 h-14 text-center font-bold rounded-full bg-${getColorByMacro(macro)} text-primary font-bold`}
                      required
                      min="0"
                      max="9999"
                    />
                    <p className='text-center'>{macro}</p>
                  </div>
                )
              })}
            </div>
            <p className='mt-2 text-center text-gray font-bold'>All quantities are to be provided for 100g</p>
          </div>
          <div className="bg-lightPrimary p-5">
            <CardTitle text={'Unity*'} alignLeft={true} />
            <div className='flex items-center justify-evenly mt-3'>
            <div onClick={() => handleUnityClick('Gram')} className={`w-16 sm:w-20 text-center py-2 rounded-lg capitalize ${formData.unity === 'Gram' ? `bg-blue cursor-default text-primary font-semibold` : 'bg-primary text-secondary cursor-pointer'}`}>g</div>
            <div onClick={() => handleUnityClick('L')} className={`w-16 sm:w-20 text-center py-2 rounded-lg capitalize ${formData.unity === 'L' ? `bg-blue cursor-default text-primary font-semibold` : 'bg-primary text-secondary cursor-pointer'}`}>L</div>
            <div onClick={() => handleUnityClick('Portion')} className={`w-16 sm:w-20 text-center py-2 rounded-lg capitalize ${formData.unity === 'Portion' ? `bg-blue cursor-default text-primary font-semibold` : 'bg-primary text-secondary cursor-pointer'}`}>portion</div>
            </div>
          </div>  
          <div className={`${isProportionInputVisible ? 'flex' : 'hidden'} items-center gap-5 bg-lightPrimary px-5 py-3`}>
            <CardTitle text={'Proportion*'} alignLeft={true} />
            <input
              type="number"
              id="proportion"
              name="proportion"
              value={formData.proportion}
              onChange={handleChange}
              className='bg-transparent text-secondary w-full p-3'
              required
              min="1"
            />
          </div>        
        </div>
        <div className='flex items-center justify-center gap-3 mt-5'>
          {food && <button className={`font-bold bg-red text-primary px-5 py-3 rounded-3xl`} onClick={deleteFood}>Delete</button>}
          <button type="submit" disabled={!isFormValid} className={`font-bold bg-blue text-primary px-5 py-3 rounded-3xl ${!isFormValid && 'brightness-75'}`}>Confirm</button>
        </div>
      </form>
    </Modal>
  )
}