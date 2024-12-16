import PropTypes from 'prop-types';

export default function Tag({name, className, size, severity}) {
    const severityClass = {
        error: 'bg-red-100 text-red-500',
        success: 'bg-emerald-100 text-green-500',
        info: 'bg-blue-100 text-blue-500'
    }
    
    const sizeClass = {
        lg: 'text-lg',
        md: 'text-base',
        sm: 'text-sm',
        xs: 'text-xs',
    } 


  return (
    <span className={`${className} flex items-center rounded p-1 ${sizeClass[size]} ${severityClass[severity]}`}>
        {name}
    </span>
  )
}

Tag.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.string,
    severity: PropTypes.string
}
