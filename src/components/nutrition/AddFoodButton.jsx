import { NavLink } from "react-router-dom";

export default function AddFoodButton() {
  return (
    <NavLink to="/repository" className="flex justify-center items-center">
      <img src="src/assets/icons/global/plus-dynamic-premium.png" alt="Icone Nutrition" className="w-2/3" />
    </NavLink>
  )
}
