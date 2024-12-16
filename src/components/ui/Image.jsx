import PropTypes from "prop-types"

export default function Image({src, alt, className, width, height}) {
  return (
    <img src={src} alt={alt} className={className} width={width} height={height}/>
  )
}

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
}
