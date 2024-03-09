import { useEffect, useState } from "react"
import { useNutrition } from "../../utils/NutritionContext";
import { v4 as uuidv4 } from 'uuid';

export default function FoodForm({ food, close }) {
  const { updateFoodList } = useNutrition();

  const [formData, setFormData] = useState({
    name: '',
    kcal: 0,
    protein: 0,
    carb: 0,
    fat: 0,
    unity: 'kg',
    portion: 0.001,
  })

  useEffect(() => {
    if (food) {
      setFormData(food)
    }
  }, [food])

  const handleChange = (e) => {
	  const { name, value, type } = e.target;
	  setFormData({
		...formData,
		[name]: type === 'checkbox' ? e.target.checked : value,
	  });
	};

  const handleSubmit = (e) => {
	  e.preventDefault();
    const updatedFormData = food ? formData : { ...formData, uniqid: uuidv4() };
    updateFoodList(updatedFormData);
	  close();
	};

  return (
    <div className='h-screen w-full fixed top-0 left-0 bg-opacity-50 bg-black flex justify-center items-center z-50'>
      <form onSubmit={handleSubmit} className='w-full max-w-3xl flex flex-col items-center bg-dark p-10 relative rounded-2xl'>
        <button onClick={close} className='absolute top-5 right-5 text-xl hover:rotate-90'>❌</button>
        <h3 className='font-bold text-3xl mb-10'>{food ? 'Update Food' : 'Create New Food'}</h3>
        <div className='w-full flex flex-col items-center'>
          <div className='flex flex-col mb-5'>
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
                type="text"
                id="kcal"
                name="kcal"
                value={formData.kcal}
                onChange={handleChange}
                className='text-black px-4 py-1 border rounded-2xl mt-1 w-32'
                required
              />
            </div>
            <div className='flex flex-col mb-5'>
              <label htmlFor="protein">Proteins</label>
              <input
                type="text"
                id="protein"
                name="protein"
                value={formData.protein}
                onChange={handleChange}
                className='text-black px-4 py-1 border rounded-2xl mt-1 w-32'
                required
              />
            </div>
            <div className='flex flex-col mb-5'>
              <label htmlFor="carb">Carbs</label>
              <input
                type="text"
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
                type="text"
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
              <input
                type="text"
                id="unity"
                name="unity"
                value={formData.unity}
                onChange={handleChange}
                className='text-black px-4 py-1 border rounded-2xl mt-1 w-32'
                required
              />
            </div>
            <div className='flex flex-col mb-5'>
              <label htmlFor="portion">Portion</label>
              <input
                type="text"
                id="portion"
                name="portion"
                value={formData.portion}
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