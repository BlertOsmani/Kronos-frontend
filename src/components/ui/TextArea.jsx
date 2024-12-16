import PropTypes from "prop-types"
import '../../styles/textfield.css'
import Message from "./Message";

export default function TextArea({value, rows, cols, size = "normal", errorMessage, style, className = "", onChange, type, name}) {
    const sizeClass = `tf-${size}`;
    return (
        <div className="flex flex-col">
            <textarea type={type} 
                onChange={onChange} 
                name={name} 
                rows={rows}
                cols={cols}
                className={`${sizeClass} outline-none focus:border-black border rounded ${className}`} 
                style={style}>
                    {value}
                </textarea>
            {errorMessage && <Message message={errorMessage} text={true} type="error"/>}
        </div>
    )
}


TextArea.propTypes = {
    rows: PropTypes.number,
    cols: PropTypes.number,
    value: PropTypes.any,
    size: PropTypes.oneOf(["small", "normal", "large"]),
    style: PropTypes.any,
    className: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
    name: PropTypes.string,
    errorMessage: PropTypes.string
}