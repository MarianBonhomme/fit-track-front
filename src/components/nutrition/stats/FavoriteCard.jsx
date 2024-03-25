import { useEffect, useState } from "react";
import { useNutrition } from "../../../utils/NutritionContext";
import QuantityUnity from "../global/QuantityUnity";
import CardTitle from "../../global/CardTitle";
import { getimagePathFormatted } from "../../../utils/ImageService";
import FlipMove from 'react-flip-move';
import { Icon } from "@iconify/react";

export default function FavoriteCard() {
  const { foodsWithTotalQuantity } = useNutrition();
  const [favoriteFoods, setFavoriteFoods] = useState([])

  useEffect(() => {
    const top3foods = getTopFoods();
    setFavoriteFoods(top3foods);
  }, [foodsWithTotalQuantity]);

  const getTopFoods = () => {
    const filteredFoods = foodsWithTotalQuantity.filter((food) => food.unity !== "Portion" );
    const sortedFoods = [...filteredFoods].sort((a, b) => b.totalQuantity - a.totalQuantity);
    const top3 = sortedFoods.slice(0, 7);
    return top3;
  }

  const getClassByIndex = (index) => {
    const indexClasses = {
        0: 'text-green',
        1: 'text-blue',
        2: 'text-purple',
    };

    if (index > 2) {
        return 'text-yellow';
    }

    return indexClasses[index] || '';
};

  return (
    <div className="grow flex flex-col gap-5 bg-white px-4 py-3 shadow-custom rounded-3xl">
      <CardTitle text="Top Food" />
      <FlipMove>
        {favoriteFoods && favoriteFoods.map((food, index) => {
          return (
            <div key={food.id} className="py-5 border-t">
              <div className='flex items-center gap-3 px-3 relative'>
                {index === 0 && (
                  <div className="absolute top-0 right-0 rotate-45">
                    <Icon icon="streamline:crown-solid" width="25" height="25" style={{color: '#F5BE40'}}  />
                  </div>
                )}
                <p className={`font-bold ${getClassByIndex(index)}`}>{index + 1}</p>
                <img src={`http://localhost:3000/${getimagePathFormatted(food.image)}`} className="w-[70px] h-[70px] rounded-full" />
                <div>
                  <p>{food.name}</p>
                  <QuantityUnity quantity={food.totalQuantity} unity={food.unity} quantityStyle={'text-2xl font-bold'} unityStyle={'text-xl'} />
                </div>
              </div>
            </div>
          )      
        })}
      </FlipMove>
    </div>
  )
}