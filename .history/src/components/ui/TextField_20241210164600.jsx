import PropTypes from "prop-types"
import '../../styles/textfield.css'

export default function TextField({value, size = "normal", style, className = "", onChange, type, name}) {
    const sizeClass = `tf-${size}`;
    return (
        <div className="flex flex-col justify-end">
            <input type={type} onChange={onChange} value={value} name={name} className={`${sizeClass} outline-none focus:border-black border rounded ${className}`} style={style}/>
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