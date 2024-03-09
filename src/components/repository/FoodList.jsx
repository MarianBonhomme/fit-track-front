import { useNutrition } from '../../utils/NutritionContext';

export default function FoodList({ editFood }) {
  const { foodList, deleteFromFoodList } = useNutrition();

  const deleteFood = (food) => {
    const confirm = window.confirm("Êtes-vous sûr ?")

    if (confirm) {
      deleteFromFoodList(food)
    }
  }

  return (
    <table className="w-full text-center">
      <thead>
        <tr>
          <th>Name</th>
          <th>Kcals</th>
          <th>Proteins</th>
          <th>Carbs</th>
          <th>Fats</th>
          <th>Unity</th>
          <th>Portion</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {foodList.map((food) => (
          <tr key={food.uniqid} className="border-t">
            <td>{food.name}</td>
            <td>{food.kcal}</td>
            <td>{food.protein}</td>
            <td>{food.carb}</td>
            <td>{food.fat}</td>
            <td>{food.unity}</td>
            <td>{food.portion}</td>
            <td className='flex gap-3'>
              <img src="src/assets/icons/global/setting-dynamic-premium.png" alt="update" className="w-6 py-3 pointer" onClick={() => editFood(food)}/>
              <img src="src/assets/icons/global/trash-can-dynamic-premium.png" alt="delete" className="w-6 py-3 pointer" onClick={() => deleteFood(food)}/>
            </td>
          </tr>
        ))

        }
      </tbody>
    </table>
  )
}