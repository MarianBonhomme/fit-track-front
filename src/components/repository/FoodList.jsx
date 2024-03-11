import { useNutrition } from '../../utils/NutritionContext';

export default function FoodList({ editFood }) {
  const { foods, unities, handleDeleteFood } = useNutrition();

  const deleteFood = (food) => {
    const confirm = window.confirm("Êtes-vous sûr ?")

    if (confirm) {
      handleDeleteFood(food)
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
          <th></th>
        </tr>
      </thead>
      <tbody>
        {foods && unities && (
          foods.map((food) => {
            const unity = unities.find((u) => u.id === food.unity_id);
            return (
              <tr key={food.id} className="border-t">
                <td>{food.name}</td>
                <td>{food.kcal}</td>
                <td>{food.prot}</td>
                <td>{food.carb}</td>
                <td>{food.fat}</td>
                <td>{unity ? unity.name : 'N/A'}</td>
                <td className='flex gap-3'>
                  <img src="/assets/icons/global/setting-dynamic-premium.png" alt="update" className="w-6 py-3 pointer" onClick={() => editFood(food)}/>
                  <img src="/assets/icons/global/trash-can-dynamic-premium.png" alt="delete" className="w-6 py-3 pointer" onClick={() => deleteFood(food)}/>
                </td>
              </tr>
            )
          })
        )}
      </tbody>
    </table>
  )
}