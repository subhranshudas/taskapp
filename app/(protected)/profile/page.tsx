import { redirect } from 'next/navigation';
import getSupabaseServerComponentClient from '@/lib/supabase/server-component-client'
import { UserSettingsForm } from '@/components/user-settings-form';


async function ProfilePage() {
    const userData = await getUserData()

    // console.log("userData: --> ", userData)

    const welcomeName = <span className='font-bold text-muted-foreground'>{userData?.display_name || userData?.email}</span>

    return (
      <section className='flex min-h-screen flex-col items-center justify-start p-16'>
        <h1 className='text-xl md:text-4xl font-bold'>Profile</h1>
        <p className='my-8 text-md'>Welcome {welcomeName} to your profile page!</p>

        <UserSettingsForm user={userData}/>
       
      </section>
    );
}

export default ProfilePage;




// actual data call from DB
const getUserData = async () => {
  const client = getSupabaseServerComponentClient();
  const sessionResponse = await client.auth.getSession();
  const userData = sessionResponse.data?.session?.user;

  if (!userData) {
    redirect('/auth/sign-in');
  }

  const { data: users, error } = await client.from("users").select("*").eq('id', userData.id);

  if (error) throw error

  const [user] = users
  const { id, photo_url, display_name} = user

  return { id, photo_url, display_name, email: userData.email } // mix of Session.user
};