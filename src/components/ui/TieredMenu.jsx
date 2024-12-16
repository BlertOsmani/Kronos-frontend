import { ArrowRight } from "lucide-react";
import { useState } from "react"
import PropTypes from 'prop-types';

export default function TieredMenu({items, isOpen, onClose, className}) {
  if (!isOpen) return null;

  return (
    <ul className={`${className} bg-white border rounded shadow p-2 w-48`}>
      {items.map((item, index) => (
        <TieredMenuItem key={index} item={item}/>
      ))}
    </ul>
  )
}

function TieredMenuItem({item, onClose}){
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  return (
    <li className="relative group" onClick={() => setIsSubMenuOpen(true)}>
      <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-600 cursor-pointer hover:bg-neutral-100">
        {item.label}
        {hasChildren && <ArrowRight size={18}/>}
      </div>

      {hasChildren && isSubMenuOpen && (
        <div className="absolute left-full top-0 mt-[-8px]">
          <TieredMenu items={item.children}/>
        </div>
      )}
    </li>
  )
}


TieredMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      children: PropTypes.array
    })
  ).isRequired,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

TieredMenuItem.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    children: PropTypes.array
  }).isRequired,
  onClose: PropTypes.func
};
