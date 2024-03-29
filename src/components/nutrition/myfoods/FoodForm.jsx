import { Icon } from '@iconify/react';
import { useEffect, useState } from "react";
import { useNutrition } from "../../../utils/NutritionContext";

export default function FoodForm({ food, close }) {
  const { handleAddFood, handleUpdateFood } = useNutrition();
  const [isProportionInputVisible, setIsProportionInputVisible] = useState(false)

  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    kcal: null,
    prot: null,
    carb: null,
    fat: null,
    unity: 'Gram',
    proportion: 1,
    is_favorite: false,
  })
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (food) {
      setFormData(food)
    }
  }, [food])

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

  return (
    <div className='h-screen w-full fixed top-0 left-0 flex bg-opacity-70 bg-black justify-center items-center z-50'>
      <form onSubmit={handleSubmit} className='w-full max-w-3xl flex flex-col items-center bg-primary p-10 relative rounded-2xl'>
        <Icon icon="maki:cross" width={35} height={35} className="absolute right-10 top-10 text-red cursor-pointer" onClick={close} />
        <h3 className='font-bold text-3xl mb-10'>{food ? 'Update Food' : 'Create New Food'}</h3>
        <div className='w-full flex flex-col items-center relative gap-10'>     
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
            <div className="absolute -left-1/4 top-1/3">
              <Icon icon="solar:star-bold" width={30} height={30} className={`text-${formData.is_favorite ? 'yellow' : 'gray'} cursor-pointer`} onClick={toggleIsFavorite} />  
            </div>
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
            <div className="flex gap-5">
              <div className='flex flex-col'>
                <label htmlFor="kcal">Kcals</label>
                <input
                  type="number"
                  id="kcal"
                  name="kcal"
                  value={formData.kcal}
                  onChange={handleChange}
                  className='max-w-20 px-3 py-1 rounded-md bg-green text-primary font-bold'
                  required
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
                  className='max-w-20 px-3 py-1 rounded-md bg-purple text-primary font-bold'
                  required
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
                  className='max-w-20 px-3 py-1 rounded-md bg-orange text-primary font-bold'
                  required
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
                  className='max-w-20 px-3 py-1 rounded-md bg-yellow text-primary font-bold'
                  required
                />
              </div>
            </div>
            <p className='mt-2 text-gray font-bold'>Toutes les quantités sont à renseigner pour 100g</p>
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
              />
            </div>
          </div>          
        </div>
        <button type="submit" className='font-bold bg-blue text-primary px-10 py-3 rounded-3xl mt-10'>Confirm</button>
      </form>
    </div>
  )
}