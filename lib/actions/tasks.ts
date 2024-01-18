'use server';

// import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import getSupabaseServerActionClient from '@/lib/supabase/action-client';
import { deleteTask, insertTask, updateTask } from '@/lib/mutations/tasks';



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
  const [result] = await insertTask(client, {
    title,
    description,
    status,
    user_id: data.user.id,
  });

  revalidatePath(`/dashboard`, 'page');

  return result;
}


export async function updateTaskAction(formData: any) {
  const title = formData['title'];
  const description = formData['description'];
  const status = formData['status'];
  const id = formData['id'];


  const client = getSupabaseServerActionClient();
  const { error } = await client.auth.getUser();

  if (error) {
    throw error;
  }

  // insert the post into the database
  const [result] = await updateTask(client, {
    id,
    title,
    description,
    status,
  });

  revalidatePath(`/dashboard`, 'page');

  return result
}


export async function deleteTaskAction(formData: any) {
  const id = formData['id'];

  const client = getSupabaseServerActionClient();
  const { data, error } = await client.auth.getUser();

  if (error) {
    throw error;
  }

  // insert the post into the database
  const [result] = await deleteTask(client, {
    id,
  });

  revalidatePath(`/dashboard`, 'page');

  return result
}