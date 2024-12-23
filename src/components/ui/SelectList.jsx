import PropTypes from 'prop-types';
import Message from './Message';

export default function SelectList({ options, errorMessage, className, placeholder = "Select an option", size = "normal", onChange, selectedValue }) {
    const sizeClass = `tf-${size}`;
    return (
        <div className="flex flex-col">
          <select
            value={selectedValue}
            onChange={(e) => onChange(e.target.value)} 
            className={`${sizeClass} ${className} outline-none rounded border focus:border-black`}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errorMessage && <Message message={errorMessage} text={true} type="error"/>}
        </div>
      );
}

SelectList.propTypes = {
    options: PropTypes.any,
    size: PropTypes.oneOf(["small", "normal", "large"]),
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    selectedValue: PropTypes.string,
    className: PropTypes.string,
    errorMessage: PropTypes.string
}
