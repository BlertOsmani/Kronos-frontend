import { Check } from "lucide-react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function Checkbox({
  label,
  labelStyle,
  checked,
  onChange,
  isButtonStyle = false,
}) {
  const [isChecked, setIsChecked] = useState(checked || false);

  // Sync internal state with "checked" prop from the parent
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  // Handle checkbox toggle
  function handleChange(){
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) onChange(newCheckedState);
  };

  return (
    <label
      className={`flex items-center gap-2 text-sm cursor-pointer select-none ${
        isButtonStyle
          ? "px-3 py-1 rounded-full border transition-colors"
          : ""
      } ${
        isButtonStyle && isChecked
          ? "border-black text-black"
          : isButtonStyle
          ? ""
          : ""
      }`}
    >
      {/* Hidden native input */}
      <input
        type="checkbox"
        className="hidden"
        checked={isChecked}
        onChange={handleChange}
      />

      {/* Custom checkbox element */}
      <div
        className={`flex items-center justify-center w-4 h-4 border rounded transition-colors ${
          isChecked ? "bg-black border-none" : "bg-white"
        }`}
      >
        {isChecked && <Check size={14} strokeWidth={3} color="white"/>}
      </div>

      <span className={`${labelStyle} text-xs flex items-center rounded p-1`}>{label}</span>
    </label>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  isButtonStyle: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  labelStyle: PropTypes.string
};
