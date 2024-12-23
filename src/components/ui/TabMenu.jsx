import { useState } from 'react';
import PropTypes from 'prop-types';

export default function TabMenu({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  function handleTabClick(index){
    setActiveTab(index);
  };

  return (
    <div className="">
      {/* Tab Headers */}
      <div className="flex border-b mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 rounded-t px-5 text-center cursor-pointer transition-all ${
              activeTab === index
                ? 'border-b-2 border-neutral-900 bg-white'
                : 'border-b-2 border-transparent hover:bg-neutral-100'
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {tabs[activeTab] && <div>{tabs[activeTab].content}</div>}
      </div>
    </div>
  );
}

TabMenu.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};
