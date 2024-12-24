import PropTypes from "prop-types"
import '../../styles/textfield.css'
import Message from "./Message";

export default function TextField({disabled, icon, containerClassName, iconPosition = "left", placeholder, value, size = "normal", errorMessage, style, className = "", onChange, type, name}) {
    const sizeClass = `tf-${size}`;
    return (
        <div className={`flex flex-col ${containerClassName} relative`}>
            <span className={`absolute flex top-[50%] translate-y-[-50%] ${iconPosition === 'left' ? 'left-2' : 'right-2'} `}>{icon}</span>
            <input disabled={disabled} type={type} placeholder={placeholder} onChange={onChange} value={value} name={name} className={`${sizeClass} outline-none ${disabled ? 'bg-transparent text-gray-500 !p-0': 'border focus:border-black'} rounded ${className}`} style={style}/>
            {errorMessage && <Message message={errorMessage} text={true} type="error"/>}
        </div>
    )
}


TextField.propTypes = {
    value: PropTypes.any,
    disabled: PropTypes.bool,
    containerClassName: PropTypes.string,
    icon: PropTypes.element,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    placeholder: PropTypes.string,
    size: PropTypes.oneOf(["small", "normal", "large"]),
    style: PropTypes.any,
    className: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
    name: PropTypes.string,
    errorMessage: PropTypes.string
}