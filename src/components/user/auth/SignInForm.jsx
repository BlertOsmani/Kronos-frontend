import Button from '../../ui/Button'
import CustomLink from '../../ui/CustomLink'
import Label from '../../ui/Label'
import TextField from '../../ui/TextField'
import { Formik } from 'formik'
import {auth} from '../../../services/userService';
import { useState } from 'react'
import Message from '../../ui/Message'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../../contexts/UserProvider'

export default function SignInForm() {
    const [incorrectCredentials, setIncorrectCredentials] = useState(null);
    const navigate = useNavigate();
    const {updateUserInLocalStorage} = useUser();
  return (
    <div>
        <Formik
            initialValues={{
                username: '',
                password: ''
            }}
            validationSchema={Yup.object({
                username: Yup.string().required('Please enter your username')
            })}
            onSubmit={async(values, {setFieldError}) => {
               try{
                    const response = await auth(values.username, values.password);
                    if(response.status === 200){
                        setIncorrectCredentials(null);
                        localStorage.setItem('access_token', response.data.access);
                        localStorage.setItem('refresh_token', response.data.refresh);
                        updateUserInLocalStorage(response.data.user);
                        navigate('/');
                    }else if(response.status === 401) {
                        setIncorrectCredentials(response.data.detail);
                    }

               }catch(error){
                    console.log(error)
                    setFieldError('general', 'An unexpected error occurred');
               }
            }}
        >
            {({values, handleChange, handleSubmit, errors, touched}) => (
                <form onSubmit={handleSubmit}>
                    {incorrectCredentials && <Message type='error' className='!w-full flex justify-center mb-3' message={incorrectCredentials}/>}
                    <div className='flex flex-col gap-3'>
                        <div className="flex flex-col">
                            <Label className="pl-[1px] text-base text-left" value={"Username"}/>
                            <TextField errorMessage={touched.username && errors.username} name="username" size='large' className={"w-full"} type="text" value={values.username} onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col">
                            <Label className="pl-[1px] text-base text-left" value={"Password"}/>
                            <TextField name="password" size='large' type="password" className={"w-full"} value={values.password} onChange={handleChange}/>
                        </div>
                        <div className='w-full justify-end flex my-2'>
                            <CustomLink to="/forgot-password" className="text-black" title="Forgot password?"/>
                        </div>
                        <div>
                            <Button type="submit" title="Sign In" size='lg' className='w-full'/>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    </div>
  )
}
