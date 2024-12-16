import PropTypes from "prop-types"
import '../../styles/textfield.css'
import Message from "./Message";

export default function TextField({value, size = "normal", errorMessage, style, className = "", onChange, type, name}) {
    const sizeClass = `tf-${size}`;
    return (
        <div className="flex flex-col gap-1">
            <input type={type} onChange={onChange} value={value} name={name} className={`${sizeClass} outline-none focus:border-black border rounded ${className}`} style={style}/>
            <Message message={errorMessage} text={true} type="error"/>
        </div>
    )
}


TextField.propTypes = {
    value: PropTypes.any,
    size: PropTypes.oneOf(["small", "normal", "large"]),
    style: PropTypes.any,
    className: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
    name: PropTypes.string,
    errorMessage: PropTypes.string
}