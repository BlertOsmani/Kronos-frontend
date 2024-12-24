import { useDialog } from "../../../contexts/DialogProvider";
import { useUser } from "../../../contexts/UserProvider";
import { deleteAccount } from "../../../services/userService";
import Button from "../../ui/Button";
import ConfirmDialog from "../../ui/ConfirmDialog";

export default function Account() {
      const {dialog, closeDialog, openDialog} = useDialog();
      const {user} = useUser();
  return (
    <div className="flex flex-col gap-5 mt-8">
      <div className="flex flex-col gap-3">
        <span className="text-xl text-red-500 border-b py-1">Delete account</span>
        <div className="flex flex-col w-auto">
          <span className="text-xs py-1">Once you delete your account there is no going back. Please make sure before doing so.</span>
          <div className="w-auto py-2">
            <Button title={'Delete account'} onClick={() => openDialog("delete_account", {title: 'Delete account', id: user.id})} size="sm" severity="error-outline"/>
            <ConfirmDialog isOpen={dialog?.name === 'delete_account'}
                title={dialog?.payload?.title}
                message="Are you sure you want to delete your account? Once you do there is no going back!"
                onClose={closeDialog}
                confirmButtonSeverity={'error'}
                confirmButtonText={'Delete'}
                rejectButtonText={'Cancel'}
                onConfirm={() => deleteAccount(dialog?.payload.id)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
