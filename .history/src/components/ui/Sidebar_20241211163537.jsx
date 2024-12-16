import PropTypes from "prop-types"


export default function Sidebar({src}) {
  return (
    <div className="fixed h-screen w-2/12 border border-r">
       <div className="justify-center flex h-100 bg-red-100">
         <h1 className="text-3xl">Kronos</h1>
       </div>
    </div>
  )
}

Sidebar.propTypes = {
    src: PropTypes.string
}
