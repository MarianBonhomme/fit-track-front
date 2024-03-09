import { NavLink, useLocation } from "react-router-dom"

export default function Sidebar() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <nav className="h-screen flex flex-col justify-between items-center py-10">
      <div className="flex flex-col gap-10">
        <NavLink to="nutrition" className="relative w-14 h-14">
          <img src="src/assets/icons/nutrition/heart-dynamic-clay.png" alt="Icone Nutrition" className={`absolute w-full transition duration-300 ${location.pathname === '/nutrition' ? 'opacity-0' : ''}`} />
          <img src="src/assets/icons/nutrition/heart-dynamic-gradient.png" alt="Icone Nutrition Active" className={`absolute w-full transition duration-300 ${location.pathname === '/nutrition' ? '' : 'opacity-0'}`} />
        </NavLink>
        <NavLink to="sport" className="relative w-14 h-14">
          <img src="src/assets/icons/sport/gym-dynamic-clay.png" alt="Icone Sport" className={`absolute w-full transition duration-300 ${location.pathname === '/sport' ? 'opacity-0' : ''}`} />
          <img src="src/assets/icons/sport/gym-dynamic-gradient.png" alt="Icone Sport Active" className={`absolute w-full transition duration-300 ${location.pathname === '/sport' ? '' : 'opacity-0'}`} />
        </NavLink>
        <NavLink to="finance" className="relative w-14 h-14">
          <img src="src/assets/icons/finance/euro-dynamic-clay.png" alt="Icone Finance" className={`absolute w-full transition duration-300 ${location.pathname === '/finance' ? 'opacity-0' : ''}`} />
          <img src="src/assets/icons/finance/euro-dynamic-gradient.png" alt="Icone Finance Active" className={`absolute w-full transition duration-300 ${location.pathname === '/finance' ? '' : 'opacity-0'}`} />
        </NavLink>
      </div>
      <div className="flex flex-col gap-10">
        <NavLink to="settings" className="relative w-14 h-14">
          <img src="src/assets/icons/global/setting-dynamic-clay.png" alt="Icone Nutrition" className={`absolute w-full transition duration-300 ${location.pathname === '/settings' ? 'opacity-0' : ''}`} />
          <img src="src/assets/icons/global/setting-dynamic-gradient.png" alt="Icone Nutrition Active" className={`absolute w-full transition duration-300 ${location.pathname === '/settings' ? '' : 'opacity-0'}`} />
        </NavLink>
      </div>
    </nav>
  )
}