import PropTypes from 'prop-types'
import React from 'react'

export default function Message({message, type = '', text = false,}) {  
    const typeClass = {
        error: 'text-red-500'
    }

  return (
    <span className={`${typeClass[type]}`}>{message}</span>
  )
}

Message.propTypes = {
    type: PropTypes.string,
    text: PropTypes.bool,
    message: PropTypes.string
}
