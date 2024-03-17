import { useEffect, useState } from "react"
import { useNutrition } from "../../../utils/NutritionContext";

export default function FoodForm({ food, close }) {
  const { handleAddFood, handleUpdateFood } = useNutrition();
  const [isProportionInputVisible, setIsProportionInputVisible] = useState(false)

  const [formData, setFormData] = useState({
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
    if (food) {
      handleUpdateFood(formData);
    } else {
      handleAddFood(formData)
    }
	  close();
	};

  return (
    <div className='h-screen w-full fixed top-0 left-0 bg-opacity-50 bg-black flex justify-center items-center z-50'>
      <form onSubmit={handleSubmit} className='w-full max-w-3xl flex flex-col items-center bg-dark p-10 relative rounded-2xl'>
        <button onClick={close} className='absolute top-5 right-5 text-xl hover:rotate-90'>❌</button>
        <h3 className='font-bold text-3xl'>{food ? 'Update Food' : 'Create New Food'}</h3>
        <p className="mb-10">Toutes les quantités à renseigner sont pour 100g</p>
        <div className='w-full flex flex-col items-center relative'>          
          <div className='flex flex-col mb-5 relative'>
            <div className="absolute -left-1/4 top-1/3">
              <img
                src={formData.is_favorite ? '/assets/icons/global/star-dynamic-premium.png' : '/assets/icons/global/star-dynamic-clay.png'}
                alt="favorite"
                className="w-10 pointer"
                onClick={toggleIsFavorite}
              />
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
        <button type="submit" className='bg-black px-10 py-3 rounded-3xl mt-10'>Confirm</button>
      </form>
    </div>
  )
}