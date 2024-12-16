import Button from '../ui/Button'
import CustomLink from '../ui/CustomLink'
import Label from '../ui/Label'
import TextField from '../ui/TextField'
import { Formik } from 'formik'

export default function SignInForm() {
  return (
    <div>
        <Formik
            initialValues={{
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
                            <Button title="Sign In" size='lg' className='w-full'/>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    </div>
  )
}
