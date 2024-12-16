import PropTypes from 'prop-types'

export default function Message({message, className = '',  type = '', text = false,}) {  
    const typeClass = {
        error: 'text-red-500 bg-red-50',
        success: 'text-emerald-500 bg-emerald-50'
    }

  return (
    <p className={`${typeClass[type]} ${className} text-sm ${text ? '!bg-transparent' : ''}`}>{message}</p>
  )
}

Message.propTypes = {
    type: PropTypes.string,
    text: PropTypes.bool,
    message: PropTypes.string,
    className: PropTypes.string
}