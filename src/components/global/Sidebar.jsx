import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav className="h-[70px] sm:h-screen max-sm:w-screen sm:w-[80px] bg-primary fixed bottom-0 sm:top-0 left-0 z-40 flex sm:flex-col max-sm:justify-evenly sm:gap-10 items-center sm:py-10">
      <Link to='/profile'>
        <Icon
          icon="fluent:settings-24-filled"
          className="text-secondary cursor-pointer size-[35px]"
        />   
      </Link>
      <Link to='/nutrition'>
        <Icon
          icon="fa-solid:apple-alt"
          className="text-green cursor-pointer size-[35px]"
        />
      </Link>
      <Link to='/sport'>
        <Icon
          icon="material-symbols:fitness-center-rounded"
          className="text-purple cursor-pointer size-[35px]"
        />
      </Link>
    </nav>
  );
}
