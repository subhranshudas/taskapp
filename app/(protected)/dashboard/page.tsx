import { redirect } from 'next/navigation';
import { DataTable } from '@/components/data-table'
import { columns } from '@/components/columns'
import { CreateTaskDrawer } from '@/components/create-task-drawer'
import { fetchTasks } from '@/lib/queries/tasks'
import getSupabaseServerComponentClient from '@/lib/supabase/server-component-client'


async function DashboardPage() {
    const tasks = await getTasks()
    

    return (
      <section className='flex min-h-screen flex-col items-center justify-start p-16'>

        <h1 className='text-2xl md:text-4xl font-bold'>Dashboard</h1>

        <p className='py-4'>Feel free to create, edit and delete any task you like!</p>


        <article className='mt-4'>
          <CreateTaskDrawer />
        </article>
    
    
        <article className="my-16 w-full md:w-3/5">
          <DataTable data={tasks} columns={columns} />
        </article>
      </section>
    );
}

export default DashboardPage;


// actual data call from DB
const getTasks = async () => {
  const client = getSupabaseServerComponentClient();
  const sessionResponse = await client.auth.getSession();
  const user = sessionResponse.data?.session?.user;

  if (!user) {
    redirect('/auth/sign-in');
  }

  const { data, error } = await fetchTasks(client, user.id)
  
  if (error) {
    throw error;
  }

  return data;
};