import { Formik } from "formik";
import Label from "../../ui/Label";
import TextField from "../../ui/TextField";
import Button from "../../ui/Button";
import { changePassword } from "../../../services/userService";
import { useToast } from "../../../contexts/ToastProvider";
import PropTypes from 'prop-types';
import * as Yup from 'yup';

export default function ChangePasswordForm({onSuccess}) {
    const {showToast} = useToast();
  return (
    <div>
        <Formik
            initialValues={{
                old_password: '',
                new_password: '',
                confirm_new_password: ''
            }}
            validationSchema={Yup.object({
                old_password: Yup.string().required('Old password is required'),
                new_password: Yup.string().required('New password is required'),
                confirm_new_password: Yup.string().oneOf([Yup.ref('new_password'), null], 'Passwords must match')
            })}
            onSubmit={async (values, {resetForm, setFieldError}) => {
                try{
                    const {old_password, new_password} = values;

                    const response = await changePassword({old_password, new_password});
                    if(response.status === 200){
                        showToast("Password changed successfully", "success");
                        onSuccess();
                        resetForm();
                    }
                    else if(response.status === 400){
                        const validationErrors = response.data;

                        Object.keys(validationErrors).forEach((field) => {
                            setFieldError(field, validationErrors[field][0]);
                        });
                    }
                }catch(error){
                    console.log(error);
                }
            }}
        >
         {({values, handleChange, handleSubmit, touched, errors}) => (
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3 mt-2">
                    <div className="flex flex-col w-1/6">
                        <Label className="pl-[1px] text-sm text-left" value={"Old password"}/>
                        <TextField name="old_password" size='normal' className={"w-full"} type="password" errorMessage={touched.old_password && errors.old_password} value={values.old_password} onChange={handleChange}/>
                    </div>
                    <div className="flex flex-col w-1/6">
                        <Label className="pl-[1px] text-sm text-left" value={"New password"}/>
                        <TextField name="new_password" size='normal' className={"w-full"} type="password" errorMessage={touched.new_password && errors.new_password} value={values.new_password} onChange={handleChange}/>
                    </div>
                    <div className="flex flex-col w-1/6">
                        <Label className="pl-[1px] text-sm text-left" value={"Confirm new password"}/>
                        <TextField name="confirm_new_password" size='normal' className={"w-full"} type="password" errorMessage={touched.confirm_new_password && errors.confirm_new_password} value={values.confirm_new_password} onChange={handleChange}/>
                    </div>
                    <div className="flex gap-1">
                        <Button title={'Update password'} size="md"/>
                    </div>
                </div>
            </form>
         )}   
        </Formik>
    </div>
  )
}

ChangePasswordForm.propTypes = {
    onSuccess: PropTypes.func
}
