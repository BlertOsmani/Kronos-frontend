import PropTypes from "prop-types"
import CustomLink from "./CustomLink"


export default function Sidebar() {
  return (
    <div className="fixed h-screen w-2/12 border border-r">
       <div className="justify-center flex h-16 items-center">
            <h1 className="text-3xl font-semibold">Kronos</h1>
       </div>
       <div className="flex p-2">
            <nav>
                <ul>
                    <li>
                        <CustomLink to={'/'} title={"Dashboard"} className='p-2 text-semibold'/>
                    </li>
                    <li></li>
                    <li></li> 
                </ul>
            </nav>
       </div>
    </div>
  )
}

Sidebar.propTypes = {
}
