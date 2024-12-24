import { useState } from "react";
import Image from "./Image";
import Button from "./Button";
import TieredMenu from "./TieredMenu";
import { logout } from "../../services/userService";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useUser } from "../../contexts/UserProvider";

export default function Navbar() {
  const {user} = useUser();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const profileMenuItems = [
    {
      label: "Profile",
      onClick: () => navigate('/profile')
    },
    {
      label: "Log out",
      onClick: async () => {
        await logout();
      }
    }
  ]
  
  return (
    <div className="flex container items-center m-auto py-5 justify-between">
        <div className="flex items-center gap-5 w-8/12">
            <div>
              <span className="text-3xl m-0 p-0 font-semibold">Kronos</span>
            </div>
            {location.pathname == '/profile' && (
              <div>
                <Button title={'Back to dashboard'} rounded={true} icon={<ArrowLeft size={13}/>} iconPosition="left" size="sm" onClick={() => navigate('/')} severity="white"/>
              </div>
            )}
        </div>
        <div className="w-4/12 flex items-center justify-end relative">
          <div>
            <Button onClick={(e) => {
              e.stopPropagation();
              setProfileMenuOpen(!profileMenuOpen);
                      }} severity="white" className="flex items-center">
            <div className="flex gap-1 items-center">
                <Image width={"40"} height={"40"} className={'rounded-full'} src={'https://lh4.googleusercontent.com/proxy/4sU5GLPHxSBdB1vNpeQxeYTVBAhuX84OZl4YeICLOg147K_jZLcPU6uOJEUrM-7eEssytzw9c-71x9XqRFdsvBYAWWnYLwq3PuaTxyH1AL-2GdBUhWPtz4XM'}/>
                <div className="flex flex-col text-start">
                  <span>{user.first_name} {user.last_name}</span>
                  <span className="text-xs text-gray-500">{user.username}</span>
                </div>
            </div>
            </Button>
            </div>
          <TieredMenu
            className={'absolute top-14 right-0'}
            items={profileMenuItems}
            isOpen={profileMenuOpen}
            onClose={() => setProfileMenuOpen(false)}
          />
        </div>
    </div>
  )
}
