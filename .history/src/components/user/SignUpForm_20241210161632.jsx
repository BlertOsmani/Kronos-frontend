import Button from '../ui/Button'
import Label from '../ui/Label'
import TextField from '../ui/TextField'
import { Formik } from 'formik'
import * as Yup from 'yup';

export default function SignUpForm() {
  return (
    <div>
        <Formik
            initialValues={{
                first_name: '',
                last_name: '',
                email: '',
                username: '',
                password: '',
                confirm_password: ''
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
                    .min('Username must be at least 3 characters'),
                password: Yup.string()
                    .required('Password is required')      
            })}
            onSubmit={(values) => {
                console.log('Form data', values)
            }}
        >
            {({values, handleChange, handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-3'>
                        <div className='flex items-center gap-1'>
                            <div className="flex flex-col w-1/2">
                                <Label className="pl-[1px] text-base text-left" value={"First name"}/>
                                <TextField name="first_name" size='large' className={"w-full"} type="text" value={values.first_name} onChange={handleChange}/>
                            </div>
                            <div className="flex flex-col w-1/2">
                                <Label className="pl-[1px] text-base text-left" value={"Last name"}/>
                                <TextField name="last_name" size='large' className={"w-full"} type="text" value={values.last_name} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <Label className="pl-[1px] text-base text-left" value={"Email"}/>
                            <TextField name="email" size='large' className={"w-full"} type="text" value={values.email} onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col">
                            <Label className="pl-[1px] text-base text-left" value={"Username"}/>
                            <TextField name="username" size='large' className={"w-full"} type="text" value={values.username} onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col">
                            <Label className="pl-[1px] text-base text-left" value={"Password"}/>
                            <TextField name="password" size='large' type="password" className={"w-full"} value={values.password} onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col">
                            <Label className="pl-[1px] text-base text-left" value={"Confirm password"}/>
                            <TextField name="confirm_password" size='large' type="password" className={"w-full"} value={values.password} onChange={handleChange}/>
                        </div>
                        <div>
                            <Button title="Sign Up" size='lg' className='w-full'/>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    </div>
  )
}
