import PropTypes from 'prop-types'

export default function Label({className = "", value}) {
  return (
    <label className={className}>{value}</label>
  )
}


Label.propTypes = {
    className: PropTypes.string,
    value: PropTypes.any,
}