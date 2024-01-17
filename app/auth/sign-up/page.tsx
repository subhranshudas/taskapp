import Link from 'next/link';
import SignUpForm from './components/sign-up-form';
 
export const metadata = {
  title: 'Sign Up',
};
 
function SignUpPage() {
  return (
    <div className='flex flex-col space-y-4 w-full'>
      <SignUpForm />
 
      <div className='text-sm'>
        {/* <span>Already have an account?</span> <Link className='underline' href='/auth/sign-in'>Sign In</Link> */}
        <span>You can close this tab/window</span>
      </div>
    </div>
  );
}
 
export default SignUpPage;