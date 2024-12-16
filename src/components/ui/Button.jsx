import PropTypes from "prop-types"

export default function Button({type, onClick, iconPosition = 'right', onSubmit, children, childrenContainerClassName, title, icon, className = "", severity = 'primary', size = 'md', rounded = true}) {
    const severityClass = {
        primary: 'bg-neutral-900 text-white hover:bg-neutral-950',
        secondary: 'bg-neutral-100 text-black hover:bg-neutral-200',
        success: 'bg-emerald-500 text-white hover:bg-emerald-600',
        white: 'bg-[#ffffff] text-black'
    }

    const sizeClass = {
        xs: 'text-[10px] p-[2px]',
        sm: 'text-[13px] p-[6px]',
        md: 'text-[15px] p-[8px]',
        lg: 'text-[17px] p-[10px]',
    }

    return (    
        <button type={type} onSubmit={onSubmit} onClick={onClick} 
            className={`${className} ${rounded ? 'rounded' : ''} ${severityClass[severity] || ''} ${sizeClass[size]}`}
            >
                <div className={`${iconPosition === 'right' ? 'flex-row' : 'flex-row-reverse'} gap-1 items-center flex justify-center`}>
                    {title} 
                    {icon}
                </div>
                <div className={`${childrenContainerClassName}`}>
                    {children}
                </div>
        </button>
    )
}

Button.propTypes = {
    onClick: PropTypes.func,
    link: PropTypes.bool,
    icon: PropTypes.any,
    onSubmit: PropTypes.func,
    title: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    severity: PropTypes.oneOf(['primary', 'secondary', 'success', 'white']),
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xs']),
    rounded: PropTypes.bool,
    children: PropTypes.node,
    childrenContainerClassName: PropTypes.string,
    iconPosition: PropTypes.oneOf(['left', 'right'])
}