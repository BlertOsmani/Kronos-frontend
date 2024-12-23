import PropTypes from 'prop-types';
import Label from '../../ui/Label';
import TextField from '../../ui/TextField';
import Button from '../../ui/Button';
import { Formik } from 'formik';
import { updateProfile } from '../../../services/userService';
import { useUser } from '../../../hooks/useUser';

export default function ProfileForm({user, onSuccess}) {    
 const {updateUserInLocalStorage} = useUser();

  return (
    <div>
        <Formik
            initialValues={{
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                username: user.username
            }}
            onSubmit={async (values) => {
                try{
                    const response = await updateProfile(user.id, values);
                    if(response.status === 200){
                        updateUserInLocalStorage(response.data);
                        onSuccess();
                    }
                }   
                catch(error){
                    console.log("Something went wrong: ", error);
                }
            }}
        >
            {({values, handleChange, handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <div className='flex mt-6 flex-col gap-3 w-4/12'>
                        <div className='flex gap-1 items-center'>
                            <div className="flex flex-col w-full">
                                <Label className="pl-[1px] text-base text-left" value={'First name'}/>
                                <TextField name="first_name" size='large' type="text" onChange={handleChange} value={values.first_name}/>
                            </div>
                            <div className="flex flex-col w-full">
                                <Label className="pl-[1px] text-base text-left" value={'Last name'}/>
                                <TextField name="first_name" size='large' type="text" onChange={handleChange} value={values.last_name}/>
                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <Label className="pl-[1px] text-base text-left" value={"Email"}/>
                            <TextField name="email" size='large' type="text" onChange={handleChange} value={values.email}/>
                        </div>
                        <div className="flex flex-col w-full">
                            <Label className="pl-[1px] text-base text-left" value={"Username"}/>
                            <TextField name="username" size='large' type="text" onChange={handleChange} value={values.username}/>
                        </div>
                        <div className='flex flex-col mt-3'>
                            <Button type={'submit'} title={'Save changes'} size='lg' className='w-1/3'/>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    </div>
  )
}

ProfileForm.propTypes = {
    user: PropTypes.object,
    onSuccess: PropTypes.func
}