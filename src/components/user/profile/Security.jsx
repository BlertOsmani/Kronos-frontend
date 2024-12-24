import { useState } from "react";
import Button from "../../ui/Button";
import ChangePasswordForm from "./ChangePasswordForm";

export default function Security() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  return (
    <div className="flex flex-col gap-5 mt-8">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between border-b">
            <span className="text-xl py-1">Change password</span>
            <Button className="w-auto" title={isChangingPassword ? 'Hide': 'Change password'} onClick={() => setIsChangingPassword(!isChangingPassword)} size="sm" severity="secondary"/>
        </div>
        <div className="flex flex-col w-auto">
          <span className="text-xs py-1">Changing your password once in a while can keep your account safe.</span>
          <div className="w-auto py-2">
            {isChangingPassword && (<ChangePasswordForm onSuccess={() => setIsChangingPassword(false)}/>)}
          </div>
        </div>
      </div>
    </div>
  )
}
