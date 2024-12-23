import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { Check, ChevronDown } from 'lucide-react';

export default function Dropdown({ options, value, placeholder = "Select an option",  onSelect }){
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  function handleToggle(){
    setIsOpen(!isOpen);
  };
   
  function handleSelect(option){
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleOutsideClick(e){
        if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
            setIsOpen(false);
        }
    };

    document.addEventListener('click', handleOutsideClick);
    return() => {
        document.removeEventListener('click', handleOutsideClick);
    }
  }, []);

  return (
    <div className="relative inline-block w-48" ref={dropdownRef}>
      {/* Dropdown Button */}
      <Button
        className={`${!value ? 'text-gray-500': ''} border w-full hover:border-black focus:border-black`}
        onClick={handleToggle}
        size='md'
        type={'button'}
        severity='white'
        icon={<ChevronDown size={20} color='gray'/>}
        iconPosition='right'
        title={value || placeholder}
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute py-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
          {options.map((option, index) => (
            <li
              key={index}
              className={`px-2 flex items-center ${value === option ? 'bg-gray-100': ''} gap-1 py-2 text-gray-600 font-regular cursor-pointer hover:bg-gray-100`}
              onClick={() => handleSelect(option)}
            >
                {value === option && (
                    <Check size={16}/>
                )}
                {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Dropdown.propTypes = {
    options: PropTypes.array,
    onSelect: PropTypes.func,
    value: PropTypes.any,
    placeholder: PropTypes.string
}