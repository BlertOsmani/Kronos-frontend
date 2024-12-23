import SignInForm from '../../../components/user/auth/SignInForm';
import CustomLink from '../../../components/ui/CustomLink';
import Image from '../../../components/ui/Image';

export default function SignIn() {
  return (
    <div className='w-screen h-screen flex items-center justify-between'>
        <div className='w-1/2'>
          <Image src="https://wallpaperswide.com/download/business_plan-wallpaper-2560x2048.jpg" className="w-full h-screen object-cover" alt="Login page bg image"/>
        </div>
        <div className='flex justify-center w-1/2'>
          <div className='w-1/2 flex flex-col'>
            <div className='mb-10'>
              <h1 className='text-3xl font-semibold'>Sign In</h1>
              <span className='text-sm text-neutral-500'>Welcome back! Let&apos;s tackle your tasks and make progress together.</span>
            </div>
            <SignInForm/>
            <div className='my-6 flex justify-center'>
              <span className='text-gray-500'>Don&apos;t have an account? <CustomLink to="/register" title="Sign Up" className="underline text-black underline-offset-auto"/></span>
            </div>
          </div>
        </div>
    </div>
  )
}
