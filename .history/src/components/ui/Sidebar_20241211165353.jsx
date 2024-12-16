import PropTypes from "prop-types"


export default function Sidebar({src}) {
  return (
    <div className="fixed h-screen w-2/12 border border-r">
       <div className="justify-center flex h-16 items-center">
            <h1 className="text-3xl font-semibold">Kronos</h1>
       </div>
    </div>
  )
}

Sidebar.propTypes = {
    src: PropTypes.string
}