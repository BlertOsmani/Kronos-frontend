import PropTypes from "prop-types"


export default function Sidebar({src}) {
  return (
    <div className="fixed h-screen w-2/12 border border-r">
       {/* <img src={src}></img> */}
       <h1 className="text-3xl">Kronos</h1>
    </div>
  )
}

Sidebar.propTypes = {
    src: PropTypes.string
}
