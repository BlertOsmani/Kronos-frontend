import PropTypes from 'prop-types';
import Label from '../../ui/Label';
import TextField from '../../ui/TextField';
import Button from '../../ui/Button';
import { Formik } from 'formik';
import { updateProfile } from '../../../services/userService';
import { useUser } from '../../../contexts/UserProvider';
import { useToast } from '../../../contexts/ToastProvider';
import * as Yup from 'yup';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

export default function ProfileForm({user, onSuccess}) {    
 const {updateUserInLocalStorage} = useUser();
 const [isEditing, setIsEditing] = useState(false);
 const {showToast} = useToast();

  return (
    <div className='flex w-full'>
        <Formik
            initialValues={{
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                username: user.username
            }}
            validationSchema={Yup.object({
                first_name: Yup.string()
                    .required('First name is required'),
                last_name: Yup.string()
                    .required('Last name is required'),
                email: Yup.string()
                    .email('Invalid email address')    
                    .required('Email is required'),
                username: Yup.string()
                    .required('Username is required')
                    .min(3, 'Username must be at least 3 characters')
            })}
            onSubmit={async (values, {setFieldError}) => {
                try{
                    const response = await updateProfile(user.id, values);
                    if(response.status === 200){
                        showToast('Profile updated successfully', 'success');
                        updateUserInLocalStorage(response.data);
                        onSuccess();
                        setIsEditing(false);
                    }
                    else if (response.status === 400) {
                        const validationErrors = response.data;

                        Object.keys(validationErrors).forEach((field) => {
                            setFieldError(field, validationErrors[field][0]);
                        });
                    }
                }   
                catch(error){
                    console.log("Something went wrong: ", error);
                }
            }}
        >
            {({values, handleChange, handleSubmit, touched, errors}) => (
                <div className='flex flex-col gap-5 mt-8 w-full'>
                    <div className='flex w-full justify-between border-b py-1'>
                        <span className="text-xl">Profile</span>
                        <div className='ml-4'>
                            <Button onClick={() => setIsEditing(!isEditing)} type='button' title={isEditing ? 'Cancel' : 'Edit'} className='text-gray-600' size='sm' severity='secondary'  icon={isEditing ? null : <Pencil size={13}/>} iconPosition='left'/>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-row'>
                            <div className='flex mt-3 flex-col gap-3 w-4/12'>
                                <div className='flex gap-1 items-center'>
                                    <div className="flex flex-col w-full">
                                        <Label className="pl-[1px] text-sm text-left" value={'First name'}/>
                                        <TextField disabled={!isEditing} errorMessage={touched.first_name && errors.first_name} name="first_name" size='normal' type="text" onChange={handleChange} value={values.first_name}/>
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <Label className="pl-[1px] text-sm text-left" value={'Last name'}/>
                                        <TextField disabled={!isEditing} errorMessage={touched.last_name && errors.last_name} name="first_name" size='normal' type="text" onChange={handleChange} value={values.last_name}/>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full">
                                    <Label className="pl-[1px] text-sm text-left" value={"Email"}/>
                                    <TextField disabled={!isEditing}  errorMessage={touched.email && errors.email} name="email" size='normal' type="text" onChange={handleChange} value={values.email}/>
                                </div>
                                <div className="flex flex-col w-full">
                                    <Label className="pl-[1px] text-sm text-left" value={"Username"}/>
                                    <TextField disabled={!isEditing} errorMessage={touched.username && errors.username} name="username" size='normal' type="text" onChange={handleChange} value={values.username}/>
                                </div>
                                {isEditing && 
                                    (
                                        <div className='flex flex-col mt-3'>
                                            <Button type={'submit'} title={'Save changes'} size='md' className='w-1/3'/>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </Formik>
    </div>
  )
}

ProfileForm.propTypes = {
    user: PropTypes.object,
    onSuccess: PropTypes.func
}