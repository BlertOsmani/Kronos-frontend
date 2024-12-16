import SignUpForm from '../components/user/SignUpForm'
import CustomLink from '../components/ui/CustomLink'
import Image from '../components/ui/Image'

export default function SignUp() {
  return (
    <div className='w-screen h-screen flex items-center justify-between'>
        <div className='flex justify-center w-1/2'>
          <div className='w-1/2 flex flex-col'>
            <div className='mb-10'>
              <h1 className='text-3xl font-semibold'>Create your account</h1>
              <span className='text-sm text-neutral-500'>Join us today and take the first step toward conquering your goals. Your productivity journey starts here!</span>
            </div>
            <SignUpForm/>
            <div className='my-6 flex justify-center'>
              <span className='text-gray-500'>Already have an account? <CustomLink to="/login" title="Sign In" className="underline text-black underline-offset-auto"/></span>
            </div>
          </div>
        </div>
        <div className='w-1/2'>
          <Image src="https://wallpapercave.com/wp/wp2351071.jpg" className="w-full h-screen object-cover" alt="Login page bg image"/>
        </div>
    </div>
  )
}
