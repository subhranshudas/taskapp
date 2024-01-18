'use server';

// import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import getSupabaseServerActionClient from '@/lib/supabase/action-client';
import { insertTask } from '@/lib/mutations/tasks';
import { Task } from '@/types';



export async function createTaskAction(formData: any) {
  const title = formData['title'];
  const description = formData['description'];
  const status = formData['status'];


  const client = getSupabaseServerActionClient();
  const { data, error } = await client.auth.getUser();

  if (error) {
    throw error;
  }

  // insert the post into the database
  await insertTask(client, {
    title,
    description,
    status,
    user_id: data.user.id,
  });

  revalidatePath(`/dashboard`, 'page');

  // redirect(`/dashboard/${uuid}`);
}