import PropTypes from 'prop-types';
import {Link} from 'react-router';

export default function CustomLink({to, className, title}) {
  return (
    <Link to={to} className={className}>
        {title}
    </Link>
  )
}

CustomLink.propTypes = {
    to: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string
}