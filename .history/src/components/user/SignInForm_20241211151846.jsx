import Button from '../ui/Button'
import CustomLink from '../ui/CustomLink'
import Label from '../ui/Label'
import TextField from '../ui/TextField'
import { Formik } from 'formik'
import {auth} from '../../services/userService';
import { useState } from 'react'
import Message from '../ui/Message'

export default function SignInForm() {
    const [incorrectCredentials, setIncorrectCredentials] = useState(null);
  return (
    <div>
        <Formik
            initialValues={{
                username: '',
                password: ''
            }}
            onSubmit={async(values, {setFieldError}) => {
               try{
                    const response = await auth(values.username, values.password);
                    if(response.status === 200){
                        setIncorrectCredentials(null);
                        localStorage.setItem('token', response.data.access)
                        localStorage.getItem('token')
                    }else if(response.status === 401) {
                        setIncorrectCredentials(response.data.detail);
                    }

               }catch(error){
                    console.log(error)
                    setFieldError('general', 'An unexpected error occurred');
               }
            }}
        >
            {({values, handleChange, handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    {incorrectCredentials && <Message type='error' className='!w-full flex justify-center mb-1' message={incorrectCredentials}/>}
                    <div className='flex flex-col gap-3'>
                        <div className="flex flex-col">
                            <Label className="pl-[1px] text-base text-left" value={"Username"}/>
                            <TextField name="username" size='large' className={"w-full"} type="text" value={values.username} onChange={handleChange}/>
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
