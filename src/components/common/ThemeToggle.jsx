import React, { useEffect, useState } from "react";
import { IoMoon } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import useTheme from "../../hook/useTheme";

const ThemeToggle = () => {
  const [theme, setTheme] = useTheme();
  const [isChecked, setIsChecked] = useState(theme == "dark" ? true : false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setTheme(isChecked ? "dark" : "light");
  }, [isChecked]);

  return (
    <div className="cursor-pointer bg-light-white dark:bg-dark-blue-600 p-3 rounded-md">
      <input
        id="toggle_box"
        type="checkbox"
        checked={isChecked}
        className="sr-only"
        onChange={handleToggle}
      />
      <label htmlFor="toggle_box" className="cursor-pointer ">
        <div className="transition-all">
          {isChecked ? (
            <MdSunny size={20} className="text-dark-white" />
          ) : (
            <IoMoon size={20} />
          )}
        </div>
      </label>
    </div>
  );
};

export default ThemeToggle;
