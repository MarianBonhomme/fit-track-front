import { useEffect, useState } from "react"
import { useNutrition } from "../../../utils/NutritionContext";
import { Icon } from '@iconify/react';

export default function FoodForm({ food, close }) {
  const { handleAddFood, handleUpdateFood } = useNutrition();
  const [isProportionInputVisible, setIsProportionInputVisible] = useState(false)

  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    kcal: 0,
    prot: 0,
    carb: 0,
    fat: 0,
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
    <div className='h-screen w-full fixed top-0 left-0 bg-opacity-70 bg-ice flex justify-center items-center z-50 shadow-custom'>
      <form onSubmit={handleSubmit} className='w-full max-w-3xl flex flex-col items-center bg-white p-10 relative rounded-2xl'>
        <Icon icon="maki:cross" width={35} height={35} style={{color: '#F46F97', cursor: 'pointer'}} className="absolute right-10 top-10" onClick={close} />
        <h3 className='font-bold text-3xl'>{food ? 'Update Food' : 'Create New Food'}</h3>
        <p className="mb-10">Toutes les quantités à renseigner sont pour 100g</p>
        <div className='w-full flex flex-col items-center relative'>     
          <div className='flex flex-col mb-5 relative'>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              name="image"
						  onChange={e => setFile(e.target.files[0])}
              accept="image/*"
              className='text-black px-4 py-1 border rounded-2xl mt-1 w-72'
            />
          </div>     
          <div className='flex flex-col mb-5 relative'>
            <div className="absolute -left-1/4 top-1/3">
              <Icon icon="solar:star-bold" width={30} height={30} style={{color: `${formData.is_favorite ? '#F5BE40' : '#25252F'}`, cursor: 'pointer'}} onClick={toggleIsFavorite} />  
            </div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
						  onChange={handleChange}
              className='text-black px-4 py-1 border rounded-2xl mt-1 w-72'
              required
            />
          </div>
          <div className="flex gap-5">
            <div className='flex flex-col mb-5'>
              <label htmlFor="kcal">Kcals</label>
              <input
                type="number"
                id="kcal"
                name="kcal"
                value={formData.kcal}
                onChange={handleChange}
                className='text-black px-4 py-1 border rounded-2xl mt-1 w-32'
                required
              />
            </div>
            <div className='flex flex-col mb-5'>
              <label htmlFor="prot">Proteins</label>
              <input
                type="number"
                id="prot"
                name="prot"
                value={formData.prot}
                onChange={handleChange}
                className='text-black px-4 py-1 border rounded-2xl mt-1 w-32'
                required
              />
            </div>
            <div className='flex flex-col mb-5'>
              <label htmlFor="carb">Carbs</label>
              <input
                type="number"
                id="carb"
                name="carb"
                value={formData.carb}
                onChange={handleChange}
                className='text-black px-4 py-1 border rounded-2xl mt-1 w-32'
                required
              />
            </div>
            <div className='flex flex-col mb-5'>
              <label htmlFor="fat">Fats</label>
              <input
                type="number"
                id="fat"
                name="fat"
                value={formData.fat}
                onChange={handleChange}
                className='text-black px-4 py-1 border rounded-2xl mt-1 w-32'
                required
              />
            </div>
          </div>
          <div className="flex gap-5">
            <div className='flex flex-col mb-5'>
              <label htmlFor="unity">Unity</label>
              <select
                id="unity"
                name="unity"
                value={formData.unity}
                onChange={handleChange}
                className='text-black px-4 py-1 border rounded-2xl mt-1 w-32'
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
                className='text-black px-4 py-1 border rounded-2xl mt-1 w-32'
                required
              />
            </div>
          </div>          
        </div>
        <button type="submit" className='font-bold bg-purple text-white px-10 py-3 rounded-3xl mt-10'>Confirm</button>
      </form>
    </div>
  )
}