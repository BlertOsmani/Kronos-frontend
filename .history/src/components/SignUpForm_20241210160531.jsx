import Button from './ui/Button'
import CustomLink from './ui/CustomLink'
import Label from './ui/Label'
import TextField from './ui/TextField'
import { Formik } from 'formik'

export default function SignUpForm() {
  return (
    <div>
        <Formik
            initialValues={{
                first_name: '',
                last_name: '',
                email: '',
                username: '',
                password: ''
            }}
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
