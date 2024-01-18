import Link from 'next/link';
import SignUpForm from './components/sign-up-form';
 
export const metadata = {
  title: 'Sign Up',
};
 
function SignUpPage() {
  return (
    <div className='flex flex-col space-y-4 w-full'>
      <SignUpForm />
    </div>
  );
}
 
export default SignUpPage;