import PropTypes from "prop-types";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Message from "./Message";

export default function DatePicker({ minDate, maxDate, selectedDate, errorMessage, className,  size = "normal", dateFormat, onChange, placeholder = "Select a date" }) {
    const sizeClass = `tf-${size}`;

    return (
        <div className="flex flex-col">
            <ReactDatePicker
                selected={selectedDate}
                onChange={onChange}
                className={`${sizeClass} outline-none rounded border focus:border-black ${className}`}
                placeholderText={placeholder}
                dateFormat={dateFormat} 
                minDate={minDate}
                maxDate={maxDate}
            />
            {errorMessage && <Message message={errorMessage} text={true} type="error"/>}
        </div>
    );
}

DatePicker.propTypes = {
    minDate: PropTypes.any,
    maxDate: PropTypes.any,
    selectedDate: PropTypes.instanceOf(Date),
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    dateFormat: PropTypes.string,
    size: PropTypes.oneOf(['small', 'normal', 'large']),
    className: PropTypes.string,
    errorMessage: PropTypes.string
};
