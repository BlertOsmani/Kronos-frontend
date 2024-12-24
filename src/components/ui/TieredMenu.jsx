import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

export default function TieredMenu({ items, isOpen, onClose, className }) {
  const tieredMenuRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(e){
      if (isOpen && tieredMenuRef.current && !tieredMenuRef.current.contains(e.target)) {
        onClose(); // Close the menu if a click happens outside
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ul
      ref={tieredMenuRef}
      className={`${className} bg-white border rounded shadow p-2 w-48`}
    >
      {items.map((item, index) => (
        <TieredMenuItem key={index} item={item} onClose={onClose} />
      ))}
    </ul>
  );
}



function TieredMenuItem({ item, onClose }) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  function handleParentClick(e){
    e.stopPropagation(); // Prevent the click from bubbling up to parent menus

    // Toggle the submenu state
    if(hasChildren){
      setIsSubMenuOpen(!isSubMenuOpen);
    }
    else{
      onClose();
    }

    // Execute item's `onClick` handler if provided
    if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <li className="relative z-50 group">
      {/* Parent menu item */}
      <div
        className={`flex justify-between items-center pl-4 pr-2 rounded text-sm py-2 text-gray-600 cursor-pointer hover:bg-neutral-100 ${item.className}`}
        onClick={handleParentClick} // Use onClick here
      >
        {item.label}
        {hasChildren && <ChevronRight size={18} />}
      </div>

      {/* Submenu */}
      {hasChildren && isSubMenuOpen && (
        <div
          className="absolute left-full top-0 ml-[9px]"
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside submenu from closing it
        >
          <TieredMenu
            items={item.children}
            isOpen={isSubMenuOpen}
            onClose={onClose}
          />
        </div>
      )}
    </li>
  );
}

TieredMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      children: PropTypes.array,
      className: PropTypes.string
    })
  ).isRequired,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

TieredMenuItem.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    children: PropTypes.array,
    className: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func,
};
