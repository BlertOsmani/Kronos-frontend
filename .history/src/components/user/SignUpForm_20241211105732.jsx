import { useNavigate } from 'react-router-dom';
import registerUser from '../../services/userService';
import Button from '../ui/Button'
import Label from '../ui/Label'
import TextField from '../ui/TextField'
import { Formik } from 'formik'
import * as Yup from 'yup';

export default function SignUpForm() {
    const navigate = useNavigate();
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
                    .min(3, 'Username must be at least 3 characters'),
                password: Yup.string()
                    .required('Password is required')
                    .min(8, 'Password must be at least 8 characters')
                    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                    .matches(/[0-9]/, 'Password must contain at least one number')
                    .matches(/[\W_]/, 'Password must contain at least one special character'),
                confirm_password: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
            })}

            onSubmit={async (values, { setFieldError }) => {
                try {
                    const { confirm_password, ...data } = values;
            
                    const response = await registerUser(data);

                    if (response.status === 201) {
                        navigate('/login');
                    } else if (response.status === 400) {
                        const validationErrors = response.data;

                        Object.keys(validationErrors).forEach((field) => {
                            setFieldError(field, validationErrors[field][0]);
                        });
                    }
                } catch (error) {
                    console.error('Error registering user: ', error);
                    // Optionally, set a global error if the registration fails
                    setFieldError('general', 'An unexpected error occurred');
                }
            }}
        >
            {({values, handleChange, handleSubmit, errors, touched}) => (
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-3'>
                        <div className='flex gap-1 justify-center'>
                            <div className="flex flex-col w-1/2">
                                <Label className="pl-[1px] text-base text-left" value={"First name"}/>
                                <TextField name="first_name" size='large' className={"w-full"} type="text" errorMessage={touched.first_name && errors.first_name}  value={values.first_name} onChange={handleChange}/>
                            </div>
                            <div className="flex flex-col w-1/2">
                                <Label className="pl-[1px] text-base text-left" value={"Last name"}/>
                                <TextField name="last_name" size='large' className={"w-full"} type="text" errorMessage={touched.last_name && errors.last_name} value={values.last_name} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <Label className="pl-[1px] text-base text-left" value={"Email"}/>
                            <TextField name="email" size='large' className={"w-full"} type="text" errorMessage={touched.email && errors.email} value={values.email} onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col">
                            <Label className="pl-[1px] text-base text-left" value={"Username"}/>
                            <TextField name="username" size='large' className={"w-full"} type="text" errorMessage={touched.username && errors.username} value={values.username} onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col">
                            <Label className="pl-[1px] text-base text-left" value={"Password"}/>
                            <TextField name="password" size='large' type="password" className={"w-full"} errorMessage={touched.password && errors.password} value={values.password} onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col">
                            <Label className="pl-[1px] text-base text-left" value={"Confirm password"}/>
                            <TextField name="confirm_password" size='large' type="password" className={"w-full"} errorMessage={touched.confirm_password && errors.confirm_password} value={values.confirm_password} onChange={handleChange}/>
                        </div>
                        <div className='mt-1'>
                            <Button title="Sign Up" size='lg' className='w-full'/>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    </div>
  )
}
