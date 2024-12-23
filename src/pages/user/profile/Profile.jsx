import TabMenu from "../../../components/ui/TabMenu";
import Image from "../../../components/ui/Image";
import Button from "../../../components/ui/Button";
import { LogOut } from "lucide-react";
import ProfileForm from "../../../components/user/profile/ProfileForm";
import { useUser } from "../../../hooks/useUser";
import { logout } from "../../../services/userService";

export default function Profile() {   
    const {user, fetchUserFromLocalStorage} = useUser(); 


    const tabs = [
        {label: "Overview", content: <ProfileForm onSuccess={() => fetchUserFromLocalStorage()} user={user}/>},
        {label: "Account", content: ''}
    ]

    
  return (
    <div className="container m-auto">
        <div className="mt-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Image width={"100"} height={"100"} className={'rounded-full'} src={'https://lh4.googleusercontent.com/proxy/4sU5GLPHxSBdB1vNpeQxeYTVBAhuX84OZl4YeICLOg147K_jZLcPU6uOJEUrM-7eEssytzw9c-71x9XqRFdsvBYAWWnYLwq3PuaTxyH1AL-2GdBUhWPtz4XM'}/>
                <div className="flex flex-col"> 
                    <span className="text-xl font-semibold">{user.first_name} {user.last_name}</span>
                    <span className="text-lg text-gray-500">{user.username}</span>
                </div>
            </div>
            <div>
                <Button title={'Log out'} onClick={async () => {await logout()}} icon={<LogOut size={16}/>} iconPosition="left" severity="secondary"/>
            </div>
        </div>
        <TabMenu
            tabs={tabs}
        />
    </div>
  )
}
